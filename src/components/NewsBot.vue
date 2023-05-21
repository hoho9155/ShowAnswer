<script>
import { v4 as uuidv4 } from 'uuid';
import axios from './../plugins/axios';
import NewsBotHeader from './NewsBotHeader.vue';
import QuestionInput from './QuestionInput.vue';
import AnswerBoard from './AnswerBoard.vue';

const containerId = 'show-answer-app';
const container = document.getElementById(containerId);

const BotName = container.dataset.botname;
const BotId = container.dataset.botid;

export default {
  components: { NewsBotHeader, QuestionInput, AnswerBoard },
  data() {
    return {
      loading: false,
      error: false,
      answer: '',
      keywords: [],
      hits: [],
      tophits: [],
    }
  },
  mounted() {
    this.loading = true;
    this.error = '';
    axios.get(`${BotName}/bots/${BotId}`)
      .then(res => {
        if (res.data.id !== BotId)
          this.error = `The bot doesn't exist.`;
        this.loading = false;
      })
      .catch(this.catchError);
  },
  methods: {
    catchError(err) {
      this.error = err.message;
      this.loading = false;
    },
    async render(str) {
      const items = str.replaceAll('}{', '}|{').split('|');
      items.forEach(item => {
        const obj = JSON.parse(item);
        if (obj.dataType == null) {
          this.error = obj.content;
          return;
        } 
        const content = JSON.parse(obj.content);
        
        switch (obj.dataType) {
          case 'answer':
            this.answer += content;
            break;
          case 'word':
            this.keywords.push(content);
            break;
          case 'hit':
            this.hits.push(content);
            break;
          case 'topHit':
            this.tophits.push(content);
            break;
        }
      });
      this.$forceUpdate();
    },
    async streamResponse(src) {
      const response = await fetch(src, {
        headers: {
          [import.meta.env.VITE_API_HEADER_KEY]: import.meta.env.VITE_API_HEADER_VALUE
        }
      });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      this.loading = false;
      console.log('stream start');
      // init state
      this.answer = '';
      this.keywords = [];
      this.hits = [];
      this.tophits = [];

      let level = 0;
      let rendered = '';
      let unrendered = '';
      while (true) {
        var { value, done } = await reader.read();
        if (done) break;

        var str = decoder.decode(value);
        console.log(str);

        for (let i = 0; i < str.length; i++) {
          unrendered += str.charAt(i);
          if (str.charAt(i) === '{') level++;
          if (str.charAt(i) === '}') level--;
          if (level === 0) {
            await this.render(unrendered);
            rendered += unrendered;
            unrendered = '';
          }
        }
      }
      console.log('stream end');
    },
    onHandleAsk(_question) {
      const askId = uuidv4();
      const payload = {
        id: askId,
        param1: _question,
        param2: "null"
      };
      this.loading = true;
      this.error = '';
      axios.post(`${BotName}/temp`, payload)
        .then(res => {
          this.error = res.data.message ?? false;
          const url = `${BotName}/bots/${BotId}/ask/${askId}`;
          // axios.get(url)
          //   .then(res => {
          //     const items = res.data.replaceAll('}{', '}|{').split('|');
          //     this.readItems(items);
          //     this.loading = false;
          //   })
          //   .catch(this.catchError);
          const fullurl = `${import.meta.env.VITE_API_SERVER_URL}/${url}`;
          
          this.streamResponse(fullurl);
        })
        .catch(this.catchError);
    }
  }
};
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <div class="d-flex flex-column pa-0 h-100">
      <QuestionInput class="mb-1" v-on:ask="onHandleAsk" />
      <v-alert
        class="my-1"
        v-if="error"
        density="compact"
        type="warning"
        :text="error"
      ></v-alert>
      <AnswerBoard class="mt-1 flex-grow-1" style="flex: 1;" :loading="loading" :answer="answer" :keywords="keywords" :hits="hits" :tophits="tophits" />
      
    </div>
  </div>
</template>

<style>

</style>
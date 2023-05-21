<script>
import Answer from './Answer.vue';
import Keywords from './Keywords.vue';
import Hits from './Hits.vue';
import TopHits from './TopHits.vue';

export default {
  components: { Answer, Keywords, Hits, TopHits },
  props: [ 'loading', 'answer', 'keywords', 'hits', 'tophits' ]
};
</script>

<template>
  <v-card flat :loading="loading">
    <v-card-text>
      <Answer :answer="answer" />
      <Keywords v-show="keywords.length" :keywords="keywords" />
      <Hits v-show="hits.length" :hits="hits" />
      <TopHits v-show="tophits.length" :tophits="tophits" />
    </v-card-text>
  </v-card>
</template>
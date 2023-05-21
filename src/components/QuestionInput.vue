<script>
export default {
  data() {
    return {
      question: '',
    }
  },
  methods: {
    ask() {
      console.log("Ask '" + this.question + "'");
      this.$emit('ask', this.question);
    }
  }
};
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="10" class="pa-2">
          <v-text-field
            v-model="question"
            prepend-inner-icon="mdi-forum"
            label="Ask your question to the knowledge worker"
            clearable
            variant="outlined"
            hide-details
            @keyup.enter="ask"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" class="pa-2">
          <v-btn 
            class="btn-ask"
            size="x-large"
            width="100%"
            @click="ask">Ask</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script scoped>
</script>

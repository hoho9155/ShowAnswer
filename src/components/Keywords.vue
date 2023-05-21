<script>
export default {
  props: {
    keywords: {
      type: Array,
      required: true,
    },
  }
};
</script>

<template>
  <div class="mt-5 pt-5">
    <div class="text-h6 font-weight-bold">Searching for</div>
    <div>    
      <v-chip class="mt-2 mr-2" size="small" v-for="keyword in keywords" :key="keyword">
          {{ keyword }}
      </v-chip>
    </div>
  </div>
</template>
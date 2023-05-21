<script>
export default {
  props: [ 'tophits' ]
};
</script>

<template>
  <div flat class="mt-5 pt-5">
    <div class="text-h6 font-weight-bold">Most relevant information</div>
    <div>
      <div class="d-inline-block" v-for="tophit in tophits" :key="tophit">
        <v-badge :content="tophit.count" color="grey-darken-1" offset-x="10" offset-y="10">
          <v-chip class="mr-3 mt-3" size="small" >
            {{ tophit.summary.title }}
            <span v-if="!tophit.summary.title">No title</span>
          </v-chip>
        </v-badge>
      </div>
    </div>
  </div>
</template>
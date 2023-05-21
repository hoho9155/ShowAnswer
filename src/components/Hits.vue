<script>
export default {
    props: [ 'hits' ],
    data: () => ({
        show: false,
    }),
}
</script>

<template>
  <v-expansion-panels class="mb-6 mt-5 ">
    <v-expansion-panel>
      <v-expansion-panel-title class="grey-darken-3" expand-icon="mdi-menu-down">
        <b>{{ hits.length }}</b><span class="pl-1">pieces of information found</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-chip v-for="(hit, index) in hits" :key="index" size="small" class="ma-2">
          {{ hit }}
        </v-chip>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

</template>
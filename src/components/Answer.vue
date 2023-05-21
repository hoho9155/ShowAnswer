<script>
export default {
  props: [ 'answer' ]
};
</script>

<template>
  <div>
    <span v-html="answer" style="text-indent: 2em;">
    </span>
  </div>
</template>
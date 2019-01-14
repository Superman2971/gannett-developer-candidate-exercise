<template>
  <div class="article">
    <div>Hello World, this is my first Vue Component</div>
    {{article}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Article',
  props: {
    article: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .article {
    font-size: 16px;

    .test {
      background-color: red;
    }
  }
</style>

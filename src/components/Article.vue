<template>
  <div class="article">
    <a v-bind:href="article.href" target="_blank">
      <h2 v-html="article.title"></h2>
      <div class="summary" v-html="article.summary"></div>
   </a>
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

<style scoped lang="scss">
  .article {
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 8px;
    font-size: 16px;
    height: 100%;
    width: 100%;

    a {
      color: inherit;
      text-decoration: none;
      height: 100%;
      width: 100%;
    }

    h2 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 24px;
      margin: 0;
      padding: 16px;
      width: 100%;
    }

    .summary {
      padding: 16px;
      text-align: left;
      width: 100%;
    }
  }
</style>

<template>
  <div class="article">
    <a v-bind:href="article.href" target="_blank">
      <h2 v-html="article.title"></h2>
      <div class="summary" v-html="article.summary"></div>
   </a>
  </div>
</template>

<script>
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
    box-shadow: 0 1px 3px rgba(10, 44, 76, 0.12), 0 1px 2px rgba(10, 44, 76, 0.12);
    font-size: 16px;
    height: 100%;
    transition: 0.25 ease;
    width: 100%;

    &:hover {
      box-shadow: 0 3px 6px rgba(10, 44, 76, 0.12), 0 3px 6px rgba(10, 44, 76, 0.12);
    }

    a {
      color: inherit;
      cursor: pointer;
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
      height: calc(100% - 66px);
      padding: 16px;
      text-align: left;
      width: 100%;
    }
  }
</style>

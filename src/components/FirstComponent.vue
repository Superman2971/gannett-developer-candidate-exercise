<template>
  <div class="first">
    <div>Hello World, this is my first Vue Component</div>
    <div>We shall now pass a property: <span class="test">{{ test }}</span></div>
  </div>
</template>

<script>
export default {
  name: 'FirstComponent',
  props: {
    test: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .first {
    font-size: 16px;

    .test {
      background-color: red;
    }
  }
</style>

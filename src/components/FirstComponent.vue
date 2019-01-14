<template>
  <div class="first">
    <div>Hello World, this is my first Vue Component</div>
    <div>We shall now pass a property: <span class="test" v-html="test"></span></div>
    <button v-on:click="apiTest()">Test</button>
    <button v-on:click="apiTest2()">NEW TEST</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FirstComponent',
  props: {
    test: String
  },
  methods: {
    apiTest: function () {
      this.loading = true
      axios.get('https://us-central1-gannett-cors-fix.cloudfunctions.net/getProfile')
        .then((response) => {
          console.log('success', response)
          this.loading = false
          this.jokes = response.data.value
        }, (error) => {
          console.log('error', error)
          this.loading = false
        })
    },
    apiTest2: function () {
      axios.get('https://us-central1-gannett-cors-fix.cloudfunctions.net/helloWorld').then(
        response => {
          console.log('Response', response)
        }
      )
    }
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

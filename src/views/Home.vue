<template>
  <div class="home">
    <FirstComponent test="Testing Property Passes"/>
    <button v-on:click="apiTest()">HURRAY</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FirstComponent from '@/components/FirstComponent.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld,
    FirstComponent
  },
  data: function () {
    return {
      jokes: [],
      loading: false
    }
  },
  created: function () {
    console.log('created')
  },
  methods: {
    apiTest: function () {
      this.loading = true
      axios.get('https://peaceful-springs-7920.herokuapp.com/profile/')
        .then((response) => {
          console.log('success', response)
          this.loading = false
          this.jokes = response.data.value
        }, (error) => {
          console.log('error', error)
          this.loading = false
        })
    }
  }
}
</script>

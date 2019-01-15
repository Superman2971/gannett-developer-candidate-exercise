<template>
  <div class='home' v-bind:class="{rare: theme === 'rare', well: theme === 'well'}">
    <h1>My Delicious Articles</h1>
    <div v-if="!loading" class="grid">
      <Article v-for="article in articles" v-bind:key="article.href" v-bind:article="article"/>
      <div v-if="articles.length === 0">No Articles Found</div>
    </div>
    <div v-if="loading">
      <!-- Loading Icon -->
      <svg version="1.1" id="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="80px" height="80px" viewBox="0 0 50 50" xml:space="preserve">
        <path v-bind:fill="theme !== 'well' ? (theme !== 'rare' ? 'rgba(0, 0, 0, 0.24)' : '#DC143C') : '#8B4513'" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Article from '@/components/Article.vue'

export default {
  name: 'home',
  components: {
    Article
  },
  data: function () {
    return {
      loading: true,
      profile: undefined,
      theme: undefined,
      articles: []
    }
  },
  created: function () {
    this.getUserProfile()
  },
  methods: {
    getUserProfile () {
      // check for cookie
      // 1) if cookie, save as profile || if not cookie request/get profile and save to cookies
      // 2) then use profile to get Articles || catch display No Articles!
      let cookieProfile = this.getCookie('profile')
      console.log('Cookie GET', cookieProfile)
      if (cookieProfile) {
        this.profile = JSON.parse(cookieProfile)
        this.getArticles()
      } else {
        this.getProfile()
      }
    },
    getCookie: function (name) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },
    getProfile: function () {
      this.$jsonp('https://peaceful-springs-7920.herokuapp.com/profile/')
        .then((response) => {
          console.log('success', response)
          this.profile = response
          this.setCookie('profile', JSON.stringify(this.profile), 365)
          this.getArticles()
        }).catch((error) => {
          console.log('error', error)
          this.loading = false
        })
    },
    setCookie: function (name, value, days) {
      var expires = ''
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toUTCString()
      }
      console.log('Set Cookie', name + '=' + (value || '') + expires + '; path=/')
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    },
    getArticles: function () {
      this.$jsonp(`https://peaceful-springs-7920.herokuapp.com/content/${this.profile.profileId}`)
        .then((response) => {
          console.log('success', response)
          this.articles = response.articles
          this.theme = response.theme
          this.loading = false
        }).catch((error) => {
          console.log('error', error)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
  .home {
    font-size: 16px;
    padding: 24px;

    &.rare {
      color: #DC143C
    }

    &.well {
      color: #8B4513
    }

    h1 {
      font-size: 32px;
      line-height: 32px;
      margin: 0 0 24px;
    }

    .grid {
      align-items: center;
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr;
      grid-gap: 24px;

      @media (max-width: 799px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>

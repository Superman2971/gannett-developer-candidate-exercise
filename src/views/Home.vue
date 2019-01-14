<template>
  <div class='home' v-bind:class="{rare: theme === 'rare', well: theme === 'well'}">
    <h1>My Delicious Articles</h1>
    <div v-if="!loading" class="grid">
      <Article v-for="article in articles" v-bind:key="article.href" v-bind:article="article"/>
      <div v-if="articles.length === 0">No Articles Found</div>
    </div>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Article from '@/components/Article.vue'
import axios from 'axios'

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
        // this.getArticles()
        this.getFakedArticles()
      } else {
        // this.getProfile()
        this.getFakeProfile()
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
      axios.get('https://peaceful-springs-7920.herokuapp.com/profile/')
        .then((response) => {
          console.log('success', response)
          this.profile = response
          this.setCookie('profile', JSON.stringify(this.profile), 365)
          this.getArticles()
        }, (error) => {
          console.log('error', error)
          this.loading = false
        })
    },
    getFakeProfile: function () {
      this.profile = {
        'profileId': 3
      }
      this.setCookie('profile', JSON.stringify(this.profile), 365)
      this.getFakedArticles()
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
      axios.get(`https://peaceful-springs-7920.herokuapp.com/content/${this.profile['profileId']}`)
        .then((response) => {
          console.log('success', response)
          this.articles = response.articles
          this.theme = response.theme
          this.loading = false
        }, (error) => {
          console.log('error', error)
          this.loading = false
        })
    },
    getFakedArticles: function () {
      setTimeout(() => {
        this.articles = [
          {
            'href': 'http://example.com/3/0/',
            'summary': 'Shank prosciutto tail meatball, pancetta sirloin rump shoulder ham bacon picanha chuck jowl swine. Strip steak porchetta brisket tail, cow cupim boudin ham hock bacon shoulder hamburger bresaola t-bone. Tongue bresaola jerky meatloaf. Porchetta meatloaf jowl, brisket drumstick kielbasa shank cupim flank fatback frankfurter prosciutto kevin.',
            'title': 'Meatball'
          },
          {
            'href': 'http://example.com/3/1/',
            'summary': 'Bacon ipsum dolor amet spare ribs brisket bresaola porchetta, shankle shank jowl biltong swine. Shank pork chop kevin pork belly frankfurter salami. Short loin ball tip turducken, sirloin flank hamburger beef ribs andouille turkey. Short loin sausage chicken, tail brisket alcatra prosciutto. Short ribs pork belly strip steak pork, ribeye fatback andouille landjaeger. Pig frankfurter ball tip, sausage pork chop chuck tri-tip prosciutto. Jowl swine shank strip steak pork bresaola.',
            'title': 'Bacon'
          },
          {
            'href': 'http://example.com/3/2/',
            'summary': 'Rump spare ribs corned beef prosciutto beef, biltong pork belly jerky strip steak meatloaf tenderloin tail ground round. Chicken short loin sirloin ground round pork belly meatball alcatra pork chop bacon filet mignon capicola. Pancetta jowl tenderloin spare ribs rump corned beef. Bacon jowl meatball capicola. Doner turkey landjaeger venison, shoulder pastrami ribeye jerky sausage hamburger.',
            'title': 'Rump'
          },
          {
            'href': 'http://example.com/3/3/',
            'summary': 'Tongue short loin pork chop porchetta, kielbasa cow salami bresaola venison turkey fatback. Tail shoulder frankfurter pancetta flank bacon jerky porchetta fatback short loin meatloaf filet mignon pork chop chicken brisket. Tri-tip chuck meatball prosciutto ball tip. Meatloaf t-bone landjaeger andouille ham hock fatback porchetta pig rump hamburger sirloin boudin bacon sausage meatball. Sirloin ball tip biltong, shankle beef short ribs tri-tip shoulder picanha jerky hamburger tenderloin pastrami ham hock.',
            'title': 'Tongue'
          },
          {
            'href': 'http://example.com/3/4/',
            'summary': 'Pancetta bresaola pig spare ribs picanha meatball andouille tri-tip leberkas turducken pork belly meatloaf shankle. Short loin short ribs turducken pork pork belly, cow beef ribs drumstick swine prosciutto salami sirloin. Bresaola sirloin cow pork, pig ham hock beef. Flank shank venison, shankle drumstick t-bone swine biltong sausage tail prosciutto porchetta fatback spare ribs. Chicken beef ribs fatback bacon. Cupim beef ribs spare ribs kielbasa venison shankle bresaola strip steak doner turkey meatloaf pastrami shank short ribs short loin. Venison bacon turkey beef fatback sirloin bresaola shoulder meatball alcatra ball tip picanha kielbasa corned beef capicola.',
            'title': 'Pancetta'
          }
        ]
        this.theme = 'well'
        this.loading = false
      }, 2000)
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

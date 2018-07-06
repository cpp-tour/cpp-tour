<template>
  <div id="app">
    <router-view />
    <Snackbar
       v-bind:class="{ 'is-hidden': cookieBannerShown }"
      :titleText="cookieTitle"
      :messageText="cookieMessage"
      :cancelText="cookieDecline"
      :successText="cookieAccept"
      @cancel="cookiesDeclined"
      @success="cookiesAccepted" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Snackbar from '@/components/Snackbar.vue';
import Lessons from '@/views/Lessons.vue';
import Cookie from '@/cookie';
import Strings from '@/strings';

@Component({
  components: {
    Lessons,
    Snackbar,
  },
})
export default class App extends Vue {
  protected cookieBannerShown: boolean = false;

  get cookieTitle(): string {
    return Strings['cookie-title'];
  }

  get cookieMessage(): string {
    return Strings['cookie-message'];
  }

  get cookieDecline(): string {
    return Strings['cookie-decline'];
  }

  get cookieAccept(): string {
    return Strings['cookie-accept'];
  }

  constructor() {
    super();

    const cookieBanner = new Cookie('cpp-tour-banner');
    const cookie = cookieBanner.read();
    /* cookie banner has been confirmed. */
    if (cookie === 'true') {
      this.cookieBannerShown = true;
      this.initAnalytics();
    }
  }

  protected cookiesAccepted() {
    this.cookieBannerShown = true;
    this.initAnalytics();
  }

  protected cookiesDeclined() {
    this.cookieBannerShown = true;
  }

  protected initAnalytics() {
    this.$store.commit('setCookieConsent', true);
    const cookieBanner = new Cookie('cpp-tour-banner');
    cookieBanner.write('true', 3650);

    const trackingId = 'UA-121453887-1';
    const head = document.getElementsByTagName('head')[0];
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    head.appendChild(gaScript);

    const code = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${trackingId}');`;

    const gaTag = document.createElement('script');
    gaTag.innerHTML = code;
    head.appendChild(gaTag);
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

/* Scrollable modals on IE */
html,
body,
#app,
#app > div,
.animation-content,
.animation-content > div,
.modal-card,
.modal-card-body {
  overflow: auto;
}

#app {
  font-family: 'Roboto', sans-serif;
  color: #24292e;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
}

button:focus {
    outline: 0;
}

/* >= 800px */
@media(min-width: 800px) {
  #app {
    height: 100%;
    width: 100%;
    position: fixed;
  }
  html {
    overflow: hidden !important;
  }
}

/* <= 799px */
@media(max-width: 799px) {
  body {
    overflow: auto;
  }
}


$menu-item-color: #fff !default;
$menu-label-color: #575757 !default;
$menu-item-radius: 2px !default;


$hamburger-layer-color: #ffffff !default;
$hamburger-layer-height: 3px !default;
$hamburger-layer-width: 30px !default;
$hamburger-layer-spacing: 5px !default;
$hamburger-types: (
  arrow,
) !default;

@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "~hamburgers/_sass/hamburgers/hamburgers";

</style>

<template>
  <div id="topbar-main" v-click-outside="dismissAll">
    <div class="topbar-left">
      <button
          class="hamburger hamburger--arrow hamburger--padding"
          type="button"
          v-on:click="toggleSidebar"
          v-bind:class="{ 'is-active': sidebarVisible }"
          ref="hamburger">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <h1 class="topbar-title">{{ title }}</h1>
    </div>
    <Sidebar
        class="topbar-sidebar"
        v-on:navigate="sidebarVisible = false"
        v-bind:class="{ 'topbar-sidebar-visible': sidebarVisible }" />
    <div class="topbar-icons">
      <a v-if="windowWidth > 415" class="topbar-icon" href="https://github.com/cpp-tour/cpp-tour"><b-icon pack="fab" icon="github"></b-icon></a>
      <a v-if="windowWidth > 415" class="topbar-icon" href="https://twitter.com/arvidgerstmann"><b-icon pack="fab" icon="twitter"></b-icon></a>
      <div
        class="dropdown is-right topbar-menu"
        @click="toggleMoreMenu"
        v-bind:class="{ 'is-active': moreVisible }">
        <div class="dropdown-trigger">
          <div>
            <span>More</span>
            <b-icon class="menu-icon" pack="fas" icon="caret-down"></b-icon>
          </div>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a v-if="windowWidth <= 415" href="https://github.com/cpp-tour/cpp-tour" class="dropdown-item">
              Github
            </a>
            <a v-if="windowWidth <= 415" href="https://twitter.com/arvidgerstmann" class="dropdown-item">
              Twitter
            </a>
            <a href="https://github.com/cpp-tour/cpp-tour/issues" class="dropdown-item">
              Open Issues
            </a>
            <a href="https://github.com/cpp-tour/cpp-tour/blob/master/CHANGELOG.md" class="dropdown-item">
              Changelog
            </a>
            <a @click="openSettings" class="dropdown-item">
              Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Sidebar from './Sidebar.vue';
import Settings from './Settings.vue';

@Component({
  components: {
    Sidebar,
  },
})
export default class TopBar extends Vue {
  @Prop() public title!: string;
  public sidebarVisible: boolean = false;
  public moreVisible: boolean = false;

  get counter(): string {
    return this.$store.getters.counter;
  }

  get consent(): string {
    return `consent? ${this.$store.getters.hasCookieConsent}`;
  }

  public toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  public dismissAll() {
    this.sidebarVisible = false;
    this.moreVisible = false;
  }

  public toggleMoreMenu() {
    this.moreVisible = !this.moreVisible;
  }

  public openSettings() {
    this.$modal.open({
      parent: this,
      component: Settings,
      hasModalCard: true,
      scroll: 'keep',
    });
  }

  protected incCounter() {
    this.$store.commit('incCounter');
  }
}
</script>

<style scoped lang="scss">
#topbar-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: $topbar-color;
  height: 60px;
  min-height: 60px;
  padding: 1em 1em;
}

.topbar-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.topbar-title {
  font-weight: 600;
  font-size: 1.75em;

  /* <= 440px */
  @media(max-width: 440px) {
    font-size: 1.5em;
  }

  /* <= 340px */
  @media(max-width: 340px) {
    font-size: 1.4em;
  }
}

.topbar-icons {
  display: flex;
  flex-direction: row;
}

.hamburger--padding {
    padding-bottom: 0.6em;
}

.topbar-sidebar {
  position: fixed;
  z-index: 999;
  top: 60px;
  left: -20em;
  bottom: 0;
  width: 20em;
  min-width: 15em;
  transition: 0.15s;
  animation-timing: ease-in;
}

.topbar-sidebar-visible {
  left: 0;
  transition: 0.15s;
  animation-timing: ease-in;
}

.topbar-icon {
  color: white;
  padding: 1rem 0.5rem;

}

.topbar-icon:hover {
  color: rgba(255, 255, 255, 127);
  opacity: 0.5;
}

.topbar-menu {
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 1rem;
  margin-bottom: 0.1rem;

}

.topbar-menu:hover {
  background-color: rgba(0, 0, 0, 127);
  cursor: pointer;
}

.menu-icon {
  vertical-align: bottom;
}
</style>

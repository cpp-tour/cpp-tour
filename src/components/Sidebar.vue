<template>
  <div class="sidebar-wrapper">
    <aside class="menu">
      <div v-for="chapter in chapters">
        <p class="menu-label chapter-label">
          {{ chapter.name }}
        </p>
        <ul class="menu-list lesson-list">
          <li v-for="lesson in chapter.lessons">
            <router-link v-if="!lesson.comingSoon" v-on:click.native="$emit('navigate')" :to="{ name: 'lesson', params: { 'lessonId': lesson.id }}" active-class="is-active">{{ lesson.name }}</router-link>
            <b-tooltip label="Coming soon" type="is-dark" v-else animated>
              <p class="link-comingsoon">{{ lesson.name }}</p>
            </b-tooltip>
          </li>
        </ul>
      </div>
    </aside>
    <div class="sidebar-footer">
      <p><b>C++ Tour</b> by <a href="https://arvid.io">Arvid Gerstmann</a>.</p>
      <p>The source code is licensed <a href="https://github.com/Leandros/cpp-tour/blob/master/LICENSE">MIT</a>.</p>
      <p>The website content is licensed <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>.</p>
      <p><router-link to="/privacy-policy">Privacy Policy</router-link></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { chapters as Chapters } from '@/lessons';

@Component
export default class Sidebar extends Vue {
  private chapters = Chapters;
}
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $topbar-color;
  z-index: 999;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.sidebar-footer {
  color: #575757;
  font-size: 0.8em;
}
.sidebar-footer a {
  color: #575757;
  text-decoration: underline;
}

.chapter-label:not(:last-child) {
  margin-bottom: 1em;
}

.lesson-list {
  margin-bottom: 2em;
}

.link-comingsoon {
  color: rgba(255, 255, 255, 127);
  opacity: 0.5;
  padding: 0.5em 0.75em;
}
</style>


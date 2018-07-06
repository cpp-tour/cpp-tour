<template>
  <div class="home">
    <TopBar class="home-topbar" title="A Tour of C++" />
    <div class="home-fullpage">
      <div class="home-mainpane">
        <Content
            class="home-content"
            v-bind:text="lessonText"
            v-bind:title="lessonName"
            v-bind:slug="lessonSlug"
            v-on:prev="prevLesson"
            v-on:next="nextLesson" />
        <div class="home-gutter" />
        <Editor
          class="home-editor"
          v-bind:code="lessonCode"
          v-bind:headers="lessonHeaders" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TopBar from '@/components/TopBar.vue';
import Editor from '@/components/Editor.vue';
import Content from '@/components/Content.vue';
import { Lesson, lessons, chapters, File } from '@/lessons.ts';

@Component({
  components: {
    TopBar,
    Content,
    Editor,
  },
})
export default class Home extends Vue {
  @Prop() public lessonId!: string;

  get lesson(): Lesson {
    return this.$store.getters.currentLesson;
  }

  get lessonSlug(): string {
    return this.lesson.id;
  }

  get lessonName(): string {
    return this.lesson.name;
  }

  get lessonText(): string {
    return this.lesson.text;
  }

  get lessonCode(): string {
    return this.lesson.code;
  }

  get lessonHeaders(): File[] {
    return this.lesson.codes;
  }

  protected created() {
    this.$store.commit('setLesson', this.lessonId);
  }

  @Watch('lessonId')
  protected onLessonIdChanged(id: string) {
    this.$store.commit('setLesson', id);
  }

  protected prevLesson() {
    this.$store.commit('prevLesson');
    this.$router.push({ name: 'lesson', params: { lessonId: this.lesson.id } });
  }

  protected nextLesson() {
    this.$store.commit('nextLesson');
    this.$router.push({ name: 'lesson', params: { lessonId: this.lesson.id } });
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.home-fullpage {
  display: flex;
  @media(min-width: 800px) {
    height: 100%;
    overflow: hidden;
  }
  @media(max-width: 799px) {
    margin-top: 60px;
    flex: 1;
  }
}

.home-mainpane {
  display: flex;
  width: 100%;
  @media(min-width: 800px) {
    flex-direction: row;
  }
  @media(max-width: 799px) {
    flex-direction: column;
    height: 100%;
  }
}

.home-content {
  background-color: white;
  @media(min-width: 800px) {
    width: 50%;
    background-color: white;
    display: flex;
  }
  @media(max-width: 799px) {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}

.home-editor {
  /* >= 800px */
  @media(min-width: 800px) {
    width: 50%;
    display: flex;
  }
  /* <= 799px */
  @media(max-width: 799px) {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}

.home-gutter {
  width: 5px;
  background-color: $topbar-color;
}

/* <= 799px */
@media(max-width: 799px) {
  .home-topbar {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }
}

</style>

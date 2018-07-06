<template>
  <div class="content-wrapper">
    <div class="content-scrollable">
      <div class="report-a-problem"><a :href="issueLink">Report a Problem</a></div>
      <div class="section">
        <DynamicTemplate class="content" :template="text" />
      </div>
    </div>
    <div class="content-bottom">
      <div class="nav-divider"></div>
      <nav class="nav-bottom pagination is-centered" role="navigation" aria-label="pagination">
        <a
          v-on:click="$emit('prev')"
          v-bind:disabled="!$store.getters.hasPrevLesson"
          class="pagination-previous">Previous</a>
        <a
          v-on:click="$emit('next')"
          v-bind:disabled="!$store.getters.hasNextLesson"
          class="pagination-next">Next lesson</a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DocumentationHover from '@/components/DocumentationHover.vue';
import DynamicTemplate from '@/components/DynamicTemplate.vue';
import CodeBlock from '@/components/CodeBlock.vue';

@Component({
  components: {
    DocumentationHover,
    DynamicTemplate,
    CodeBlock,
  },
})
export default class Content extends Vue {
  @Prop({ default: '' }) public text!: string;
  @Prop({ default: '' }) public title!: string;
  @Prop({ default: '' }) public slug!: string;
  protected popup!: DocumentationHover | null;

  get issueLink(): string {
    const title = `${this.slug}: [FILL WITH SHORT DESCRIPTION]`;
    const body = `**Lesson:** ${this.title}\n\n**Description:**\n\nDescribe your issue here`;
    const ret = `https://github.com/cpp-tour/cpp-tour/issues/new?title=${title}&body=${body}`;
    return encodeURI(ret);
  }

  public mouseOver(event: any, slug: string) {
    if (!this.popup) {
      const target = event.target as HTMLElement;
      const DocumentationHoverClass = Vue.extend(DocumentationHover);
      this.popup = new DocumentationHoverClass();
      this.popup.slug = slug;
      this.popup.$mount();

      const { bottom, left } = target.getBoundingClientRect();
      this.popup.$el.style.left = `${left - 25}px`;
      this.popup.$el.style.top = `${bottom}px`;
      target.parentNode!.appendChild(this.popup.$el);
    }
  }

  public mouseLeave(event: any, slug: string) {
    if (this.popup) {
      this.popup.$el.remove();
      this.popup = null;
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  padding: 1.5rem 1.5rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-bottom {
  width: 100%;
  @media(max-width: 799px) {
    width: 101%;
    position: fixed;
    bottom: -1px;
    background-color: white;
    z-index: 899;
  }
}

.nav-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1em;
}

.report-a-problem {
  margin: 1em 1em 0em;
  display: flex;
  flex-direction: row-reverse;
  font-size: 12px;

  a:link {
    color: rgba(0, 0, 0, 127);
    opacity: 0.5;
  }

  a:visited {
    color: rgba(0, 0, 0, 127);
    opacity: 0.5;
  }

  a:hover {
    color: #000000;
    text-decoration: underline;
  }

  a:active {
    color: rgba(0, 0, 0, 127);
    opacity: 0.5;
  }
}

.nav-divider {
  background-color: rgba(0, 0, 0, 31);
  opacity: 0.12;
  height: 1px;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
}


/* >= 800px */
@media(min-width: 800px) {
  .content-scrollable {
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<style lang="scss">
.content h1,
.content h2,
.content h3,
.content h4 {
  color: #24292E !important;
}

.content p {
  color: #24292E !important;
}

.content a {
  text-decoration: underline;
}

.content code {
  padding: 0.15em 0.25em 0.15em;
  color: #333333;
}
</style>

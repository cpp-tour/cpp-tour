<template>
  <div class="codeblock-wrapper">
    <div class="codeblock-topbar">
      <div class="copy-button" @click="copyText" ref="copyButton">
        <b-icon :type="iconColor()" pack="fa" icon="clipboard"></b-icon>
      </div>
    </div>
    <pre :class="style" ref="preBlock" class="codeblock-pre">
    {{ code }}
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CodeMirror from 'codemirror';
import ClipboardJS from 'clipboard';
import 'codemirror/addon/runmode/runmode.js';

@Component
export default class CodeBlock extends Vue {
  get code(): string {
    if (this.$slots.default.length < 1) {
      return '';
    }

    return this.$slots.default[0].text || '';
  }

  get style(): string[] {
    const theme = this.$store.getters.editorTheme.split(' ');
    return theme.map((x: string) => `cm-s-${x}`);
  }

  protected mounted() {
    const clipboard = new ClipboardJS(this.$refs.copyButton as HTMLElement, {
      text: () => {
        return this.code;
      },
    });

    (CodeMirror as any).runMode(this.code, 'text/x-c++src', this.$refs.preBlock);
  }

  protected copyText(event: any) {
    this.$toast.open({
      message: 'Copied!',
      duration: 1000,
    });
  }

  protected iconColor(): string {
    if (this.style.includes('cm-s-dark')) {
      return 'is-light';
    }
    return 'is-dark';
  }
}
</script>

<style scoped lang="scss">
.codeblock-wrapper {
  margin: 1rem 0px;
}

.codeblock-topbar {
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 0;
  top: 1em;
}

.copy-button {
  display: flex;
  justify-content: center;
  vertical-align: middle;
  width: 40px;
  height: 40px;

  :hover {
    opacity: .75;
    cursor: pointer;
  }
}

.codeblock-pre {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}
</style>

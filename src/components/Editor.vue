<template>
  <div class="editor-main">
    <div ref="cmwrapper" class="codemirror-wrapper">
      <div class="codemirror-divider"></div>
    </div>
    <div class="editor-divider"></div>
    <div class="editor-buttons">
      <a
          class="button is-primary editor-button"
          v-on:click="run"
          v-bind:class="{ 'is-loading': isCompiling }">Run</a>
      <a
          class="button is-danger editor-button"
          v-on:click="reset"
          v-bind:disabled="isCompiling">Reset</a>
    </div>
    <div class="editor-divider"></div>
    <div class="editor-output">
      <p class="editor-program-out editor-pre">{{ programOutput }}</p>
      <p class="editor-compiler-out editor-pre" v-bind:class="{ 'is-compiler-error': isCompilerError, 'is-compiler-warning': isCompilerWarning }">{{ compilerOutput }}</p>
      <p class="editor-exitcode editor-pre">{{ exitCode }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/keymap/sublime.js';
import 'codemirror/keymap/emacs.js';
import 'codemirror/keymap/vim.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Compiler from '@/compiler';
import { File } from '@/lessons';

interface EditorOptions {
  theme?: string;
  keyMap?: string;
}

@Component
export default class Editor extends Vue {
  @Prop({ default: '' }) public code!: string;
  @Prop({ default: () => [] }) public headers!: File[];
  private editor!: CodeMirror.Editor;
  private compiler: Compiler = new Compiler();
  private programOutput: string = '';
  private compilerOutput: string = '';
  private exitCode: string = '';
  private isCompiling: boolean = false;
  private isCompilerError: boolean = false;
  private isCompilerWarning: boolean = false;

  constructor() {
    super();
  }

  public run() {
    this.resetState();
    this.isCompiling = true;
    this.compiler.compile({
      code: this.editor.getValue(),
      codes: this.headers,
    }).then((json) => {
      this.isCompiling = false;
      this.programOutput = json.program_message || '';
      this.compilerOutput = json.compiler_message || '';
      this.exitCode = `Program exited with code ${json.status}.`;
      this.isCompilerError = this.compilerOutput.search(' error: ') !== -1;
      this.isCompilerWarning = !this.isCompilerError
        && this.compilerOutput.search(' warning: ') !== -1;
      if (json.compiler_error) {
        this.markError(json.compiler_error);
      }
    }).catch((err) => {
      this.isCompiling = false;
      this.programOutput = '';
      this.compilerOutput = '';
      this.exitCode = `Error: Reaching server.`;
      this.isCompilerError = false;
      this.isCompilerWarning = false;
    });
  }

  public reset() {
    if (this.editor) {
      this.editor.setValue(this.code);
    }
  }

  public resetState() {
    this.programOutput = '';
    this.compilerOutput = '';
    this.exitCode = '';
    this.isCompilerError = false;
    this.isCompilerWarning = false;
    this.clearError();
  }

  @Watch('code')
  protected onCodeChange(val: string, oldVal: string) {
    if (this.editor) {
      this.resetState();
      this.editor.setValue(val);
    }
  }

  protected markError(compilerError: string) {
    let str = compilerError;
    const pos = str.search(/prog.cc:\d+:\d+: error/);
    str = str.substring(pos);
    const matches = str.match(/prog.cc:(\d+):(\d+): error/m);
    if (!matches) { return; }
    const line = Number(matches[1]);
    const col = Number(matches[2]);
    if (isNaN(line) || isNaN(col)) { return; }
    const doc = this.editor.getDoc();
    const count = str.countOf('~');
    doc.markText({
      line: line - 1,
      ch: col - 1,
    }, {
      line: count !== -1 ? line - 1 : line,
      ch: count !== -1 ? col + count : 0,
    }, {
      className: 'cm-redline',
    });
  }

  protected clearError() {
    const doc = this.editor.getDoc();
    doc.getAllMarks().map((x) => x.clear());
  }

  protected mounted() {
    this.createEditor({
      theme: this.$store.getters.editorTheme,
      keyMap: this.$store.getters.editorBindings,
    });
  }

  protected createEditor(options: EditorOptions) {
    const wrapper = this.$refs.cmwrapper as HTMLElement;
    this.editor = CodeMirror(wrapper as HTMLElement, {
      ...options,
      lineNumbers: true,
      mode: 'text/x-c++src',
      indentUnit: 4,
      matchBrackets: true,
    } as CodeMirror.EditorConfiguration);
    this.editor.setOption('extraKeys', {
      'Alt-F': false,
      'Ctrl-Enter': () => {
        this.run();
      },
    });
    this.editor.setSize('100%', '100%');
    this.reset();


    this.$store.watch((state: any) => state.editorBindings, (newVal: string) => {
      if (this.editor) {
        this.editor.setOption('keyMap', newVal);
      }
    });
    this.$store.watch((state: any) => state.editorTheme, (newVal: string) => {
      if (this.editor) {
        this.editor.setOption('theme', newVal);
      }
    });
  }

}
</script>

<style scoped lang="scss">
.editor-main {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

.codemirror-wrapper {
  height: 70%;
}

.editor-buttons {
  display: flex;
  flex-direction: row-reverse;
  background-color: #fafafa;
}

.editor-button {
  margin: 5px;
}

.editor-output {
  background-color: #fafafa;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 2;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;

  @media(max-width: 799px) {
    min-height: 200px;
    margin-bottom: 80px;
  }
}

.editor-pre {
  white-space: pre-line;
  font-family: monospace;
  color: #4a4a4a;
  font-size: 0.875em;
}

.editor-program-out {
  color: #000;
  background-color: #fafafa;
  display: inline-block;
  padding: 0;
  overflow: unset;
  max-width: 100%;
}

.editor-compiler-out {
  color: #000;
  background-color: #fafafa;
  display: inline-block;
  padding: 0;
  overflow: unset;
  max-width: 100%;
}

.editor-exitcode {
  color: rgba(0, 0, 0, 127);
  opacity: 0.5;
  background-color: #fafafa;
  display: inline-block;
  padding: 0;
  overflow: unset;
  max-width: 100%;
}

.editor-divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 31);
  opacity: 0.12;
}

.is-compiler-error {
  color: #FF0000;
}

.is-compiler-warning {
  color: #FF7F3C;
}

/* <= 799px */
@media(max-width: 799px) {
  .codemirror-divider {
    height: 1px;
    background-color: rgba(0, 0, 0, 31);
    opacity: 0.12;
  }
}


</style>

<style lang="scss">
.cm-redline {
  background-image: url('../assets/error.png');
  background-position: bottom left;
  background-repeat: repeat-x;
}
div.CodeMirror span.CodeMirror-matchingbracket {
  outline: 1px solid #ff00007f;
}
</style>

<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Settings</p>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <b-field label="Editor Bindings">
          <b-select :value="editorBindings" @input="setEditorBindings">
            <option>sublime</option>
            <option>vim</option>
            <option>emacs</option>
          </b-select>
        </b-field>
        <b-field label="Editor Theme">
          <b-select :value="editorTheme" @input="setEditorTheme">
            <option>default</option>
            <option>solarized dark</option>
            <option>solarized light</option>
          </b-select>
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot flex-right">
      <button class="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters({
      editorBindings: 'editorBindings',
      editorTheme: 'editorTheme',
    }),
  },
})
export default class Settings extends Vue {
  public setEditorBindings(value: string) {
    this.$store.commit('setEditorBindings', value);
  }
  public setEditorTheme(value: string) {
    this.$store.commit('setEditorTheme', value);
  }
}

</script>

<style scoped lang="scss">
.flex-right {
  display: flex;
  justify-content: flex-end;
}
</style>

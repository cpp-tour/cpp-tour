<template>
  <div class="box doc-hover" v-bind:class="{ 'doc-invisible': !hasDoc }">
    <pre>{{ signature }}</pre>
    <p v-html="description"></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { popups as Popups } from '@/popups';

@Component
export default class DocumentationHover extends Vue {
  @Prop() public slug!: string;

  get hasDoc(): boolean {
    if (Popups[this.slug]) {
      return true;
    }
    return false;
  }

  get signature(): string {
    if (!Popups[this.slug]) {
      return '';
    }

    return Popups[this.slug].signature;
  }

  get description(): string {
    if (!Popups[this.slug]) {
      return '';
    }

    return Popups[this.slug].description;
  }
}
</script>

<style scoped lang="scss">
.doc-hover {
  position: absolute;
  z-index: 1000;
  width: 400px;
}

.doc-invisible {
  display: none;
}

.doc-hover pre {
  padding: 0.25rem 0.5rem;
  margin-bottom: 1rem;
}
</style>

<style lang="scss">
monospace {
  display: inline;
  font-family: monospace;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DynamicTemplate extends Vue {
  @Prop() public template!: string;

  protected render(createElement: any) {
    const { $props, $options } = this.$parent;
    const root = {
      ...Vue.compile(`<div>${this.template}</div>`),
      components: $options.components,
      props: $props,
      computed: $options.computed,
      methods: $options.methods,
    };
    return createElement(root);
  }
}
</script>

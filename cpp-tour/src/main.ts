import { VNodeDirective, VNode, VueConstructor } from 'vue';
import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
import './extensions';
import 'whatwg-fetch';

Vue.use(Buefy);
Vue.config.productionTip = false;
type CustomEvent = Event & { target: HTMLElement };
type CustomElement = HTMLElement & { event: (event: CustomEvent) => void; };
Vue.directive('click-outside', {
  bind: (el: HTMLElement, binding: VNodeDirective, vnode: VNode) => {
    const element = el as CustomElement;
    element.event = (event: CustomEvent) => {
      if (!(element === event.target || element.contains(event.target))) {
        (vnode! as any).context[binding!.expression](event);
      }
    };
    document.body.addEventListener('click', (element.event as any));
  },
  unbind: (el: HTMLElement) => {
    const element = el as CustomElement;
    document.body.addEventListener('click', (element.event as any));
  },
});

const VueMedia = (vue: VueConstructor<Vue>, options?: any): void => {
  vue.mixin({
    data: () => ({
      windowHeight: 0,
      windowWidth: 0,
    }),
    mounted() {
      const self = this as any;
      self.$nextTick(() => {
        window.addEventListener('resize', self.getWindowWidth);
        window.addEventListener('resize', self.getWindowHeight);
        self.getWindowWidth();
        self.getWindowHeight();
      });
    },
    beforeDestroy() {
      const self = this as any;
      window.removeEventListener('resize', self.getWindowWidth);
      window.removeEventListener('resize', self.getWindowHeight);
    },
    methods: {
      getWindowWidth(event: any) {
        const self = this as any;
        self.windowWidth = document.documentElement.clientWidth;
      },
      getWindowHeight(event: any) {
        const self = this as any;
        self.windowHeight = document.documentElement.clientHeight;
      },
    },
  });
};

Vue.use(VueMedia);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

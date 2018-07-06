import Vue from 'vue';
import Router from 'vue-router';
import Lessons from './views/Lessons.vue';
import PrivacyPolicy from './views/PrivacyPolicy.vue';
import { lessons } from './lessons';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'lesson',
        params: {
          lessonId: '1.0-hello-world',
        },
      },
    },
    {
      path: '/lesson/:lessonId',
      name: 'lesson',
      props: true,
      component: Lessons,
    },
    {
      path: '/privacy-policy',
      component: PrivacyPolicy,
    },
  ],
});

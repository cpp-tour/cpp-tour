import Vue from 'vue';
import Vuex from 'vuex';
import { MutationPayload } from 'vuex';
import createdPersistedState from 'vuex-persistedstate';
import LocalStorage from '@/localStorage';
import { Lesson, flatLessons } from '@/lessons';

Vue.use(Vuex);

interface State {
  currentLessonIndex: number;
  cookieConsent: boolean;
  editorBindings: string;
  editorTheme: string;
}

const storage = new LocalStorage();
const persistedState = createdPersistedState({
  key: 'cpp-tour-storage',
  storage,
  filter: (mutation: MutationPayload) => {
    if (mutation.type === 'setCookieConsent') {
      storage.storageEnabled = mutation.payload === true;
    }
    return storage.storageEnabled;
  },
});

export default new Vuex.Store<State>({
  plugins: [
    persistedState,
  ],
  strict: process.env.NODE_ENV === 'debug',
  state: {
    currentLessonIndex: 0,
    cookieConsent: false,
    editorBindings: 'sublime',
    editorTheme: 'default',
  },
  mutations: {
    prevLesson(state) {
      if (state.currentLessonIndex > 0) {
        state.currentLessonIndex--;
      }
    },
    nextLesson(state) {
      if (state.currentLessonIndex < flatLessons.length - 1) {
        state.currentLessonIndex++;
      }
    },
    setLesson(state, id: string) {
      const lessonIndex = flatLessons.findIndex((el) => el.id === id);
      if (lessonIndex !== -1) {
        state.currentLessonIndex = lessonIndex;
      }
    },
    setCookieConsent(state, bool: boolean) {
      state.cookieConsent = bool;
    },
    setEditorBindings(state, bindings: string) {
      state.editorBindings = bindings;
    },
    setEditorTheme(state, theme: string) {
      state.editorTheme = theme;
    },
  },
  getters: {
    currentLesson(state) {
      return flatLessons[state.currentLessonIndex];
    },
    hasPrevLesson(state) {
      return state.currentLessonIndex > 0;
    },
    hasNextLesson(state) {
      return state.currentLessonIndex < flatLessons.length - 1;
    },
    hasCookieConsent(state) {
      return state.cookieConsent;
    },
    editorBindings(state) {
      return state.editorBindings;
    },
    editorTheme(state) {
      return state.editorTheme;
    },
  },
});

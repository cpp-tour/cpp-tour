import config from '../lessons/lessons';

export interface Chapter {
  readonly name: string;
  readonly lessons: [Lesson];
}

export interface File {
  readonly code: string;
  readonly file: string;
}

export interface Lesson {
  readonly id: string;
  readonly name: string;
  readonly text: string;
  readonly code: string;
  readonly codes: File[];
  readonly comingSoon?: boolean;
}

const loadText = (id: string) => {
  try {
    return require(`../lessons/${id}/text.md`);
  } catch (e) {
    return '';
  }
};

const loadCode = (id: string) => {
  try {
    if (id === '1.0-hello-world') {
      const translations = require(`../lessons/${id}/strings.json`);
      const lang = (navigator.languages
          ? navigator.languages[0]
          : (navigator.language || (navigator as any).userLanguage)).split('-')[0];
      if (!translations[lang]) {
        return require(`../lessons/${id}/code.cpp`);
      }

      const str = translations[lang];
      return `#include <stdio.h>

int main()
{
    puts("${str}");
}`;

    } else {
      return require(`../lessons/${id}/code.cpp`);
    }
  } catch (e) {
    return '';
  }
};

const loadCodes = (id: string) => {
  const ret: File[] = [];
  try {
    /*
     * Due to require.context(...) not allowing 'dynamic' requires, we
     * need to fall back to a whitelist of files which is added explicitly
     * via a simple `require`.
     */
    ret.push({
      code: require(`../lessons/${id}/cpp-tour.h`),
      file: 'cpp-tour.h',
    });

  } catch (e) {
    /* do nothing ... */
  }

  return ret;
};

export const chapters = (config as [Chapter]);

export const flatLessons: [Lesson] = (() => {
  const ret: any = [];
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      if (lesson.comingSoon) {
        continue;
      }

      ret.push({
        id: lesson.id,
        name: lesson.name,
        text: loadText(lesson.id),
        code: loadCode(lesson.id),
        codes: loadCodes(lesson.id),
      });
    }
  }
  return ret;
})();

export const lessons = (() => {
  const ret: {[name: string]: Lesson} = {};
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      ret[lesson.id] = {
        id: lesson.id,
        name: lesson.name,
        text: loadText(lesson.id),
        code: loadCode(lesson.id),
        codes: loadCodes(lesson.id),
        comingSoon: lesson.comingSoon,
      };
    }
  }
  return ret;
})();

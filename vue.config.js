const marked = require('marked');
const renderer = new marked.Renderer();
const { GenerateSW } = require('workbox-webpack-plugin');

function getSlug(href) {
  const search = 'cppreference.com/w/cpp/';
  const idx = href.indexOf(search);
  if (idx === -1) {
    return null;
  }
  return href.substr(idx + search.length);
}

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

renderer.link = (href, title, text) => {
  if (href.includes('cppreference.com')) {
    const slug = getSlug(href);
    if (!slug) {
      return `<a href="${href}">${text}</a>`;
    }

    return `<a href="${href}"
      v-on:mouseover="mouseOver($event, '${slug}')"
      v-on:mouseleave="mouseLeave($event, '${slug}')">${text}</a>`;
  } else {
    return `<a href="${href}">${text}</a>`;
  }
};

renderer.code = (code, language) => {
  const escaped = escape(code, true);
  return `<CodeBlock>${escaped}</CodeBlock>`;
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "src/styles/base.scss";'
      },
    },
  },
  configureWebpack: {
    entry: {
      vendors: ['whatwg-fetch']
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    },
    module: {
      rules: [
        {
          test: /\.cpp|\.h$/,
          use: 'raw-loader',
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: 'markdown-loader',
              options: {
                renderer,
                pedantic: false,
                smartypants: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new GenerateSW({
        swDest: 'sw.js',
        importWorkboxFrom: 'local',
        skipWaiting: true,
        clientsClaim: true,
      }),
    ],
  },
};

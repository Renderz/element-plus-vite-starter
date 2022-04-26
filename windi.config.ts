import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
    },
  },
  shortcuts: {
    'flex-center': {
      'justify-content': 'center',
      'align-items': 'center',
    },
    'transition-width': {
      'transition-property': 'width',
    },
  },
});

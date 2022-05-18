import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
// import { createHtmlPlugin } from 'vite-plugin-html';
import Pages from 'vite-plugin-pages';
import windiCSS from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import { visualizer } from 'rollup-plugin-visualizer';

import { wrapperEnv, createProxy } from './build/utils';

const srcPath = path.resolve(__dirname, 'src');

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

// https://vitejs.dev/config/
export default async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  const isBuild = command === 'build';

  const env = loadEnv(mode, process.cwd());

  const { VITE_HTTPS, VITE_PROXY, VITE_LEGACY } = wrapperEnv(env);

  const plugins: UserConfig['plugins'] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    // createHtmlPlugin({
    //   minify: isBuild,
    //   inject: {
    //     data: {
    //       title: VITE_TITLE,
    //     },
    //   },
    // }),
    windiCSS(),
    Pages({
      dirs: [{ dir: path.resolve(srcPath, 'pages'), baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue', 'jsx', 'tsx'],
    }),
    // auto import doesnt support JSX/TSX
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(srcPath, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: path.resolve(srcPath, 'components.d.ts'),
    }),
    ElementPlus({
      useSource: true,
    }),
  ];

  isBuild &&
    isReportMode() &&
    plugins.push(
      visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    );

  isBuild && VITE_LEGACY && plugins.push(legacy());

  return {
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: {
        '~/': `${srcPath}/`,
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins,
    server: {
      host: true,
      https: VITE_HTTPS,
      cors: true,
      proxy: createProxy(VITE_PROXY),
    },
  };
};

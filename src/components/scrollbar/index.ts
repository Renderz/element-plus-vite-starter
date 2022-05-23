import { withInstall } from './install';

import Scrollbar from './src/scrollbar.vue';

import './style/index.ts';

export const ElScrollbar = withInstall(Scrollbar);
export default ElScrollbar;

export * from './src/util';
export * from './src/scrollbar';
export * from './src/thumb';

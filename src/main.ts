import { createApp } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';
import routes from '~pages';

import App from './App';

// windi Styles
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

// Customized Styles
import '~/styles/index.less';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const app = createApp(App);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

app.use(router);
app.mount('#app');

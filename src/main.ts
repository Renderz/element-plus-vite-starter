import { createApp } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';
import routes from '~pages';

import App from './App';

// windi Styles
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

// Element Styles
import 'element-plus/theme-chalk/src/base.scss';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/notification.scss';

// Customized Styles
import '~/styles/index.scss';

const app = createApp(App);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

app.use(router);
app.mount('#app');

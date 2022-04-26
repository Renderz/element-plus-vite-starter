// import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { RouterView } from 'vue-router';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import DefaultLayout from '~/layouts/default';

export default () => (
  <ElConfigProvider locale={locale}>
    <DefaultLayout>
      <RouterView></RouterView>
    </DefaultLayout>
  </ElConfigProvider>
);

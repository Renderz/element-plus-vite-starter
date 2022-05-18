import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { RouterView } from 'vue-router';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import DefaultLayout from '~/layouts';
import { useAppProvider } from '~/utils/hooks/app';

export default defineComponent({
  setup() {
    useAppProvider();
  },
  render() {
    return (
      <ElConfigProvider locale={locale}>
        <DefaultLayout>
          <RouterView></RouterView>
        </DefaultLayout>
      </ElConfigProvider>
    );
  },
});

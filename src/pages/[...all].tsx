import { defineComponent } from 'vue';
import { ElResult, ElButton } from 'element-plus';
import { useRouter } from 'vue-router';

const ErrorPage = defineComponent({
  setup() {
    const router = useRouter();

    const goToIndex = () => {
      router.push('/');
    };

    return () => (
      <ElResult title="404" icon="error">
        {{
          'sub-title': () => <p>页面不存在</p>,
          extra: () => <ElButton onClick={goToIndex}>回到主页</ElButton>,
        }}
      </ElResult>
    );
  },
});

export default ErrorPage;

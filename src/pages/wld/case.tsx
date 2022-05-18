import { defineComponent, ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Case',
  setup() {
    const value = ref('');
    const router = useRouter();

    const goToDetail = () => {
      router.push('/wld/caseDetail?syskey=123');
    };

    return () => (
      <div>
        <ElInput modelValue={value.value} onUpdate:modelValue={(v) => (value.value = v)}></ElInput>
        <br />
        <ElButton onClick={goToDetail}>跳转</ElButton>
      </div>
    );
  },
});

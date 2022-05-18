import { defineComponent, ref } from 'vue';
import { ElInput } from 'element-plus';

export default defineComponent({
  name: 'CaseDetail',
  setup() {
    const value = ref('');
    return () => <ElInput modelValue={value.value} onUpdate:modelValue={(v) => (value.value = v)}></ElInput>;
  },
});

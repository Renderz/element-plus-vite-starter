import { reactive } from 'vue';
import { Form } from 'ant-design-vue';

const useData = () => {
  const modelRef = reactive({
    syskey: '',
  });

  const ruleRef = reactive({
    syskey: [{ required: true, message: '请输入案件编号' }],
  });

  const form = Form.useForm(modelRef, ruleRef);

  return {
    form,
    modelRef,
    ruleRef,
  };
};

export default useData;

import { reactive } from 'vue';
import { Form } from 'ant-design-vue';

export const useForm1 = () => {
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

export const useForm2 = () => {
  const modelRef = reactive({
    fruit: '',
  });

  const ruleRef = reactive({
    fruit: [{ required: true, message: '请输入案件编号' }],
  });

  const form = Form.useForm(modelRef, ruleRef);

  return {
    form,
    modelRef,
    ruleRef,
  };
};

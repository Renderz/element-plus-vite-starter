import { defineComponent } from 'vue';
import { Card, Form, FormItem, Input } from 'ant-design-vue';
import useData from './hook';

const { Search } = Input;

const FormDemo = defineComponent({
  name: 'FormDemo',
  setup() {
    const { form, modelRef } = useData();

    return () => {
      return (
        <div>
          <Card title="单个控件" size="small">
            <Form layout="inline">
              <FormItem label="案件编号" name="syskey" {...form.validateInfos.syskey}>
                <Search
                  onSearch={async () => {
                    const formData = await form.validate();
                    console.log(formData);
                  }}
                  style={{ width: '220px' }}
                  v-model={[modelRef.syskey, 'value']}
                >
                  {{ enterButton: () => <span>查询</span> }}
                </Search>
              </FormItem>
            </Form>
          </Card>
        </div>
      );
    };
  },
});

export default FormDemo;

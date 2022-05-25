import { defineComponent } from 'vue';
import { Card, Form, FormItem, Input, Select, Button } from 'ant-design-vue';
import { useForm1, useForm2 } from './hook';

const { Search } = Input;
const { Option } = Select;

const FormDemo = defineComponent({
  name: 'FormDemo',
  setup() {
    const form1 = useForm1();

    const form2 = useForm2();

    return () => {
      return (
        <div>
          <Card title="单个控件" size="small">
            <Form layout="inline">
              <FormItem label="案件编号" {...form1.form.validateInfos.syskey}>
                <Search
                  onSearch={async () => {
                    const formData = await form1.form.validate();
                    console.log(formData);
                  }}
                  style={{ width: '220px' }}
                  v-model={[form1.modelRef.syskey, 'value']}
                >
                  {{ enterButton: () => <span>查询</span> }}
                </Search>
              </FormItem>
            </Form>
          </Card>
          <br />
          <Card title="单个其他控件" size="small">
            <Form layout="inline">
              <Form.Item label="水果" {...form2.form.validateInfos.fruit}>
                <Input.Group compact>
                  <Input style={{ width: '160px' }}></Input>
                  <Select style={{ width: '160px' }} v-model={[form2.modelRef.fruit, 'value']}>
                    <Option value="apple">苹果</Option>
                    <Option value="banana">香蕉</Option>
                    <Option value="watermalen">西瓜</Option>
                  </Select>
                  <Button>提交</Button>
                </Input.Group>
              </Form.Item>
            </Form>
          </Card>
        </div>
      );
    };
  },
});

export default FormDemo;

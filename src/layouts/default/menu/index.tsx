import { defineComponent } from 'vue';
import { ElMenu } from 'element-plus';
import { useRouter } from 'vue-router';
import { MenuUtils } from './utils';
import { useConsumer } from '../layoutUtils';
import './index.scss';

const Menu = defineComponent({
  setup() {
    const menuUtils = new MenuUtils([
      { title: '工作台', path: '/dashboard' },
      {
        title: '错误页面',
        path: '/error',
        children: [
          {
            title: '401',
            path: '/401',
          },
          {
            title: '404',
            path: '/404',
          },
        ],
      },
      {
        title: '三级菜单',
        path: '/parent1',
        children: [
          {
            title: 'p1',
            path: '/p1',
            children: [
              {
                title: 'c1',
                path: 'c1',
              },
            ],
          },
        ],
      },
      ...Array.from(new Array(20)).map((v, i) => ({
        title: `菜单${i}`,
        path: `/par${i}`,
      })),
    ]);

    const { collapse, isSmallerThanTablet } = useConsumer()!;

    const router = useRouter();

    return {
      menuUtils,
      collapse,
      isSmallerThanTablet,
      router,
    };
  },
  render() {
    const { menuUtils, isSmallerThanTablet, collapse, router } = this;

    return (
      <ElMenu
        collapse={isSmallerThanTablet ? false : collapse}
        onSelect={(key) => {
          router.push(key);
        }}
      >
        {menuUtils.render()}
      </ElMenu>
    );
  },
});

export default Menu;

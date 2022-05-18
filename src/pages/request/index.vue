<template>
  <div>
    <el-button @click="onClick">GET normal</el-button>
    <el-button @click="onDoubleRequest"> 同步发送2个请求 </el-button>
    <el-button @click="onSeperateRequest">分开发送2个请求</el-button>
  </div>
</template>

<script setup lang="ts">
import request from '~/utils/http';
import Progress from '~/utils/progress';
import { delay } from '~/utils';
import * as services from './services';

const onClick = async () => {
  /**
   * 请求体也可定义泛型
   * 参数1为入参类型
   * 参数2位出参类型
   * extraData作用与axios.data一致
   */
  const response = await request(services.getTableData, {
    // extraData: {
    //   a: 1,
    //   b: 2,
    //   'c[]': [1, 2, 3],
    // },
    onSuccess: (res) => {
      console.log('onSuccess', res);
    },
  });

  console.log('ret', response);
};

const onDoubleRequest = async () => {
  const ins = new Progress();
  Promise.all([
    new Promise((resolve) => {
      console.log('start1');
      const stop = ins.start();
      setTimeout(() => {
        console.log('stop1');
        stop();
        resolve('1');
      }, 2000);
    }),
    new Promise((resolve) => {
      console.log('start2');
      const stop = ins.start();
      setTimeout(() => {
        console.log('stop2');
        stop();
        resolve('2');
      }, 4000);
    }),
  ]);
};

const onSeperateRequest = async () => {
  const ins = new Progress();

  setTimeout(() => {
    console.log('start1');
    const stop = ins.start();
    setTimeout(() => {
      console.log('stop1');
      stop();
    }, 2000);
  }, 200);

  setTimeout(() => {
    console.log('start2');
    const stop = ins.start();
    setTimeout(() => {
      console.log('stop2');
      stop();
    }, 200);
  }, 1000);
};
</script>

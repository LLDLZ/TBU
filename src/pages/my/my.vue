<template>
  <view class='my'>
    <view class="my-main">
      <view class="text">姓名</view>
      <view class="text">工号</view>
      <view class="text">所属工厂</view>
      <view class="text">当前版本号</view>
      <view class="text">服务器环境</view>
      <view class="text">数据库</view>
      <view class="text">版本日志信息</view>
    </view>
  </view>
</template>

<script lang='ts'>
  import {
    Component,
    Vue,
    Watch,
    Prop
  } from 'vue-property-decorator';
  import {
    State,
    Action,
    Mutation
  } from 'vuex-class';
  @Component({})
  export default class My extends Vue {

    //app生命周期
    onLaunch() {

    }

    onShow() {

    }

    onHide() {

    }
    //vue生命周期
    mounted() {}

  }
</script>

<style lang='scss' scoped>
  .my {
    background: $tbu-content-bg;
    padding: 20px 0;
    min-height: $tbu-father-view-min-height;

    .my-main {
      margin: 0 auto;
      padding: 5px;
      width: 90%;
      border-radius: 10px;
      background: #ffffff;

      .text {
        @include tbu-view-text
      }
    }
  }
</style>
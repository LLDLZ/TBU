<template>
  <view class='index'>
    
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
  export default class Index extends Vue {

    //app生命周期
    onLaunch() {

    }

    onShow() {
      
    }

    onHide() {

    }
    //vue生命周期
    mounted() {
      uni.showTabBar()
    }

  }
</script>

<style lang='scss' scoped>

</style>
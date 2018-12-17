<template>
  <div id="app">

      <pc-auth-header></pc-auth-header>
      <el-main>
      <router-view></router-view>
      </el-main>
      <pc-auth-footer></pc-auth-footer>



  </div>
</template>
<script>
  import PcAuthHeader from './views/layout/header/index.vue';
  import PcAuthFooter from './views/layout/footer/index.vue';
  export default {
    components: {
      PcAuthHeader,
      PcAuthFooter
    }
  };
</script>
<style>
  .el-main {
    min-height: calc(100vh - 80px);
  }
  /*@import './assets/styles/index.scss';*/
  /*.w {
    width: 100%;
    margin: 0 auto;
  }
  .auth-contanier {
    background-color: #f8f8f8;
    position: relative;
    min-height: 670px;
    height: 100%;
  }
  .main {
    height: 100%;
    padding: 116px 0;
  }
  .main-big {
    width: 1000px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }*/
</style>

<template>
  <div>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <!--logo 预留-->
       <!-- <img src="../../../assets/images/logo.png"/>-->
        <el-menu-item index="2" style="float: right"><a @click="loadPage('Login')">登录</a></el-menu-item>
        <el-menu-item index="3" style="float: right"><a @click="logout()">退出</a></el-menu-item>
      </el-menu>
    </el-header>
  </div>
  <!--<div class="header">
    <div class="header-in w">
      <div class="header-l">
        &lt;!&ndash; header logo&ndash;&gt;
        <img src="../../../assets/images/logo.png">
        <ul>
          &lt;!&ndash;<li><a href="http://mall.paascloud.net" target="_blank" class="header-font">商城</a></li>
          <li><a href="https://gitee.com/paascloud/paascloud-master" class="header-font" target="_blank">码云</a></li>
          <li><a href="https://github.com/paascloud/paascloud-master" class="header-font" target="_blank">GITHUB</a></li>
          <li><a href="http://blog.paascloud.net" class="header-font" target="_blank">BLOG</a></li>&ndash;&gt;
        </ul>
      </div>
      <div class="header-r">
        <ul>
          <li><a @click="loadPage('Login')" class="header-font">登录</a></li>
          <li><a @click="logout()" class="header-font">退出</a></li>
        </ul>
      </div>
    </div>
  </div>-->
</template>
<style>
  .el-header {
    padding: 0 0px;
  }
</style>


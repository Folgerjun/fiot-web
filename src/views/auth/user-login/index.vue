<template>
  <div>
      <img class="main-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544183080747&di=2aa2927be47d4bff186490b9e7843182&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F58%2F55%2F84y58PICBIV_1024.jpg" alt="">
  <div class="form-login">
    <!--<img class="main-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544183080747&di=2aa2927be47d4bff186490b9e7843182&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F58%2F55%2F84y58PICBIV_1024.jpg" alt="">-->
    <div>
      <i class="fa fa-user-o" aria-hidden="true"></i>
      <span>登录</span>
    </div>
  <br/>
    <div>
      <el-input
        placeholder="请输入帐号"
        v-model="loginForm.loginName"
        type="text"
        clearable>
      </el-input>
      <br/><br/><br/>
      <el-input
        placeholder="请输入密码"
        v-model="loginForm.loginPwd"
        type="password"
        clearable>
      </el-input>
      <br/><br/>
      <el-button type="primary" round @click="doLogin">登录</el-button>

    </div>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loginForm: {
          loginName: '',
          loginPwd: ''
        }
      };
    },
    mounted () {
    },
    methods: {
      doLogin () {
        let validateResult = this.formValidate();
        console.log('vali', validateResult);
        if (!validateResult.status) {
          this.$message({
            showClose: true,
            message: validateResult.msg,
            type: 'warning'
          });
          return;
        }
        this.login();
      },
      login () {
        let loginName = this.loginForm.loginName;
        let loginPwd = this.loginForm.loginPwd;
        this.$http({
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: '/api/user/login',
          params: {
            username: loginName,
            password: loginPwd
          }
        }).then((res) => {
          console.log('login res:', res);
          if (res && res.code === 200) { // 登录成功
            this.$message({
              autoClose: true,
              message: res.message,
              type: 'success'
            });
            // 存储登录信息
            this.$common.saveLocal('username', loginName);
            this.$common.saveLocal('projects', JSON.stringify(res.obj));
            this.$router.push({
              name: 'ModelIndex'
            });
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'warning'
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      formValidate () {
        let result = {
          status: false,
          msg: ''
        };
        if (!this.validate(this.loginForm.loginName, 'require')) {
          result.msg = '用户名不能为空';
          return result;
        }
        if (!this.validate(this.loginForm.loginPwd, 'require')) {
          result.msg = '密码不能为空';
          return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
      }
    },
    computed: {
    }
  };
</script>
<style>

  .main-img {
    width: 40%;
    height: auto;
    float: left;
    padding-top: 150px;
    padding-left: 100px;
  }
  .form-login {
    float: right;
    padding-right: 100px;
    padding-top: 150px;
  }
  .form-login .el-input {
    width: 200px;
  }
  .form-login .el-button {
    width:200px;
  }
</style>

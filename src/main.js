import Vue from 'vue';
import App from './App';
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from 'axios';
import Vuex from 'vuex';
import store from './store/';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import 'font-awesome/css/font-awesome.css';
import Mixin from './mixins';
import 'element-ui/lib/theme-chalk/index.css';
import './style.less';
import ElementUI from 'element-ui';
import common from './common/common.js';

Vue.use(ElementUI);

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.use(ElementUI.Loading.directive);
Vue.prototype.$pcNProgress = NProgress;
Vue.prototype.$common = common;
Vue.prototype.$http = axios.create({
  timeout: 60000
});

Vue.prototype.$http.interceptors.response.use((res) => {
  console.log('interceptors:', res);
  if (res.data) {
    return res.data;
  }
}, (error) => {
  let options = {
    showClose: true,
    message: error.response.data.message
  };
  if (error.response) {
    console.error('error: ', error.response);
    if (error.response.status === 500) {
      options.message = error.response.data.message;
    } else if (error.response.status === 401) {
      options.message = '登录超时, 请重新登录';
      window.location.href = '/';
    } else {
      console.log('Error', error);
      options.message = '接口请求失败或超时！请刷新重试';
    }
  } else {
    options.message = '接口请求失败或超时！请刷新重试';
  }
  Vue.prototype.$message(options);
});

router.beforeEach((to, from, next) => { // 路由之前
  NProgress.start();
  next();
});
router.afterEach(transition => { // 路由之后
  NProgress.done();
});

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/loading-svg/loading-bars.svg',
  loading: '/static/loading-svg/loading-spinning-bubbles.svg',
  attempt: 2
});
Vue.use(infiniteScroll);
Vue.mixin(Mixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

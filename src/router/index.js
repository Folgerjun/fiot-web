import { Error, Auth, Model } from '../views/';
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['views/layout/index.vue'], resolve),
      redirect: {name: 'Login'},
      children: [{
        meta: {
          name: '用户登录',
          noRequiredAuth: true
        },
        path: 'login',
        name: 'Login',
        component: Auth.Login
      }, {
        meta: {
          name: '数据首页',
          noRequiredAuth: true
        },
        path: 'modelIndex',
        name: 'ModelIndex',
        component: Model.ModelIndex
      }]
    },
    {
      path: '*',
      component: Error.NotFoundPage
    }
  ]
});

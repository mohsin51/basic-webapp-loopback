import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/index'
import signupPage from '@/components/Form'
import dashPage from '@/components/dashboard'
import editProfPage from '@/components/editprofile.vue'
import store from '../store'

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'index',
      component: indexPage
    },
    {
      path: '/signup',
      name: 'signupLogin',
      component: signupPage
    },
    {
      path: '/dashboard',
      name: 'dashboardPage',
      component: dashPage
    },
    {
      path:'/editProfile',
      name:'editProfilePage',
      component:editProfPage,
      beforeEnter: (to, from, next) => {
        if(store.state.user.user === null || store.state.user.user === undefined)
        {
          next('/dashboard');
        }
        else
        {
          next();
        }
      }
    }


],
  mode:"history"
})

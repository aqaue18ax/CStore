import Vue from 'vue'
import Router from 'vue-router'

import Reg from './views/Reg.vue'
import Login from './views/Login.vue'
import User from './views/User.vue'
import Audit from './views/Audit.vue'
import Input from './views/Input.vue'
import Stores from './views/Stores.vue'
import Store from './views/Store.vue'
import Intro from './views/Intro.vue'
import Brand from './views/Brand.vue'

import Index from './views/Index.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '正泰C-Store终端建设平台'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        title: '正泰版图',
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        title: '编辑资料',
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/audit',
      name: 'audit',
      component: Audit,
      meta: {
        title: '提交审核',
        auth: true
      }
    },
    {
      path: '/stores',
      name: 'stores',
      component: Stores,
      meta: {
        auth: true
      }
    },
    {
      path: '/store/intro/:id',
      name: 'intro',
      component: Intro,
      meta: {
        title: '门店简介',
        auth: true
      }
    },
    {
      path: '/store/brand/:id',
      name: 'brand',
      component: Brand,
      meta: {
        title: '品牌形象',
        auth: true
      }
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
      meta: {
        title: '详细资料',
        auth: true
      }
    },
    {
      path: '/input',
      name: 'input',
      component: Input,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.query.title) {
    document.title = to.query.title
  }

  if (to.meta.auth && !localStorage.getItem('token')) {
    next({ path: '/login' })
  }

  next()
})

export default router
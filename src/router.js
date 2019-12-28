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
import Line from './views/Line.vue'
import Operation from './views/Operation.vue'
import Develop from './views/Develop.vue'

import Index from './views/Index.vue'
import Home from './views/Home.vue'

import cStore from "./components/store.vue";
import cLayout from "./components/layout.vue";

import cMIndex from "./components/market/index.vue";
import cMMarket from "./components/market/market.vue";
import cMStore from "./components/market/store.vue";

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
      name: 'home',
      children: [
        {
          path: 'market',
          component: cMIndex,
          children: [
            {
              path: ':id',
              name: 'home/market',
              component: cMMarket,
              meta: {
                title: '正泰门店',
                auth: true,
                audit: true,
                keepAlive: true
              }
            },
            {
              path: ':id/store/:cid',
              name: 'home/market/store',
              component: cMStore,
              meta: {
                title: '正泰门店',
                auth: true,
                audit: true,
                keepAlive: true
              }
            }
          ]
        },
        {
          path: 'store/:id',
          name: 'home/store',
          component: cStore,
          meta: {
            title: '正泰门店',
            auth: true,
            audit: true,
            keepAlive: true
          }
        },
        {
          path: 'search',
          name: 'home/search',
          component: cLayout,
          meta: {
            title: '正泰门店',
            auth: true,
            audit: true,
            keepAlive: true
          }
        }
      ],
      meta: {
        title: '正泰门店',
        audit: true,
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/operation',
      name: 'operation',
      component: Operation,
      meta: {
        title: '运营状况',
        audit: true,
        auth: true
      }
    },
    {
      path: '/develop',
      name: 'develop',
      component: Develop,
      meta: {
        title: '开发统计',
        auth: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        title: '编辑资料',
        auth: true
        // keepAlive: true
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
        audit: true,
        auth: true
      }
    },
    {
      path: '/store/brand/:id',
      name: 'brand',
      component: Brand,
      meta: {
        title: '品牌形象',
        audit: true,
        auth: true
      }
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
      meta: {
        title: '详细资料',
        audit: true,
        auth: true
      }
    },
    {
      path: '/input',
      name: 'input',
      component: Input,
      meta: {
        audit: true,
        auth: true
      }
    },
    {
      path: '/line/:id',
      name: 'line',
      component: Line,
      meta: {
        title: '运营情况',
        audit: true,
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
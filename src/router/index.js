import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Three from '@/components/three'
import Plane from '@/components/plane'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/three',
      name: 'three',
      component: Three
    },
    {
      path: '/plane',
      name: 'plane',
      component: Plane
    }
  ]
})

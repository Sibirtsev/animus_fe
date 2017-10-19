import Vue from 'vue'
import Router from 'vue-router'

import createApartment from '@/components/createApartment'
import showApartments from '@/components/showApartments'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/create', component: createApartment },
    { path: '/', component: showApartments }
  ]
})

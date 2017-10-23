import Vue from 'vue'
import Router from 'vue-router'

import createAndUpdateApartment from '@/components/createAndUpdateApartment'
import deleteApartment from '@/components/deleteApartment'
import showApartments from '@/components/showApartments'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/create', component: createAndUpdateApartment },
    { path: '/edit/:apartmentId', component: createAndUpdateApartment, props: true },
    { path: '/delete/:apartmentId', component: deleteApartment, props: true },
    { path: '/', component: showApartments }
  ]
})

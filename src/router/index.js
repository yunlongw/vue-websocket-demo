import Vue from 'vue'
import VueRouter from 'vue-router'
import Message from '../views/Message.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'message',
    component: Message
  },
]

const router = new VueRouter({
  routes
})

export default router

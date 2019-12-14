import Vue from 'vue'
import VueRouter from 'vue-router'
import Message from '@/views/Message.vue'
import Login from '@/views/Login.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'message',
        component: Message
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {

});

export default router

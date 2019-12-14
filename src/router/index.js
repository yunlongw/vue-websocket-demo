import Vue from 'vue'
import VueRouter from 'vue-router'
import Message from '../views/Message.vue'
import Login from '../views/Login.vue'
import guest from '../middleware/guest'

Vue.use(VueRouter);

const routes = [
    {
        path: '/message',
        name: 'message',
        component: Message,
        meta : {
            middleware :[
                guest
            ]
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta : {
            middleware :[
                guest
            ]
        }
    },
];

const router = new VueRouter({
    routes
});

//全局路由导航钩子
router.beforeEach((to, from, next) => {
    //此处获取登陆的用户信息，可以按照自己的方法获取，此处暂时用localStorage里面获取
    var userToken = localStorage.getItem("userToken");
    window.console.log(userToken);
    //判断是否存在用户信息、或者该页面是否需要登陆
    if (userToken) {
        //如果能获取到用户信息，说明用户已经登陆了，或者该页面不需要登陆也能进入就直接放行进入该页面
        next()
    } else {
        //否则的跳转到登陆页面，并且带上当前页面的地址，用于登陆后重新跳回来
        next({
            name: 'login',
            query: {
                redirect: to.fullPath//当前页面的地址
            }
        })
    }
});


export default router

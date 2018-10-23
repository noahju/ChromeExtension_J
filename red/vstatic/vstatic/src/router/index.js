/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/mainpage'
        },
        {
            path: '/'
            , component: resolve => require(['../components/common/home.vue'], resolve)
            , meta : {title : 'MainHome'}
            , children : [
                {
                  path:'mainpage'
                  , component: resolve=>require(['../components/common/mainpage.vue'] , resolve )
                  , meta : { title : 'MainPage'}
                }
            ]

        }
    ]
})

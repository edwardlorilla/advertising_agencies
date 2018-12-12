require('./bootstrap');

window.Vue = require('vue');

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import VueRouter from 'vue-router'
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', {
    get(){
        return this.$root.moment
    }
})
Vue.use(ElementUI, {locale})
Vue.use(VueRouter)
const routes = [
    {
        path: '/agencies',
        component: resolve => require(["./components/agencies/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-agency',
                component: resolve => require(["./components/agencies/view.vue"], resolve),
            },
            {
                path: 'create',
                name: 'create-agency',
                component: resolve => require(["./components/agencies/create.vue"], resolve),
            },
            {
                path: 'edit/:id',
                name: 'edit-agency',
                component: resolve => require(["./components/agencies/create.vue"], resolve),
            },
        ]
    },
    {
        path: '/',
        component: resolve => require(["./components/Dashboard/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-dashboard',
                component: resolve => require(["./components/Dashboard/MeetingView.vue"], resolve),
            },
        ]
    },
    {
        path: '/sic-codes',
        component: resolve => require(["./components/siccode/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-siccode',
                component: resolve => require(["./components/siccode/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-siccode',
                component: resolve => require(["./components/siccode/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-siccode',
                component: resolve => require(["./components/siccode/create.vue"], resolve),
            },
        ]
    }, {
        path: '/payments',
        component: resolve => require(["./components/payment/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-payment',
                component: resolve => require(["./components/payment/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-payment',
                component: resolve => require(["./components/payment/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-payment',
                component: resolve => require(["./components/payment/create.vue"], resolve),
            },
        ]
    }, {
        path: '/meeting-outcomes',
        component: resolve => require(["./components/meetingoutcome/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-meetingoutcome',
                component: resolve => require(["./components/meetingoutcome/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-meetingoutcome',
                component: resolve => require(["./components/meetingoutcome/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-meetingoutcome',
                component: resolve => require(["./components/meetingoutcome/create.vue"], resolve),
            },
        ]
    }, {
        path: '/meeting-types',
        component: resolve => require(["./components/meetingtype/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-meetingtype',
                component: resolve => require(["./components/meetingtype/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-meetingtype',
                component: resolve => require(["./components/meetingtype/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-meetingtype',
                component: resolve => require(["./components/meetingtype/create.vue"], resolve),
            },
        ]
    }, {
        path: '/staffs',
        component: resolve => require(["./components/meetingtype/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-staff',
                component: resolve => require(["./components/staff/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-staff',
                component: resolve => require(["./components/staff/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-staff',
                component: resolve => require(["./components/staff/create.vue"], resolve),
            },
        ]
    },
    {
        path: '/clients',
        component: resolve => require(["./components/client/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-client',
                component: resolve => require(["./components/client/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-client',
                component: resolve => require(["./components/client/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-client',
                component: resolve => require(["./components/client/create.vue"], resolve),
            },
        ]
    },
    {
        path: '/meetings',
        component: resolve => require(["./components/meeting/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-meeting',
                component: resolve => require(["./components/meeting/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-meeting',
                component: resolve => require(["./components/meeting/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-meeting',
                component: resolve => require(["./components/meeting/create.vue"], resolve),
            },
        ]
    },
    {
        path: '/invoices',
        component: resolve => require(["./components/invoice/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-invoice',
                component: resolve => require(["./components/invoice/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-invoice',
                component: resolve => require(["./components/invoice/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-invoice',
                component: resolve => require(["./components/invoice/create.vue"], resolve),
            },
        ]
    },
    {
        path: '/invoice-status',
        component: resolve => require(["./components/invoicestatus/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-invoice-status',
                component: resolve => require(["./components/invoicestatus/view.vue"], resolve),
            }, {
                path: 'create',
                name: 'create-invoice-status',
                component: resolve => require(["./components/invoicestatus/create.vue"], resolve),
            }, {
                path: 'edit/:id',
                name: 'edit-invoice-status',
                component: resolve => require(["./components/invoicestatus/create.vue"], resolve),
            },
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
const app = new Vue({
        el: '#app',

        data(){
            return {
                moment,
                now: ''
            }
        },
        mounted(){
            var vm = this
            var x = setInterval(function () {
                vm.now = new Date().getTime()
            }, 1000);
        },
        router,
        render: h => h(require('./components/App.vue'))
    })
    ;

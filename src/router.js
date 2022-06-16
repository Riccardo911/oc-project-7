import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Create from '@/components/Create.vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.use(Router)
// Vue.use(VueAxios, axios)

export default new Router ({
    mode: 'history', //remove # in url
    routes: [
        {path: '/home', component: Home},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/home/create', component: Create}
    ]
})
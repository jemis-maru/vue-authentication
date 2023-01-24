import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from './components/HomeComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import RegisterComponent from "./components/RegisterComponent.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomeComponent,
        },
        {
            path: '/login',
            component: LoginComponent,
        },
        {
            path: '/register',
            component: RegisterComponent,
        },
    ],
});

export default router;
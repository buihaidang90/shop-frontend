import { createRouter, createWebHistory } from "vue-router";
// import CryptoJS from 'crypto-js'; // npm i crypto-js

// function toPath(input: string): string { return CryptoJS.MD5('v' + input).toString(CryptoJS.enc.Hex); }

function isLoggedIn() {
    return false;
    //   const sessionStore = useSessionStore();
    //   sessionStore.updateSession();
    //   return sessionStore.isAuthenticated;
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('')
    },
    {
        path: '/admin',
        name: 'Admin',
        children: [
            { path: '', name: 'Dashboard', component: () => import('') }, // localhost/admin
            { path: 'users', name: 'UsersManage', component: () => import('') }, // localhost/admin/users
            { path: 'cetagories', name: 'CategoriesManage', component: () => import('') }, // localhost/admin/categories
        ],
    },
    {
        path: '/Error404Page',
        name: 'Error404Page',
        component: () => import('../views/vError404Page.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Error404Page' }
    },
    // Catch-all route to handle non-existent paths
    //{
    //  path: '/:pathMatch(.*)*',
    //  redirect: { name: 'Home' }
    //},
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isLoggedIn()) {
        if (import.meta.env.DEV) console.log(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}] replace by [Login]`);
        next({ name: 'Login', query: to.query });
    } else {
        if (import.meta.env.DEV) console.log(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}]`);
        next();
    }
});

router.afterEach(() => {
    window.scrollTo(0, 0);
});

export default router;
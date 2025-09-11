/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import { clog } from '@/helpers/utilities';
import { createRouter, createWebHistory } from 'vue-router'
// import CryptoJS from 'crypto-js'; // npm i crypto-js

// function toPath(input: string): string { return CryptoJS.MD5('v' + input).toString(CryptoJS.enc.Hex); }

// function isLoggedIn() {
//     return false;
//     //   const sessionStore = useSessionStore();
//     //   sessionStore.updateSession();
//     //   return sessionStore.isAuthenticated;
// }

const routes:any = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            { path: '', name: 'Home', component: () => import('@/pages/index.vue'), /*meta: { title: 'Shop Management - Home' }*/ },
        ]
    },
    // {
    //     path: '/admin',
    //     name: 'Admin',
    //     children: [
    //         { path: '', name: 'Dashboard', component: () => import('') }, // localhost/admin
    //         { path: 'users', name: 'UsersManage', component: () => import('') }, // localhost/admin/users
    //         { path: 'cetagories', name: 'CategoriesManage', component: () => import('') }, // localhost/admin/categories
    //     ],
    // },
    {
        path: '/Error',
        name: 'Error',
        component: () => import('@/pages/Error.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Error' }
    //  redirect: { name: 'Home' }
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//     if (to.name !== 'Login' && !isLoggedIn()) {
//         clog(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}] replace by [Login]`);
//         next({ name: 'Login', query: to.query });
//     } else {
//         clog(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}]`);
//         next();
//     }
// });

router.afterEach((to, from, next) => {
    // document.title = to.meta.title ?? 'Shop Management'; // Fallback title
    document.title = 'Shop Management'; // Fallback title
    window.scrollTo(0, 0);
});


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
});

export default router

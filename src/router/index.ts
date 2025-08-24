/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            { path: '', name: 'Home', component: () => import('@/pages/index.vue') },
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
        component: () => import('../pages/Error.vue'),
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
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

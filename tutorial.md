# Step by step to build Shop-FrontEnd by Vuetify

# tạo mới dự án bằng Vuetify sử dụng Vuejs
npm create vuetify@latest shop-frontend
[shop-frontend] là tên dự án muốn đặt, sau đó làm theo các hướng dẫn và chọn nền tảng thích hợp

# cài đặt Pinia - thư viện quản lý state
npm i pinia
hoặc npm i --exact pinia@3.0.3
(https://pinia.vuejs.org/)

# cài đặt Vue-Router - thư viện quản lý routes
npm i vue-router@4
(https://router.vuejs.org/installation)

# cài đặt i18n - thư viện quản lý locale, đa ngôn ngữ, và các định dạng số, ngày tháng, tiền tệ
npm i vue-i18n

<!-- ##################################################################################################### -->

# cấu hình để chạy debug vuejs trong VS code
trong VS Code, nhấn Ctrl + Shift + D hoặc mở Run and Debug trong left panel.
trong Run and Debug panel, chọn [create launch.json file], chọn tiếp Node.js.
trong file launch.json vừa được tạo ra, copy và paste đoạn code cấu hình bên dưới vào file và save lại.

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            // "type": "msedge", // Microsoft Edge
            // "type": "firefox", // Firefox
            "name": "Vuejs-Chrome", // tên hiển thị trên thanh điều hướng Run and Debug
            "request": "launch", // chạy một instance mới của browser để debug
            "url": "http://localhost:8000", // thay 8000 bằng port đã cấu hình ở file vite.config.ts
            "webRoot": "${workspaceFolder}/src", // thư mục chứa source code muốn debug. Nếu ko sử dụng thư mục src chứa source, thì thay src bằng thư mục chứa source code
            // "breakOnLoad": true, // tùy chọn này đã ko còn sử dụng ở phiên bản VS Code hiện tại
            // "sourceMaps": true,
            "preLaunchTask": "npm: dev", // lệnh run app ở chế độ dev, có thể thay thế bằng các lệnh cấu hình ở phần script của file package.json
        }
    ]
}

Từ lúc này trở đi, có thể chạy app bằng chức năng Start Debugging trong menu Run của VS Code,
hoặc trong Run and Debug panel, hoặc phím F5.
<!-- file launch.json sẽ được lưu tại project-name/.vscode/launch.json -->


<!-- ##################################################################################################### -->

# cách viết và đọc file .env, file cấu hình biến môi trường

để thao tác với biến môi trường trong nodejs, cần cài thêm gói @types/node
npm i @types/node -D

## tạo file .env và đọc nội dung
tại thư mục gốc của ứng dụng, tạo file với tên .env (ko có phần mở rộng),
nội dung có thể tương tự như bên dưới:

<!-- ***** -->
# Application Settings
VITE_APP_NAME="Shop-Frontend"
VITE_APP_DEBUG=true
VITE_APP_LOGGING=true

# API Keys and Secrets
VITE_API_URL=
VITE_API_KEY=your_secret_api_key_here
<!-- ***** -->

(*) nhớ thêm [.env] vào file .gitignore, để khi push code lên github, nó sẽ bỏ qua file .env,
để tránh làm lộ các thông tin quan trọng như cấu hình db, hệ thống.

đọc giá trị biến môi trường trong file .env
console.log('App name >>', import.meta.env.VITE_APP_NAME);

## tạo file config, cấu hình biến môi trường và đọc nội dung
trong thư mục [src], tạo thư mục [configs] (hoặc đặt tên gì gợi nhớ cũng đc).
trong thư mục [configs], tạo file [app.config.ts] để lưu cấu hình của ứng dụng
nội dung file [app.config.ts] tương tự như sau:

export default {
    appName: import.meta.env.VITE_APP_NAME ?? 'Shop-Frontend',
    isDebug: import.meta.env.VITE_APP_DEBUG === 'true' || import.meta.env.VITE_APP_DEBUG === 'yes' || import.meta.env.VITE_APP_DEBUG === '1',
    isLogging: import.meta.env.VITE_APP_LOGGING === 'true' || import.meta.env.VITE_APP_LOGGING === 'yes' || import.meta.env.VITE_APP_LOGGING === '1',
    apiUrl: import.meta.env.VITE_API_URL,
}


(*) các key theo sau [import.meta.env.] chính là các key đã định nghĩa trong file [.env],
nếu trong file .env ko có những key này, thì sẽ trả về giá trị sau dấu [||] hoặc undifined,
hoặc ta có thể code thêm logic để trả về những giá trị hợp lý

(*) Nếu [import.meta.env.] báo lỗi như thông báo bên dưới:
The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020',...
để typescript hiểu các meta này, thêm cấu hình sau vào file [tsconfig.json]
{
    ...
    "compilerOptions": {
        ...
        "module": "esnext", // or es2020, es2022, esnext, system, node16, nodenext
        "target": "esnext", // or a compatible ES version
    }
}

sau khi lưu thay đổi, restart lại VS Code để áp dụng cài đặt,
hoặc khởi động lại server TypeScript trong VS Code bằng Command Palette,
trong VS Code, mở Command Palette bằng phím tắt Ctrl + Shift + P,
nhập "TypeScript: Restart TS server" vào thanh tìm kiếm và enter.

>> cách đọc giá trị cấu hình
tại component/file cần lấy cấu hình, import file cấu hình vào
import config from '..src/configs/app.config';

đọc các giá trị key đã cấu hình
console.log('App name >>', config.appName);
console.log('API url >>', config.apiUrl);

(appName & apiUrl là những key đã định nghĩa trong file app.config.ts)

## lưu ý quan trọng với file .env
tên file phải là [.env], nếu khác, vite sẽ ko hiểu.

phải đặt tại thư mục gốc của ứng dụng, nếu khác, vite sẽ ko đọc được.

các biến môi trường phải bắt đầu bằng tiền tố [VITE_], nếu ko vite sẽ ko lấy được giá trị và trả về undefined

khi đọc file cấu hình trực tiếp từ .env, nếu muốn thay đổi cấu hình trong .env,
phải restart ứng dụng, vite mới hiểu cấu hình mới.

Khi đọc file cấu hình thông qua config, thay đổi cấu hình trong file app.config.ts,
ko cần restart ứng dụng, mỗi lần lưu file, vite sẽ tự load cấu hình mới.

(⚠️) Đặc biệt: trong file vite.config.ts, ko thể đọc biến môi trường hay file cấu hình,
phải set giá trị trực tiếp thì lúc run/build vite mới hoạt động đúng

<!-- ##################################################################################################### -->

# cấu hình tên thư mục thay thế khi import - alias path trong file [vite.config.ts]
để khi biên dịch code vite hiểu được alias path

import { fileURLToPath, URL } from "url"; // 👈 cần cài đặt gói @types/node

export default defineConfig({
  ...
  resolve: {
    // cách 1
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    //   '@configs': fileURLToPath(new URL('./src/configs', import.meta.url)),
    //   '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
    //   '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    //   '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    //   '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
    // },
    // cách 2
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@configs', replacement: fileURLToPath(new URL('./src/configs', import.meta.url)) },
      { find: '@helpers', replacement: fileURLToPath(new URL('./src/helpers', import.meta.url)) },
      { find: '@router', replacement: fileURLToPath(new URL('./src/router', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) },
    ],
  }
});

sử dụng: lúc import chỉ cần thay thế alias tương ứng trong path là đc
vd: import config from '@/configs/app.config';

<!-- ##################################################################################################### -->

# cấu hình port chạy web trong file [vite.config.ts]
export default defineConfig({
    ...
    server: {
        port: 3000, // Change this to your desired port
      },
}

<!-- ##################################################################################################### -->

# cấu hình vue-router để quản lý routes
(https://router.vuejs.org/guide/)

## tạo module xử lý routes
sau khi cài đặt vue-router, trong thư mục src, tạo thư mục [router],
trong thư mục router, tạo file [index.ts], thêm code tương tự như sau:

import { createRouter, createWebHistory } from "vue-router";

const routes:any = [
    {
        path: '/', // 👈 đường dẫn route sẽ định nghĩa, dùng gọi đến route, vd: router.push('/')
        name: 'Home', // 👈 tên route, dùng gọi đến route, vd: router.push('Home')
        component: () => import('@/views/Home.vue') // 👈 tên file chứa page mà route muốn đến
    },
    {
        path: '/admin', // 👈 route path [ko] có component, có children, đc dùng như chức năng nhóm các route cùng nhánh
        children: [
            { path: '', name: 'Dashboard', component: () => import('@/views/admin/Dashborad.vue') }, // localhost/admin
            { path: 'users', name: 'UsersManage', component: () => import('@/views/admin/UsersManage.vue') }, // 👉 localhost/admin/users
            { path: 'cetagories', name: 'CategoriesManage', component: () => import('@/views/admin/CategoriesManage.vue') }, // 👉 localhost/admin/categories
        ],
    },
    {
        path: '/user', // 👈 route path [có] component, có children, đc dùng như chức năng nhóm các route lồng nhau
        component: () => import('@/components/MainLayout.vue'), // 🚩 trong MainLayout.vue sẽ có thêm thẻ <RouterView/> để render các page định nghĩa trong children
        children: [
            { path: '', name: 'Setting', component: () => import('@/views/admin/Dashborad.vue') }, // localhost/admin
            { path: 'users', name: 'ChangePass', component: () => import('@/views/admin/UsersManage.vue') }, // 👉 localhost/admin/users
            { path: 'cetagories', name: 'Profile', component: () => import('@/views/admin/CategoriesManage.vue') }, // 👉 localhost/admin/categories
        ],
    },
    {
        path: '/ErrorPage',
        name: 'ErrorPage',
        component: () => import('../views/ErrorPage.vue'),
    },
    {
        path: '/:pathMatch(.*)*', // 👈 những route nằm ngoài định nghĩa, sẽ được chuyển về ErrorPage
        // hoặc: path: '/:cai_gi_do(.*)*',
        redirect: { name: 'ErrorPage' }
    },
    // Catch-all route to handle non-existent paths
    //{
    //  path: '/:pathMatch(.*)*',
    //  redirect: { name: 'Home' }
    //},
];

// tạo đối tượng quản lý routes bằng vue-router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes // hoặc routes: routes 👈 định nghĩa các routes có thể có trong ứng dụng
});

// route guard-before: trước khi routes được gọi đến,
// vue-router sẽ kiểm tra xử lý cho đi tiếp, hoặc chặn route tùy vào logic được thiết lập
// to: route muốn đến, from: route xuất phát, next: method xử lý cho đi tiếp đến route [to] hoặc chặn ngay lập tức
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isLoggedIn()) {
        <!-- console.log(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}] replace by [Login]`); -->
        next({ name: 'Login', query: to.query });
    } else {
        <!-- console.log(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}]`); -->
        next();
    }
});

// route guard-after: sau khi đến routes được gọi,
// vue-router sẽ xử lý tiếp logic mà chúng ta mong muốn
router.afterEach(() => {
    window.scrollTo(0, 0);
});

export default router; // xuất đổi tượng quản lý vue-router để sử dụng ở main.ts

## đăng ký sử dụng module xử lý route
tại file [main.ts], thêm code sau

import { createApp } from 'vue'
import router from './router'; // 👈 import module xử lý route
import App from './App.vue'
const app = createApp(App)
app.use(router); // 👈 báo cho vue biết, sử dụng module xử lý route
app.mount('#app')

## cách sử dụng vue-router
thẻ RouterView:
tại file [App.vue], hoặc file muốn thêm nơi chứa page sẽ được render bởi vue-router, thêm thẻ <RouterView/>,
khi chạy ứng dụng, vue-router sẽ tìm các page của các route tương ứng đã định nghĩa,
vue-router sẽ thay thế thẻ RouterView bằng nội dung các page tương ứng tìm được.

thẻ RouterLink: (https://router.vuejs.org/guide/essentials/active-links)
khi cần thêm 1 liên kết dẫn đến trang mong muốn, tương tự như thêm thẻ <a href=''>
<RouterLink to="/admin/Dashboard">Admin Dashborad</RouterLink>

gọi route bằng code: (https://router.vuejs.org/guide/essentials/navigation.html)
router.push('/users/eduardo')
router.push({ path: '/register', query: { plan: 'private' } }) // 👉 localhost/register?plan=private
router.push({ name: 'user', params: { username: 'eduardo' } }); // 👉 localhost/user/eduardo
router.push({ path: '/user', params: { username } }) //  // 👉 localhost/user (⚠️)

(⚠️) khi chuyển route bằng [path], tất cả [params] sẽ bị bỏ qua,
nếu muốn chuyển route và truyền params, thì bắt buộc phải gọi route bằng [name]

<!-- ##################################################################################################### -->

# cách sử dụng thông báo Toast (PrimeVue) trong project Vuetify

## cài đặt PrimeVue & Theme primevue
npm install primevue @primeuix/themes

## tạo file cấu hình PrimeVue
cấu trúc dự án sau khi cài đặt:
shop-frontend
    |__ src
    |    |__ plugins
    |    |    |__ index.ts // 👈 file cấu hình chung tất cả plugin cho toàn project
    |    |    |__ vuetify.ts // 👈 file cấu hình vuetify
    |    |__ main.ts
    |__ tsconfig.json
    |__ vite.config.ts

trong thư mục plugin, tạo file [primevue.ts] để chứa cấu hình sử dụng PrimeVue

import PrimeVue from "primevue/config"; // Configs
import Aura from '@primeuix/themes/aura'; // Themes
import ToastService from 'primevue/toastservice'; // Services

export default {
    PrimeVue,
    ToastService,
    option: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-LDark',
          cssLayer: false,
        },
        semantic: {
          primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
          }
        },
      }
    }   
}

## thêm cài đặt cấu hình PrimeVue
trong hd này ko sử dụng auto-import cho primevue,
vì khi auto-import, sẽ import hết các component & service ko sử dụng,
dẫn đến khi bundle project sẽ làm tăng dung lượng source khi publish.
Nên ta chỉ use những thành phần có sử dụng.

trong thư mục plugins, mở file [index.ts] và thêm cấu hình PrimeVue

// Plugins
import vuetify from './vuetify'
import primevue from './primevue' // 👈 import file cấu hình
import pinia from '../stores'
import router from '../router'
import i18n from './i18n'
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(primevue.PrimeVue, primevue.option).use(primevue.ToastService) // 👈 thiết lập cấu hình
    .use(i18n.i18n)
}

## sử dụng Toast message
trong file [App.vue] hoặc file *.vue muốn sử dụng Toast, thêm code sau

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const showToast = async function (message: string, subMessage: string | null, type: string | null, displayTime: number | null) {
  if (message.trim() === '') return;
  let _msg = message; // This is main message from Toast
  let _icon = 'info';
  if (type) {
    const arr1 = ['success', 'info', 'warn', 'danger', 'secondary', 'error'];
    const arr2 = ['s', 'i', 'w', 'd', 'sc', 'e'];
    if (arr1.indexOf(type) > -1) _icon = type;
    else if (arr2.indexOf(type) > -1) _icon = arr1[arr2.indexOf(type)];
  }
  let _subMessage = subMessage ?? null; // This is sub message from Toast
  let _displayTime = displayTime ?? 3;
  if(_displayTime) {
    _displayTime = _displayTime * 1000;
    toast.add({ severity: _icon, summary: _msg, detail: _subMessage, life: _displayTime });
  }
  else {
    toast.add({ severity: _icon, summary: _msg, detail: _subMessage });
  }
};
<script>

<template>
  <v-app>
    <v-btn @click="showToast('This is message from Toast',null,null,null)">Show Toast</v-btn>
    <Toast :position="xs ? 'bottom-center' : 'bottom-right'" style='max-width: calc(100vw - 40px);'
      class="main-toast" />
  </v-app>
</template>

<style>
.main-toast .p-toast-message-icon {
  margin-top: 4px !important;
}
.main-toast .p-toast-close-button {
  margin-top: 1px !important;
}
.main-toast .p-toast-message {
  margin-bottom: 0.5rem !important;
}
</style>

<!-- ##################################################################################################### -->

# provide & inject để sử dụng lại code/component/element mà không cầu định nghĩa lại
(sử dụng Toast đã định nghĩa ở App.vue)

## provide
trong file [App.vue], thêm dòng code bên dưới, sau đoạn định nghĩa function showToast
provide('showToast', showToast);

## inject
tại nơi (file *.vue) muốn sử dụng Toast, phần [script], thêm dòng code sau
const showToast = inject('showToast') as (message: string, subMessage: string | null, type: string | null) => void;

<template v-slot:append>
    <v-btn icon="mdi-bell" @click="showToast('This is message from Inject',null,null)">Show Toast</v-btn>
</template>

<!-- ##################################################################################################### -->




































<!-- ##################################################################################################### -->

https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-myssql-client2

https://emojicombos.com/

📷💻🖥️📺📟🎬🕑🎧📣🚦🔗
🔲🧱🖼️🗺️🎨🏞️💫🎸🧲🎛️💾🌐🌍🔴🟢Ⓜ️⚕️
⭐✨⚡☄️☁️💨💭♨️💥🔥💧💦🧺⛲️🌫️
🏎️🚚🛒✈️🛩️🚀⚔️🔨🔍🧬🛠🛠️⚒️🔧⚙️📌🔫🖌️🪓🔪🧷📏📐
😼🐎🐇🕊️🐒🙈🐑🐧🐝🐞🐲🐉🐛🐹🐘🐌🐟🐸🧸🦢🐳🐚🐠
🏛️🏠📅🗃️📂⌘🧩⚜️♻️🔋💲𝄞💠🎲
👾👻🤖💂😊😁👣🤝👋👏✋✋🏻👉👈👌💀👀💋🦷🧠🔔🗝️🔑🔐🔒🆔#️⃣ℹ️🆗🔄🛡️
🎀💗💯👥👤🚧❔❓❗⛔🚫⭕⁉️⚠️✖️❎✅❌✔️🗪💬🗨️🗯️📤✉️📧⌯⌲📫
🧾📜📋📑📝📄📰🗐⿻📕📚🏢
🌷🌼💐🌹🌸🌺🥀🌾
🌵🌲🌳🥦🌴🌱🎋🌿🍃🍂🍁🍀☘️
🍎🍅🍋🍒🍓🍇🍍🥑🍉🥝🥥🥕🌶️🍆🥜🥬🥒
🥤🥗🍔🍗🍟🥓🧀🍚🍜🍟🥘🥟🍵⛲
🍹🍨❄️☀️🌈💎💍
🪂🎈🪁⛰️⛱️
🥇🏆🥈🎖️🥉🔰🚩

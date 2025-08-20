# Step by step to build Shop-FrontEnd

# tạo mới dự án bằng Vite sử dụng Vuejs
npm create vite@latest shop-frontend <!-- shop-frontend là tên dự án muốn đặt -->

# cài đặt Pinia - thư viện quản lý state
npm i pinia
hoặc npm i --exact pinia@3.0.3
(https://pinia.vuejs.org/)

# cài đặt Vue-Router - thư viện quản lý routes
npm i vue-router@4
(https://router.vuejs.org/installation)


npm i vuetify

npm i vue-i18n@11

<!-- ##################################################################################################### -->

# cấu hình để chạy debug vuejs trong vs code
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

## tạo file .env và đọc nội dung
tại thư mục gốc của ứng dụng, tạo file với tên .env (ko có phần mở rộng),
nội dung có thể tương tự như bên dưới
<!--
# Application Settings

VITE_APP_NAME="Shop-Frontend"
VITE_APP_DEBUG=true
VITE_APP_LOGGING=true

# API Keys and Secrets
VITE_API_URL=
VITE_API_KEY=your_secret_api_key_here
-->
(*) nhớ thêm [.env] vào file .gitignore, để khi push code lên github, nó sẽ bỏ qua file .env,
để tránh làm lộ các thông tin quan trọng như cấu hình db, hệ thống.

đọc giá trị biến môi trường trong file .env
console.log('App name >>', import.meta.env.VITE_APP_NAME);

## tạo file config, cấu hình biến môi trường và đọc nội dung
trong thư mục [src], tạo thư mục [configs] (hoặc đặt tên gì gợi nhớ cũng đc).
trong thư mục [configs], tạo file [app.config.ts] để lưu cấu hình của ứng dụng
nội dung file [app.config.ts] tương tự như sau:
<!--
export default {
    appName: import.meta.env.VITE_APP_NAME ?? 'Shop-Frontend',
    isDebug: import.meta.env.VITE_APP_DEBUG === 'true' || import.meta.env.VITE_APP_DEBUG === 'yes' || import.meta.env.VITE_APP_DEBUG === '1',
    isLogging: import.meta.env.VITE_APP_LOGGING === 'true' || import.meta.env.VITE_APP_LOGGING === 'yes' || import.meta.env.VITE_APP_LOGGING === '1',
    apiUrl: import.meta.env.VITE_API_URL,
}
-->

(*) các key theo sau [import.meta.env.] chính là các key đã định nghĩa trong file [.env],
nếu trong file .env ko có những key này, thì sẽ trả về giá trị sau dấu [||] hoặc undifined,
hoặc ta có thể code thêm logic để trả về những giá trị hợp lý

(*) Nếu [import.meta.env.] báo lỗi như thông báo bên dưới:
The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020',...
để typescript hiểu các meta này, thêm cấu hình sau vào file [tsconfig.json]

"compilerOptions": {
    "module": "esnext", // or es2020, es2022, esnext, system, node16, nodenext
    "target": "esnext", // or a compatible ES version
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

# cấu hình tên thay thế khi import - alias path

## cấu hình trong file [vite.config.ts]
để khi biên dịch code vite hiểu được alias path

import { fileURLToPath, URL } from "url"; // 👈 cần cài đặt gói @types/node

export default defineConfig({
  plugins: [vue()],
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
  },
  server: {
    port: 8000, // web-port
  },
});

sử dụng: lúc import chỉ cần thay thế alias tương ứng trong path là đc
vd: import config from '@/configs/app.config';

## cấu hình trong file [tsconfig.json]
để khi gõ code, typescript hiểu được alias path và gợi ý

  "compilerOptions": {
    ...
    "paths": {
      "@/*": ["./src/*"],
      "@assets/*": ["./src/assets/*"],
      "@components/*": ["./src/components/*"],
      "@configs/*": ["./src/configs/*"],
      "@helpers/*": ["./src/helpers/*"],
      "@router/*": ["./src/router/*"],
      "@stores/*": ["./src/stores/*"],
      "@views/*": ["./src/views/*"]
    }
  }

<!-- ##################################################################################################### -->

# cấu hình vue-router để quản lý routes
(https://router.vuejs.org/guide/)

## tạo module xử lý routes
sau khi cài đặt vue-router, trong thư mục src, tạo thư mục [router],
trong thư mục router, tạo file [index.ts], thêm code tương tự như sau:

import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
        <!-- if (import.meta.env.DEV) console.log(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}] replace by [Login]`); -->
        next({ name: 'Login', query: to.query });
    } else {
        <!-- if (import.meta.env.DEV) console.log(`🏠from [${from.name?.toString()}] to [${to.name?.toString()}]`); -->
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











































<!-- ##################################################################################################### -->

https://emojicombos.com/

📷💻📺📟🎬🕑🎧🚦🔗🎸🧲🎛️💾🌐🌍🔴🟢Ⓜ️⚕️
⭐✨⚡☄️☁️💨💭♨️💥🔥💧💦🧺🌫️
🏎️🚚🛒✈️🛩️🚀⚔️🔨🔍🧬🛠🛠️⚒️🔧⚙️📌🔫🖌️🪓🔪
😼🐎🐇🕊️🐒🐑🐧🐝🐞🐉🐹🐘🐛🐌🐟🐸
🏛️🏠📅🗃️📂⌘🧩⚜️♻️🔋
👾👻🤖💂😊👣👋👏✋👉👈👌💋👀💀🦷🧠🔔🗝️🔑🔐🔒🆔#️⃣ℹ️🔄🛡️
🎀💗💯👥👤🚧❓❗⛔⚠️✅❌✔️🗪💬📤📧📨⌯⌲📫
🧾📜📋📑📝📄📰🗐⿻📕📚
🌷🌼💐🌹🌸🌺🥀
🌵🌲🌳🥦🌴🌱🎋🌿🌾🍃🍂🍁🍀☘️
🍎🍅🍋🍒🍓🍇🍍🥑🍉🥝🥥🥕🌶️🍆🥜🥬🥒
🥤🥗🍔🍗🍟🥓🧀🍚🍜🍟🥘🥟🍵⛲
🍹🍨❄️☀️🌈💎💍
🪂🎈🪁⛰️⛱️
🥇🏆🥈🎖️🥉🔰🚩

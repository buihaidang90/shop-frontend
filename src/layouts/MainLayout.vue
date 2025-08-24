<script setup lang="ts">
import { clog } from '@/helpers/utilities';
import { useTemplateRef, ref } from 'vue';
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();
// clog(`🖼️ xs=${xs.value}, sm=${sm.value}, md=${md.value}, lg=${lg.value}`);

const showToast = inject('showToast') as (message: string, subMessage: string | null, type: string | null) => void;

const drawer = ref(false);
function toggleDrawer() {
    drawer.value = !drawer.value;
};

const txtSearchBar = useTemplateRef('txtSearchBar');
const onClickClear = function () {
    clog(`🖼️ onClickClear..to do task at here`);
};
const onClickSearch = function () {
    clog(`🖼️ onClickSearch..to do task at here`);
};

const onChangeFocused = function (focused: boolean) {
    // clog(`🖼️ onChangeFocused..focused=${focused}`);
    if (!focused) onToggleSearch();
};

const toggleSearchBar = ref(false);
const onToggleSearch = function () {
    // clog(`🖼️ onToggleSearch..`);
    toggleSearchBar.value = !toggleSearchBar.value;

    // clog(`🖼️ onToggleSearch..txtSearchBar.value=`,txtSearchBar.value);
    setTimeout(() => {
        if (toggleSearchBar) {
            txtSearchBar.value?.focus();
        }
    }, 100);
    if (toggleSearchBar) drawer.value = false;
};

</script>

<template>
    <v-layout class="rounded rounded-md border">
        <!-------------------------------------------------->
        <!-- App-bar -->
        <!-------------------------------------------------->
        <v-app-bar :elevation="2" :density="xs ? 'compact' : 'comfortable'">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
            </template>
            <v-toolbar-title class="shadow-0 overflow-visible" align="left" v-if="!xs">
                {{ "Shop Frontend" }}
            </v-toolbar-title>
            <v-text-field ref="txtSearchBar" placeholder="Search" density="compact" variant="solo" rounded="xl"
                width="100%" hide-details single-line clearable class="" v-if="toggleSearchBar"
                @update:focused="onChangeFocused" @click:clear="onClickClear" @keydown.enter="onClickSearch">
                <template v-slot:append-inner>
                    <v-btn icon="mdi-magnify" @click="onClickSearch" max-height="40"></v-btn>
                </template>
            </v-text-field>
            <v-spacer></v-spacer>
            <template v-slot:append>
                <v-btn icon="mdi-magnify" @click="onToggleSearch" rounded="xl" size="large" density="comfortable"
                    v-if="!toggleSearchBar"></v-btn>
                <v-btn icon="mdi-dots-vertical" @click="showToast('abc',null,'i')" rounded="xl" size="large" density="comfortable"></v-btn>
            </template>
        </v-app-bar>

        <!-------------------------------------------------->
        <!-- navigation-side-bar -->
        <!-------------------------------------------------->
        <v-navigation-drawer v-model="drawer" elevation="7">
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/81.jpg"
                    subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
                <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
                <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-------------------------------------------------->
        <!-- Content -->
        <!-------------------------------------------------->
        <v-main :scrollable="true" min-height="100vh" class="">
            <router-view />
            <!-- <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in" appear>
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view> -->
        </v-main>
    </v-layout>
</template>
<style scoped></style>
<style>
.main-toast .p-toast-message-icon{
    margin-top: 4px !important;
}
.main-toast .p-toast-close-button {
    margin-top: 1px !important;
}
.main-toast .p-toast-message{
    margin-bottom: 0.5rem !important;
}
</style>
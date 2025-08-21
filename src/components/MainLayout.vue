<script lang="ts">
import { ref } from 'vue';


const drawer = ref(true);
const toggleDrawer = function () {
    drawer.value = !drawer.value;
};

</script>

<template>
    <v-layout class="rounded rounded-md border">
        <!-------------------------------------------------->
        <!-- App-bar -->
        <!-------------------------------------------------->
        <v-app-bar density="compact" :elevation="2">
            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
            <v-toolbar-title class="shadow-0 overflow-visible" align="left">
                {{ "Shop Frontend" }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:append>
                <v-btn icon="mdi-heart" color="black" rounded="xl" size="large" density="comfortable"></v-btn>

                <v-btn icon="mdi-magnify" color="info" rounded="xl" size="large" density="comfortable"></v-btn>

                <v-btn icon="mdi-dots-vertical" color="info" rounded="xl" size="large" density="comfortable"></v-btn>
            </template>
        </v-app-bar>

        <!-------------------------------------------------->
        <!-- navigation-side-bar -->
        <!-------------------------------------------------->
        <v-navigation-drawer v-model="drawer" color="primary" elevation="7">
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
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
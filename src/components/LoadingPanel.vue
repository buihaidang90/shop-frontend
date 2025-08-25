<script setup lang="ts">
// const props = defineProps({
//     isShow: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
// });

const localIsShow = ref(false);

const setVisible = (visible:boolean) => {
    // console.log("🔄-LoadingPanel: ",visible);
    localIsShow.value = visible;
}

defineExpose({ setVisible });
</script>

<template>
    <v-overlay v-model="localIsShow" class="align-center justify-center" scroll-strategy="block">
        <v-progress-circular indeterminate :rotate="360" :size="150" :width="15" color="primary" class="text-h5">
            <template v-slot:default>
                <!-- Processing -->
            </template>
        </v-progress-circular>
    </v-overlay>
</template>
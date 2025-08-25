<script lang="ts" setup>
const itemsPayday = ref([
  { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
]);
</script>

<template>
  <v-card v-if="1" border="primary xl" rounded="xl" class="flex-fill align-self-auto" elevation="7">
    <!-- <v-card-title>Mankichi Kanjo System</v-card-title> -->
    <v-carousel class="tBanner clickable-carousel" color="white" show-arrows="hover" cycle interval="6000" height="100%"
      progress :hide-delimiter-background="false" v-slot:default="{ group }">
      <v-carousel-item alt="m-ERP" v-for="(item, i) in itemsPayday" :key="i" :src="item.src" cover
        class="cursor-pointer" @click="" draggable="false">
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>


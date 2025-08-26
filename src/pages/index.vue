<script lang="ts" setup>
import { clog } from '@/helpers/utilities';
import dayjs from 'dayjs';
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();

const banerItems = ref([
  { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', pdf: '/PayDay/EWA Service Introduction from VietUnion company_VN-combined.pdf', pdfJa: '/PayDay/EWA Service Introduction from VietUnion company_JP-combined.pdf' },
]);

const tabs = ref(null);
const discountTabs = reactive([
  {
    name: 'tab 1', ftime: dayjs().set('hour', 8).set('minute', 0).set('second', 0), ttime: dayjs().set('hour', 10).set('minute', 0).set('second', 0), state: 'Ended'
  },
  {
    name: 'tab 2', ftime: dayjs().set('hour', 12).set('minute', 0).set('second', 0), ttime: dayjs().set('hour', 14).set('minute', 0).set('second', 0), state: 'Ended'
  },
  {
    name: 'tab 3', ftime: dayjs().set('hour', 16).set('minute', 0).set('second', 0), ttime: dayjs().set('hour', 18).set('minute', 0).set('second', 0), state: 'On Going'
  },
]);

const onUpdateProItem = function (modelValue: any, btn:object) {
  // clog('modelValue >>', modelValue);
  clog('btn obj >>', btn);
};
</script>

<template>
  <v-card v-if="1" border="none" class="flex-fill align-self-auto" elevation="8">
    <v-carousel class="clickable-carousel" round="lg" color="white" show-arrows="hover" cycle interval="6000"
      height="200" progress="secondary" :hide-delimiter-background="false" v-slot:default="{ group }">
      <v-carousel-item alt="bhd-banner" v-for="(item, i) in banerItems" :key="i" :src="item.src" cover
        class="cursor-pointer" @click="" draggable="false">
      </v-carousel-item>
    </v-carousel>
  </v-card>

  <v-card class="mt-2 border-xl" border="info lg" width="100%">
    <v-tabs v-model="tabs" bg-color="primary" color="white" grow>
      <v-tab v-for="(item, index) in discountTabs" :key="index" :value="index">
        <!-- <v-icon icon="mdi-phone"></v-icon> -->
        <!-- {{ xs ? '' : `Tab 1` }} -->
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabs">
      <v-tabs-window-item v-for="(item, index) in discountTabs" :key="index" :value="index">
        <v-card>
          <v-slide-group :show-arrows="!xs">
            <v-slide-group-item v-for="n in 25" :key="n" v-slot="{ isSelected, toggle }">
              <!-- <product-item title="Combo 5 Loại Rau Củ: Cải Ngọt, Rau Muống, Rau Dền, Cà Rốt, Cà Chua"
                img="https://bizweb.dktcdn.net/thumb/medium/100/565/842/products/image-79e72a57-d705-4f6b-a35f-024032ea1a7a.jpg"
                :price=20590 :sub-price=23590 unit-currency="vnđ" @update:modelValue="onUpdateProItem"></product-item> -->
                <product-item title="Combo 5 Loại Rau Củ: Cải Ngọt, Rau Muống, Rau Dền, Cà Rốt, Cà Chua"
                :price=20590 :sub-price=23590 unit-currency="vnđ" @update:modelValue="onUpdateProItem"></product-item>
            </v-slide-group-item>
          </v-slide-group>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

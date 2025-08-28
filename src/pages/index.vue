<script lang="ts" setup>
import { clog } from '@/helpers/utilities';
import dayjs from 'dayjs';
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();

const showToast = inject('showToast') as (message: string, subMessage: string | null, type: string | null) => void;
const showMsg1 = inject("showMsg") as (message: string, title: string | null, type: string | null) => void;
const showMsg2 = inject("showMessage") as (message: string, title: string | null, type: string | null, showCancel: boolean | null) => void;

const banerItems = ref([
  { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' },
]);

// ================================================================================

interface TabItem {
  name: string;
  ftime: Date;
  ttime: Date;
  onGoing: boolean;
}
const discountTabs = ref<TabItem[]>([]);
const activeTab = ref(0);
watch(discountTabs, async (newVal) => {
  const now = new Date();
  discountTabs.value.forEach(el => {
    const from = el['ftime'];
    const to = el['ttime'];
    // clog('watch >> discountTabs >> forEach >> ftime >>', from);
    // clog('watch >> discountTabs >> forEach >> ttime >>', to);
    if (from <= now && now <= to) {
      activeTab.value = discountTabs.value.indexOf(el);
      duration.value = Math.ceil((to.getTime() - from.getTime()) / timeStep);
      step.value = Math.ceil((now.getTime() - from.getTime()) / timeStep);
    }
  });
}, { deep: true });
const beginTime = ref(new Date());
const endTime = ref(new Date());
const interval = ref();
const timeStep = 1000; // second
const duration = ref(0); // seconds
const step = ref(0);
const percentage = computed(() => {
  if (!duration.value || !step.value) return 0;
  const r = Math.ceil(step.value * 100 / duration.value); // làm tròn lên, vd: 3.14 => 4
  // const r =  Math.floor(step.value *100/ duration.value ); // làm tròn xuống, vd: 3.78 => 3
  // clog('computed >> percentage >> ', r);
  return r;
});
watch(percentage, async (newVal) => {
  // clog('watch >> percentage >> newVal >>', newVal);
  if (percentage.value === 100) {

  }
}, { deep: true });

const onChangeTab = function (modelValue: any) {
  // clog('onChangeTab >> modelValue >>', modelValue);
  // clog('onChangeTab >> activeTab.value >>', activeTab.value);
  //// if (modelValue == 1) activeTab.value = 2;
};

// ================================================================================

const onItemClickProd = function (modelValue: any) {
  clog('onItemClickProd >> modelValue >>', modelValue);
};
const onBtnClickProd = function (modelValue: any, btn: object) {
  // clog('onBtnClickProd >> modelValue >>', modelValue);
  clog('onBtnClickProd >> btn obj >>', btn);
};
const onAct1ClickProd = function (modelValue: any) {
  clog('onAct1ClickProd >> modelValue >>', modelValue);
};
const onAct2ClickProd = function (modelValue: any) {
  clog('onAct2ClickProd >> modelValue >>', modelValue);
};

onMounted(async () => {
  //cLog('onMounted >>');
  // window.addEventListener("resize", onResizeBrowser);
  if (xs.value) showToast('xs-screen', '', 'w');
  else if (sm.value) showToast('sm-screen', '', 'w');
  else if (md.value) showToast('md-screen', '', 'w');
  else if (lg.value) showToast('lg-screen', '', 'w');

  interval.value = setInterval(() => {
    if (percentage.value === 100) {
      // clog('onMounted >> clearInterval');
      clearInterval(interval.value);
      discountTabs.value.forEach(el => {
        if(el.onGoing) el.onGoing = false;
      });
    }
    step.value++;;
    // clog(`onMounted >> setInterval >> step/duration >> ${step.value}/${duration.value}`);
  }, timeStep);

  discountTabs.value.push({
    name: 'tab 1', ftime: dayjs().set('hour', 8).set('minute', 0).set('second', 0).toDate(), ttime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(), onGoing:false
  });
  discountTabs.value.push({
    name: 'tab 2', ftime: dayjs().set('hour', 12).set('minute', 0).set('second', 0).toDate(), ttime: dayjs().set('hour', 14).set('minute', 0).set('second', 0).toDate(), onGoing:false
  });
  discountTabs.value.push(
    {
      name: 'tab 3', ftime: dayjs().set('hour', 16).set('minute', 35).set('second', 0).toDate(), ttime: dayjs().set('hour', 17).set('minute', 2).set('second', 40).toDate(), onGoing:true
    });
  activeTab.value = 2;
});

onUnmounted(() => {
  //clog("onUnmounted >>");
  // window.removeEventListener("resize", onResizeBrowser);
  clearInterval(interval.value);
});

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

  <v-card class="mt-2 border-xl" border="info lg" width="100%" name="big-sale">
    <v-tabs v-model="activeTab" bg-color="white" slider-color="orange" align-tabs="center"
      @update:modelValue="onChangeTab">
      <v-tab v-for="(item, index) in discountTabs" :key="index" :value="index">
        <p>
          {{ dayjs(item.ftime).format('HH:mm') + ' - ' + dayjs(item.ttime).format('HH:mm') }}
          <br>
          <!-- {{ activeTab === index  && percentage !== 100 ? 'Đang diễn ra' : 'Đã kết thúc' }} -->
            {{ item.onGoing ? 'Đang diễn ra' : 'Đã kết thúc' }}
          <br>
          <v-progress-linear color="light-blue" height="8" :model-value="percentage" striped
            v-if="item.onGoing"></v-progress-linear>
        </p>
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item v-for="(item, index) in discountTabs" :key="index" :value="index">
        <v-card>
          <v-slide-group :show-arrows="!xs">
            <v-slide-group-item v-for="n in 10" :key="n" v-slot="{ isSelected, toggle }">
              <!-- <product-item title="Combo 5 Loại Rau Củ: Cải Ngọt, Rau Muống, Rau Dền, Cà Rốt, Cà Chua"
                img="https://bizweb.dktcdn.net/thumb/medium/100/565/842/products/image-79e72a57-d705-4f6b-a35f-024032ea1a7a.jpg"
                :price=20590 :sub-price=23590 unit-currency="vnđ" @update:modelValue="onUpdateProItem"></product-item> -->
              <product-item title="Combo 5 Loại Rau Củ: Cải Ngọt, Rau Muống, Rau Dền, Cà Rốt, Cà Chua" :price=20590
                :sub-price=23590 unit-currency="vnđ" @itemClick:modelValue="onItemClickProd"
                @btnClick:modelValue="onBtnClickProd" @act1-click:model-value="onAct1ClickProd"
                @act2-click:model-value="onAct2ClickProd"></product-item>
            </v-slide-group-item>
          </v-slide-group>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<style>
.v-tab-item--selected {
  background-color: rgba(255, 118, 0, 0.1);
}
</style>

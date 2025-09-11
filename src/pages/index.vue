<script lang="ts" setup>
import { clog, getImageUrl } from '@/helpers/utilities';
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
}
const discountTabs = ref<TabItem[]>([]);
const tabHeader = ref<string[]>([]);
const activeTab = ref(0);
const onGoingTab = ref(-1);
const timerSystem = ref(new Date());
const interval = ref();
const timeStep = 1000; // second
const duration = ref(0); // seconds
const step = ref(0);
const percentage = ref(0);
const runSaleOff = function () {
  timerSystem.value.setTime(timerSystem.value.getTime() + timeStep);
  let timerValue = timerSystem.value;
  // clog('runSaleOff >> timerValue >>', timerValue);

  if (duration.value === 0) {
    discountTabs.value.forEach(el => {
      let from = el['ftime'];
      let to = el['ttime'];
      // clog('runSaleOff >> forEach >> ftime >>', from);
      // clog('runSaleOff >> forEach >> ttime >>', to);
      if (timerValue < from || timerValue > to) return true; // continue

      duration.value = Math.ceil((to.getTime() - from.getTime()) / timeStep); // làm tròn lên, vd: 3.14 => 4
      onGoingTab.value = discountTabs.value.indexOf(el);
      percentage.value = 0;
      return false; // break
    });
  }
  if (onGoingTab.value > 0) {
    discountTabs.value.forEach(el => {
      let from = el['ftime'];
      let to = el['ttime'];
      let currentStep = 0;
      if (from <= timerValue && timerValue <= to)
        currentStep = Math.ceil((timerValue.getTime() - from.getTime()) / timeStep); // làm tròn lên, vd: 3.14 => 4
      if (step.value < currentStep) {
        step.value = currentStep;
        return false; // break
      }
    });
    step.value++;
    // clog('runSaleOff >> step/duration >>', `${step.value}/${duration.value}`);
    percentage.value = Math.ceil(step.value * 100 / duration.value); // làm tròn lên, vd: 3.14 => 4
    // percentage.value = Math.floor(step.value *100/ duration.value ); // làm tròn xuống, vd: 3.78 => 3
    // clog('runSaleOff >> percentage >>', percentage.value);
  }

  const r: Array<string> = [];
  discountTabs.value.forEach(el => {
    const from = el['ftime'];
    const to = el['ttime'];
    let headerTitle = '';
    if (timerValue < from) headerTitle = 'Sắp diễn ra';
    else if (from <= timerValue && timerValue <= to) headerTitle = 'Đang diễn ra';
    else if (to < timerValue) headerTitle = 'Đã kết thúc';
    r.push(headerTitle);
  });
  tabHeader.value = r;
};
watch(percentage, async (newVal) => {
  // clog('watch >> percentage >> newVal >>', newVal);
  if (percentage.value > 100) {
    onGoingTab.value = -1;
    duration.value = 0;
    step.value = 0;
    percentage.value = 0;
  }
}, { deep: true });

const isShowProgressBar = function (index: number) {
  if (!onGoingTab.value) return false;
  if (onGoingTab.value < 0) return false;
  return onGoingTab.value === index;
};

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
  showToast('Already added to cart.', '', 's');
};
const onAct1ClickProd = function (modelValue: any) {
  clog('onAct1ClickProd >> modelValue >>', modelValue);
};
const onAct2ClickProd = function (modelValue: any) {
  clog('onAct2ClickProd >> modelValue >>', modelValue);
};

// ================================================================================

const collectSelected = ref('');
const onClickCollected = function () {
  clog('onClickCollected >>');
  // collectSelected.value = 'collected-item-active';
};

// ================================================================================

onMounted(async () => {
  //cLog('onMounted >>');
  // window.addEventListener("resize", onResizeBrowser);
  if (xs.value) showToast('xs-screen', '', 'w');
  else if (sm.value) showToast('sm-screen', '', 'w');
  else if (md.value) showToast('md-screen', '', 'w');
  else if (lg.value) showToast('lg-screen', '', 'w');

  interval.value = setInterval(() => {
    runSaleOff();
  }, timeStep);

  discountTabs.value.push({
    name: 'tab 1',
    ftime: dayjs().set('hour', 8).set('minute', 0).set('second', 0).toDate(),
    ttime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate()
  });
  discountTabs.value.push({
    name: 'tab 2',
    ftime: dayjs().set('hour', 13).set('minute', 0).set('second', 0).toDate(),
    ttime: dayjs().set('hour', 14).set('minute', 0).set('second', 0).toDate()
  });
  discountTabs.value.push(
    {
      name: 'tab 3',
      ftime: dayjs().set('hour', 15).set('minute', 0).set('second', 0).toDate(),
      ttime: dayjs().set('hour', 16).set('minute', 0).set('second', 0).toDate()
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
          {{ tabHeader[index] }}
          <br>
          <v-progress-linear color="light-blue" height="6" :model-value="percentage" striped class="rounded-xl"
            v-if="isShowProgressBar(index)"></v-progress-linear>
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
              <product-item class="ml-2 mr-2" title="Combo 5 Loại Rau Củ: Cải Ngọt, Rau Muống, Rau Dền, Cà Rốt, Cà Chua" :price=20590
                :sub-price=23590 unit-currency="vnđ" @itemClick:modelValue="onItemClickProd"
                @btnClick:modelValue="onBtnClickProd" @act1-click:model-value="onAct1ClickProd"
                @act2-click:model-value="onAct2ClickProd"></product-item>
            </v-slide-group-item>
          </v-slide-group>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

  <v-card>
    <v-row no-gutters class="ma-0 pa-0">
      <v-sheet v-for="index in 4" width="70" height="70" class="rounded-lg my-2 mx-1 collected-item" :class="[collectSelected]"
        @click="onClickCollected">
        <v-col align="center"><v-img :aspect-ratio="1" class="rounded-circle" :src="getImageUrl('no-img-ava.jpg', null)"
            cover></v-img></v-col>
      </v-sheet>
    </v-row>
    <v-card class="mx-1 pa-2 rounded-lg" color="orange">
      <v-card>
        <v-row dense no-gutters justify="space-around">
          <v-col md="3" sm=4 xs="6" v-for="(item, ind) in 10" align="center">
            <product-item title="Nho xanh Sweet Globe Úc 450g (1 Hộp)" :price=75000 :sub-price=89000 unit-currency="vnđ"
              @itemClick:modelValue="onItemClickProd" @btnClick:modelValue="onBtnClickProd"
              @act1-click:model-value="onAct1ClickProd" @act2-click:model-value="onAct2ClickProd"></product-item>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-card>
</template>

<style>
.v-tab-item--selected {
  background-color: rgba(255, 118, 0, 0.1);
}
</style>
<style scoped>
.collected-item-active,
.collected-item:hover {
  cursor: pointer;
  background-color: #FFEBCD;
  border:3px solid #FF9800
}
</style>
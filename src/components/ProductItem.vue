<script setup lang="ts">
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();
import { defineProps, defineEmits } from 'vue';
import { formatNumber, getImageUrl } from '@/helpers/utilities';

const props = defineProps({
    img: {
        type: String,
        required: false,
        // default: '/images/no-img-ava.jpg'
        default: getImageUrl('no-img-ava.jpg', null)
    },
    title: {
        type: String,
        required: false,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        default: ''
    },
    subPrice: {
        type: Number,
        required: false,
        default: ''
    },
    unitCurrency: {
        type: String,
        required: true,
        default: 'đ'
    },
    numberFormat: {
        type: String,
        required: true,
        default: '#.##0'
    },
    iconAct1: {
        type: String,
        required: false,
        default: 'mdi-heart-outline'
    },
    iconAct2: {
        type: String,
        required: false,
        default: 'mdi-eye-outline'
    },
    iconAct1Selected: {
        type: String,
        required: false,
        default: 'mdi-heart-off-outline'
    },
    iconAct2Selected: {
        type: String,
        required: false,
        default: 'mdi-eye-off-outline'
    },
    iconOnBtn: {
        type: String,
        required: false,
        default: 'mdi-cart-outline'
    },
    textOnBtn: {
        type: String,
        required: false,
        default: 'Add to cart'
    },
    // onClose: {
    //     type: Function,
    //     required: false
    // }
});

const emits = defineEmits([
    'itemClick:modelValue',
    'btnClick:modelValue',
    'act1Click:modelValue',
    'act2Click:modelValue'
]);

const handleItemClick = () => {
    emits('itemClick:modelValue', props); // click on item
};
const handleBtnClick = () => {
    emits('btnClick:modelValue', props, { btn: false }); // click on button
};
const handleAct1Click = () => {
    if (localIconAct1.value == props.iconAct1Selected) localIconAct1.value = props.iconAct1;
    else localIconAct1.value = props.iconAct1Selected;
    emits('act1Click:modelValue', props); // click on heart icon
};
const handleAct2Click = () => {
    if (localIconAct2.value == props.iconAct2Selected) localIconAct2.value = props.iconAct2;
    else localIconAct2.value = props.iconAct2Selected;
    emits('act2Click:modelValue', props); // click on eye icon
};

const localImg = ref(props.img);
const localTitle = ref(props.title);
const localPrice = ref(props.price);
const localSubPrice = ref(props.subPrice);
const localUnitCcy = ref(props.unitCurrency);
// const localNumberFormat = ref(props.numberFormat);
const localIconAct1 = ref(props.iconAct1);
const localIconAct2 = ref(props.iconAct2);
const localIconOnBtn = ref(props.iconOnBtn);
const localTextOnBtn = ref(props.textOnBtn);
const localSaveAmt = computed(() => Math.abs(localPrice.value - (localSubPrice.value ?? 0)));
const localSavePercent = computed(() => Math.round(Math.abs(localSaveAmt.value*100/localPrice.value)));
const localPriceFormated = computed(() => formatNumber(localPrice.value));
const localSubPriceFormated = computed(() => formatNumber(localSubPrice.value));
const localSaveAmtFormated = computed(() => formatNumber(localSaveAmt.value));
const localShowDiscount = computed(()=>localSaveAmt.value !== localPrice.value);

</script>

<template>
    <v-card class="mx-1 my-2 pa-2" color="transparent" width="250">
        <v-row dense no-gutters>
            <v-col align="center">
                <v-hover v-slot="{ isHovering, props }">
                    <v-card v-bind="props" class="rounded-lg" :elevation="isHovering ? 2 : 0">
                        <v-img :aspect-ratio="1" class="bg-white product-img" :src="localImg" width="100%" cover
                            @click.stop="handleItemClick">
                            <v-expand-transition height="25" v-if="localShowDiscount">
                                <v-sheet class="d-flex bg-transparent product-reveal-top">
                                    <v-row dense no-gutters @click.stop="handleItemClick">
                                        <v-col></v-col>
                                        <v-col cols="auto">
                                            <div class="product-discount" elevation="2">{{ localSavePercent + '%' }}</div>
                                        </v-col>
                                    </v-row>
                                </v-sheet>
                            </v-expand-transition>
                            <v-expand-transition height="25%">
                                <v-sheet v-if="isHovering || xs || sm" class="d-flex bg-transparent product-reveal-bottom">
                                    <v-row dense no-gutters @click.stop="handleItemClick">
                                        <v-col cols="6" align="end">
                                            <v-btn @click.stop="handleAct1Click" size="small" :icon="localIconAct1"
                                                class="bg-white rounded-circle mr-2 pt-1 product-act1-btn"></v-btn>
                                        </v-col>
                                        <v-col cols="6" align="start">
                                            <v-btn @click.stop="handleAct2Click" size="small" :icon="localIconAct2"
                                                class="bg-white rounded-circle ml-2 pt-1 product-act2-btn"></v-btn>
                                        </v-col>
                                    </v-row>
                                </v-sheet>
                            </v-expand-transition>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col>
                <p class="product-price">{{ localPriceFormated }} <u>{{ localUnitCcy }}</u></p>
            </v-col>
        </v-row>
        <v-row dense no-gutters class="my-1">
            <v-col>
                <p class="product-subprice" v-if="localShowDiscount">
                    <span>
                        {{ localSubPriceFormated + ' ' + localUnitCcy }}
                    </span> {{ 'Tiết kiệm' + ' ' + localSaveAmtFormated + ' ' + localUnitCcy }}
                </p>
                <div style="height: 18px;" v-if="!localShowDiscount"></div>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col>
                <p class="product-title" @click.stop="handleItemClick">{{ localTitle }}</p>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-btn width="100%" elevation="0" class="rounded-xl product-btn" color="blue-lighten-5"
                    @click.stop="handleBtnClick"><v-icon :icon="localIconOnBtn"></v-icon>{{
                        localTextOnBtn }}</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.product-top-bottom {
    align-items: center;
    top: 0;
    justify-content: center;
    opacity: 0.92;
    position: absolute;
    width: 100%;
}

.product-reveal-bottom {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.92;
    position: absolute;
    width: 100%;
}

.product-discount{
    background-color: red;
    color: #fff;
    border-radius: 10px 10px 10px 0px;
    padding: 2px 0px;
    /* z-index: 1; */
    font-size: 14px;
    width: 40px;
}

.product-img:hover {
    cursor: pointer;
}

.product-title {
    font-size: 14px;
    color: lightslategray;
}

.product-title:hover {
    cursor: pointer;
    color: orange;
}

.product-price {
    font-size: 24px;
    color: #ff7b18;
}

.product-subprice {
    font-size: 12px;
    color: green;
}

.product-subprice span {
    text-decoration: line-through;
    color: orangered;
}

.product-btn {
    color: #0164ff !important;
    background-color: rgba(50, 128, 246, 0.2) !important;
}

.product-btn:hover {
    color: white !important;
    background-color: #0164ff !important;
}

.product-act1-btn,
.product-act2-btn {
    font-size: 1.2rem;
    font-weight: lighter;
}

.product-act1-btn:hover,
.product-act2-btn:hover {
    color: #0164ff !important;
    /* background-color: rgba(50, 128, 246, 0.2) !important; */
    background-color: rgb(184, 210, 248) !important;
}
</style>
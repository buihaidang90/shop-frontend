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
    iconOnBtn: {
        type: String,
        required: false,
        default: 'mdi-cart'
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

const emits = defineEmits(['itemClick:modelValue', 'btnClick:modelValue']);

const handleItemClick = () => {
    emits('itemClick:modelValue', props); // click on item
};
const handleBtnClick = () => {
    emits('btnClick:modelValue', props, {btn:false}); // click on button
};

const localImg = ref(props.img);
const localTitle = ref(props.title);
const localPrice = ref(props.price);
const localSubPrice = ref(props.subPrice);
const localUnitCcy = ref(props.unitCurrency);
// const localNumberFormat = ref(props.numberFormat);
const localIconOnBtn = ref(props.iconOnBtn);
const localTextOnBtn = ref(props.textOnBtn);
const localSaveAmt = computed(() => Math.abs(localPrice.value - (localSubPrice.value || 0)));
const localPriceFormated = computed(()=>formatNumber(localPrice.value));
const localSubPriceFormated= computed(()=>formatNumber(localSubPrice.value));
const localSaveAmtFormated= computed(()=>formatNumber(localSaveAmt.value));

</script>

<template>
    <v-card class="mx-1 my-2 pa-2" color="transparent" width="250">
        <v-row dense no-gutters>
            <v-col align="center">
                <v-img :aspect-ratio="1" class="bg-white product-img" :src="localImg" width="100%" cover @click.stop="handleItemClick"></v-img>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col>
                <p class="product-price">{{ localPriceFormated }} <u>{{ localUnitCcy }}</u></p>
            </v-col>
        </v-row>
        <v-row dense no-gutters class="my-1">
            <v-col>
                <p class="product-subprice">
                    <span>
                        {{ localSubPriceFormated + ' ' + localUnitCcy }}
                    </span> {{ 'Tiết kiệm' + ' ' + localSaveAmtFormated + ' ' + localUnitCcy }}
                </p>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col>
                <p class="product-title" @click.stop="handleItemClick">{{ localTitle }}</p>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-btn width="100%" elevation="0" class="rounded-xl product-btn" color="blue-lighten-5" @click.stop="handleBtnClick"><v-icon :icon="localIconOnBtn"></v-icon>{{
                    localTextOnBtn }}</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.product-img:hover{
    cursor: pointer;
}
.product-title{
    font-size: 14px;
    color: lightslategray;
}
.product-title:hover{
    cursor: pointer;
    color: orange;
}
.product-price{
    font-size: 24px;
    color: #ff7b18;
}
.product-subprice{
    font-size: 12px;
    color: green;
}
.product-subprice span{
    text-decoration: line-through;
    color: orangered;
}
.product-btn{
    color: #0164ff !important;
    background-color: rgba(50, 128, 246, 0.2) !important;
}
.product-btn:hover{
    color: white !important;
    background-color: #0164ff !important;
}
</style>
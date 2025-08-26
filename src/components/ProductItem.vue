<script setup lang="ts">
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    img: {
        type: String,
        required: false,
        default: '@/assets/images/no-img-ava.img'
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
        default: ''
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

const emits = defineEmits(['click', 'update:modelValue']);

const handleUpdate = () => {
    emits('update:modelValue', props, {btn:false}); // click on item
};
const handleClick = () => {
    emits('click', props); // click on button
};

const localImg = ref(props.img);
const localTitle = ref(props.title);
const localPrice = ref(props.price);
const localSubPrice = ref(props.subPrice);
const localUnitCcy = ref(props.unitCurrency);
const localNumberFormat = ref(props.numberFormat);
const localIconOnBtn = ref(props.iconOnBtn);
const localTextOnBtn = ref(props.textOnBtn);
const saveAmt = computed(() => Math.abs(localPrice.value - (localSubPrice.value || 0)));

</script>

<template>
    <v-card class="ma-4 pa-4" color="transparent" width="280" @click.stop="handleUpdate">
        <v-row dense>
            <v-col align="center">
                <v-img :aspect-ratio="1" class="bg-white" :src="localImg" width="200" cover></v-img>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <p class="text-h5">{{ localPrice }} <u>{{ localUnitCcy }}</u></p>
            </v-col>
        </v-row>
        <v-row dense>
            <p class="text-subtitle-1"><span style="text-decoration: line-through;">{{ localSubPrice + ' ' +
                localUnitCcy }}</span> Tiết
                kiệm {{ saveAmt + ' ' + localUnitCcy }}</p>
        </v-row>
        <v-row dense>
            <v-col>
                <p class="text-body-2">{{ localTitle }}</p>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-btn width="100%" elevation="0" color="blue-lighten-5" @click.stop="handleClick"><v-icon :icon="localIconOnBtn"></v-icon>{{
                    localTextOnBtn }}</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped></style>
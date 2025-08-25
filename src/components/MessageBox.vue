<script setup lang="ts">
import appConfig from "@/configs/app.config";
// import { ref, computed, nextTick } from 'vue';
import DOMPurify from 'dompurify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useDisplay } from 'vuetify';
const { xs } = useDisplay();
// const { xs, sm, md, lg, width, height } = useDisplay();

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: appConfig.appName ?? 'Message box'
    },
    message: {
        type: String,
        required: false,
        default: '-------------------------------'
    },
    //modelValue: {
    //  type: Boolean,
    //  required: true
    //},
    onClose: {
        type: Function,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    showCancel: { type: Boolean, required: false, default: false },
    showOK: { type: Boolean, required: false, default: false },
    showYes: { type: Boolean, required: false, default: false },
    showNo: { type: Boolean, required: false, default: false },
    showX: { type: Boolean, required: false, default: true },
    dialogResult: {
        type: String,
        required: false,
        default: 'c' // canceled
    }
});

// const emit = defineEmits(['update:modelValue']);

const localTitle = ref(props.title);
const localMessage = ref(props.message);
const localIcon = ref(props.icon);
const localShowCancel = ref(props.showCancel);
const localShowOK = ref(props.showOK);
const localShowYes = ref(props.showYes);
const localShowNo = ref(props.showNo);
const localShowX = ref(props.showX);
const localDialogResult = ref(props.dialogResult);

const isVisible = ref(false);
const yesButton: any = ref(null);
const okButton: any = ref(null);
const previouslyFocusedElement: any = ref(null);

const sanitizedMessage = computed(() => {
    return DOMPurify.sanitize(localMessage.value.replace(/\n/g, '<br>'));
});

const computedMinWidth = computed(() => {
    console.log(window.outerWidth);
    console.log(window.document.body.clientWidth);
    //return window.innerWidth <= 370 ? 300 : 370;
    return 350;
});

const logIcon = computed(() => {
    const icon = localIcon.value ? localIcon.value.toLowerCase() : '';
    switch (icon) {
        case 'error': case 'e':
            return "⛔";
        case 'warning': case 'w':
            return "⚠️";
        case 'info': case 'i':
            return "ℹ️";
        case 'success': case 's':
            return "✅";
        case 'question': case 'q':
            return "❓";
        case 'none': case 'n':
            return "💬";
        default:
            return "📣";
    }
});

const borderBox = computed(() => {
    const icon = localIcon.value ? localIcon.value.toLowerCase() : '';
    switch (icon) {
        case 'error': case 'e':
            return 'error lg';
        case 'warning': case 'w':
            return 'warning lg';
        case 'info': case 'i':
            return 'info lg';
        case 'success': case 's':
            return 'info lg';
        case 'question': case 'q':
            return 'success lg';
        case 'none': case 'n':
            return 'secondary lg';
        default:
            return 'secondary lg';
    }
});

const showIcon = computed(() => {
    const icon = localIcon.value ? localIcon.value.toLowerCase() : '';
    switch (icon) {
        case 'error': case 'e':
            return { icon: 'mdi-alert-circle', color: 'error', animate: 'animate__animated animate__bounce animate__slow' };
        case 'warning': case 'w':
            return { icon: 'mdi-alert', color: 'warning', animate: 'animate__animated animate__bounce animate__slow' };
        case 'info': case 'i':
            return { icon: 'mdi-information', color: 'info', animate: 'animate__animated animate__tada animate__slow' };
        case 'success': case 's':
            return { icon: 'mdi-checkbox-marked-circle-outline', color: 'success', animate: 'animate__animated animate__heartBeat animate__slow' };
        case 'question': case 'q':
            return { icon: 'mdi-help-circle', color: 'success', animate: 'animate__animated animate__flip animate__slow' };
        case 'none': case 'n':
            return { icon: '', color: '', animate: '' };
        default:
            return { icon: localIcon.value, color: '', animate: '' };
    }
});

// type boolResolved = Awaited<Promise<boolean>>; // resolve type => return result of Promise
// type stringResolved = Awaited<Promise<boolean>>; // resolve type => return result of Promise

let resolveAction: any;
let resolveButton: any;

watch(isVisible, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        if (newValue) {
            console.log("Ⓜ️-MsgBox:", logIcon.value, localMessage.value)
            //previouslyFocusedElement.value = document.activeElement;
            localDialogResult.value = "c";
            nextTick(() => {
                //if (okButton.value && typeof okButton.value.focus === 'function') {
                //okButton.value.focus();
                if (localShowYes.value == true) yesButton.value.$el.focus();
                else if (localShowOK.value == true) okButton.value.$el.focus();
                // }
            });
        } else {
            //emit('update:modelValue', newValue);
            if (localDialogResult.value === "o") {
                console.log("Ⓜ️-MsgBox: return [ OK ] 👌")
                if (resolveAction) resolveAction(true);
                if (resolveButton) resolveButton(localDialogResult.value);
            } else if (localDialogResult.value === "y") {
                console.log("Ⓜ️-MsgBox: return [ Yes ] ✔️")
                if (resolveAction) resolveAction(true);
                if (resolveButton) resolveButton(localDialogResult.value);
            } else if (localDialogResult.value === "n") {
                console.log("Ⓜ️-MsgBox: return [ No ] ✖️")
                if (resolveAction) resolveAction(false);
                if (resolveButton) resolveButton(localDialogResult.value);
            } else {
                console.log("Ⓜ️-MsgBox: return [ Cancel ] ❌")
                if (resolveAction) resolveAction(false);
                if (resolveButton) resolveButton(localDialogResult.value);
            }
            if (previouslyFocusedElement.value) {
                //console.log("focus: ", previouslyFocusedElement.value)
                previouslyFocusedElement.value.focus();
            }
            close();
        }
    }
});

function handleYes() {
    localDialogResult.value = 'y';
    isVisible.value = false;
}

function handleNo() {
    localDialogResult.value = 'n';
    isVisible.value = false;
}

function handleOk() {
    localDialogResult.value = 'o';
    //modelValue = false;
    isVisible.value = false;
}

function handleCancel() {
    localDialogResult.value = 'c';
    //modelValue = false;
    isVisible.value = false;
}

function close() {
    if (props.onClose) {
        props.onClose();
    }
}

function show(message: string, title: string | null, type: string | null):Promise<boolean> {
    return new Promise((resolve) => {
        previouslyFocusedElement.value = document.activeElement;
        localTitle.value = title || t('_.WebFullName');//  props.title;
        localMessage.value = message || props.message;
        localShowCancel.value = false;
        localShowX.value = true;
        isVisible.value = true;
        let _type = type ? type.toLowerCase() : 'none';
        switch (_type) {
            case 'question': case 'q':
                localIcon.value = _type;
                localShowOK.value = false;
                localShowYes.value = true;
                localShowNo.value = true;
                break;
            case 'error': case 'e':
            case 'warning': case 'w':
            case 'info': case 'i':
            case 'success': case 's':
            case 'none': case 'n':
                localIcon.value = _type;
                localShowOK.value = true;
                localShowYes.value = false;
                localShowNo.value = false;
                break;
            default:
                localIcon.value = props.icon;
                localShowOK.value = props.showOK;
                localShowYes.value = props.showYes;
                localShowNo.value = props.showNo;
                break;
        }
        resolveAction = resolve;
    });
}

function showMessage(message: string, title: string | null, type: string | null, showCancel: boolean | null):Promise<string> {
    return new Promise((resolve) => {
        let _showCancel = showCancel ?? false;
        let _type = type ? type.toLowerCase() : 'none';
        switch (_type) {
            case 'question': case 'q':
                localIcon.value = _type;
                localShowOK.value = false;
                localShowCancel.value = _showCancel;
                localShowYes.value = true;
                localShowNo.value = true;
                break;
            case 'error': case 'e':
            case 'warning': case 'w':
            case 'info': case 'i':
            case 'success': case 's':
            case 'none': case 'n':
                localIcon.value = _type;
                localShowOK.value = !_showCancel;
                localShowCancel.value = _showCancel;
                localShowYes.value = false;
                localShowNo.value = false;
                break;
            default:
                localIcon.value = props.icon;
                localShowOK.value = props.showOK;
                localShowCancel.value = props.showCancel;
                localShowYes.value = props.showYes;
                localShowNo.value = props.showNo;
                break;
        }
        previouslyFocusedElement.value = document.activeElement;
        localTitle.value = title || t('_.WebFullName');//  props.title;
        localMessage.value = message || props.message;
        localShowX.value = localShowOK.value || localShowCancel.value;
        isVisible.value = true;
        resolveButton = resolve;
    });
}

defineExpose({ close, show, showMessage });
</script>

<template>
    <v-dialog v-model="isVisible" transition="dialog-bottom-transition" width="auto" :min-width="xs ? 330 : 450" :max-width="xs ? 'auto' : '60%'"
        :persistent="!localShowX" :z-index="7777">
        <v-card rounded="xl" :border="borderBox" class="border-lg">
            <v-card-title class="pa-0 ps-3 d-flex align-center shadow-b30"
                style="min-height: 37px; background-color: rgb(var(--v-theme-primary)); color: rgb(var(--v-theme-on-primary));">
                <v-icon class="mr-1" v-if="xs && showIcon.icon" :color="showIcon.color">
                    {{ showIcon.icon }}</v-icon>
                {{ localTitle }}
                <v-btn v-if="localShowX" icon rounded="lg" @click="handleCancel" class="mr-0 ml-auto align-self-end"
                    variant="text"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-3">
                <v-row :noGutters="xs" dense align="center">
                    <v-col cols="auto">
                        <v-icon v-if="(!xs) && showIcon.icon" :color="showIcon.color" :size="xs ? 48 : 56"
                            :class="showIcon.animate">{{ showIcon.icon }}
                        </v-icon>
                    </v-col>
                    <v-col v-html="sanitizedMessage"></v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-defaults-provider :defaults="{
                    VBtn: { color: 'primary', variant: 'elevated', rounded: 'xl' }
                }">
                    <v-spacer></v-spacer>
                    <v-hover v-if="localShowYes" v-slot:default="{ isHovering, props }">
                        <v-btn v-bind:="props" ref="yesButton" :elevation="isHovering ? 4 : 0" color="btn-default"
                            class="msv-button" @click="handleYes" :min-width="xs ? 101 : 111">{{ t('-.Yes') }}</v-btn>
                    </v-hover>
                    <v-hover v-if="localShowNo" v-slot:default="{ isHovering, props }">
                        <v-btn v-bind:="props" :elevation="isHovering ? 4 : 0" color="btn-cancel" class="msv-button "
                            :min-width="xs ? 101 : 111" @click="handleNo">{{ t('-.No') }}</v-btn>
                    </v-hover>

                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-btn v-if="localShowOK" v-bind:="props" ref="okButton" :elevation="isHovering ? 4 : 0"
                            color="btn-default" class="msv-button " @click="handleOk" :min-width="xs ? 101 : 111">{{
                            t('-.OK') }}</v-btn>
                    </v-hover>
                    <v-hover v-if="localShowCancel" v-slot:default="{ isHovering, props }">
                        <v-btn v-bind:="props" :elevation="isHovering ? 4 : 0" color="btn-cancel" class="msv-button "
                            :min-width="xs ? 101 : 111" @click="handleCancel">{{ t('-.Cancel') }}</v-btn>
                    </v-hover>
                </v-defaults-provider>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

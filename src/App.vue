<script lang="ts" setup>
import { useDisplay } from 'vuetify';
const { xs, sm, md, lg, width, height } = useDisplay();
// clog(`🖼️ xs=${xs.value}, sm=${sm.value}, md=${md.value}, lg=${lg.value}`);

//======================================================================================

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const showToast = async function (message: string, subMessage: string | null, type: string | null, displayTime: number | null) {
  if (message.trim() === '') return;
  let _msg = message;
  // _msg ='The service is available with the useToast function for Composition API or using the $toast property of the application for Options API.';
  let _icon = 'secondary';
  if (type) {
    const arr1 = ['success', 'info', 'warn', 'danger', 'secondary', 'error'];
    const arr2 = ['s', 'i', 'w', 'd', 'sc', 'e'];
    if (arr1.indexOf(type) > -1) _icon = type;
    else if (arr2.indexOf(type) > -1) _icon = arr1[arr2.indexOf(type)];
  }
  // _icon= 'error';
  let _subMessage = subMessage ?? null;
  let _displayTime = displayTime ?? 3;
  if(_displayTime) {
    _displayTime = _displayTime * 1000;
    toast.add({ severity: _icon, summary: _msg, detail: _subMessage, life: _displayTime });
  }
  else {
    toast.add({ severity: _icon, summary: _msg, detail: _subMessage });
  }
};
provide('showToast', showToast);

//======================================================================================

const msgBox = ref<{
  show: (message: string, title: string | null, type: string | null) => Promise<boolean>
  showMessage: (message: string, title: string | null, type: string | null, showCancel: boolean | null) => Promise<string>
} | null>(null);
const showMsg = async function (message: string, title: string | null, type: string | null) {
  if (!msgBox.value) return false;
  return await msgBox.value.show(message, title, type);
};
const showMessage = async function (message: string, title: string | null, type: string | null, showCancel: boolean | null) {
  if (!msgBox.value) return false;
  return await msgBox.value.showMessage(message, title, type, showCancel);
};
provide('showMsg', showMsg);
provide('showMessage', showMessage);

//======================================================================================

const loadingBox = ref<{ setVisible: (visible:boolean) => void } | null>(null);
const setLoadingPanel = function (visible:boolean) {
  if(loadingBox.value) loadingBox.value.setVisible(visible);
};
provide('setLoadingPanel', setLoadingPanel);
</script>

<template>
  <v-app>
    <router-view />
    <Toast :position="xs ? 'bottom-center' : 'bottom-right'" style='max-width: calc(100vw - 40px);'
      :class="['main-toast', xs ? 'toast--xs' : 'toast--none-xs']" />
    <MessageBox ref="msgBox"/>
    <LoadingPanel ref="loadingBox"/>
  </v-app>
</template>

<style>
.main-toast .p-toast-message-icon {
  margin-top: 4px !important;
}

.main-toast .p-toast-close-button {
  margin-top: 1px !important;
}

.toast-xs .p-toast-message {
  margin-bottom: 1rem !important;
}

.toast--none-xs .p-toast-message {
  margin-bottom: 0.5rem !important;
}
</style>

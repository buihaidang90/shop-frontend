/**
 * plugins/primevue.ts
 *
 * Framework documentation: https://primevue.org`
 */

// Configs
import PrimeVue from "primevue/config";

// Themes
import Aura from '@primeuix/themes/aura';

// Services
import ToastService from 'primevue/toastservice';

export default {
    PrimeVue,
    ToastService,
    option: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-LDark',
          cssLayer: false,
        },
        semantic: {
          primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
          }
        },
      }
    }   
}
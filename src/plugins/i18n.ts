import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { getMessages } from '@/locales/message';

const messages = await getMessages();

const i18n = createI18n({
    legacy: false, // Vuetify does not support the legacy mode of vue-i18n
    locale: 'vi',
    fallbackLocale: 'en',
    messages,
});

const adapter = createVueI18nAdapter({ i18n, useI18n });

export default {
    i18n,
    adapter
}

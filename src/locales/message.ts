import { en as vuetifyEn, vi as vuetifyVi, ja as vuetifyJa } from 'vuetify/locale';

async function loadLocaleMessages(locale: string): Promise<Record<string, any>> {

    const messages: Record<string, any> = {};

    const contexts: Record<string, Record<string, () => Promise<any>>> = {
        en: import.meta.glob('./en*.json'),
        vi: import.meta.glob('./vi*.json'),
        ja: import.meta.glob('./ja*.json'),
    };

    const context = contexts[locale];
    if (!context) {
        throw new Error(`Locale "${locale}" is not supported.`);
    }

    // console.log(`Loading messages for locale: ${locale}`);
    // console.log(`Found files:`, Object.keys(context));

    for (const path in context) {
        try {
            const module = await context[path]();
            Object.assign(messages, module.default);
            // console.log(`Loaded file: ${path}`, module.default);
        } catch (error) {
            console.error(`Failed to load locale file: ${path}`, error);
        }
    }

    return messages;
}

export async function getMessages(): Promise<Record<string, any>> {

    const [enMessages, viMessages, jaMessages] = await Promise.all([
        loadLocaleMessages('en'),
        loadLocaleMessages('vi'),
        loadLocaleMessages('ja'),
    ]);

    return {
        en: {
            $vuetify: {
                ...vuetifyEn,
                dataIterator: {
                    rowsPerPageText: 'Items per page:',
                    pageText: '{0}-{1} of {2}',
                },
            },
            ...enMessages,
        },
        vi: {
            $vuetify: {
                ...vuetifyVi,
                dataIterator: {
                    rowsPerPageText: 'Số mục trên mỗi trang:',
                    pageText: '{0}-{1} của {2}',
                },
            },
            ...viMessages,
        },
        ja: {
            $vuetify: {
                ...vuetifyJa,
                dataIterator: {
                    rowsPerPageText: 'ページあたりのアイテム数:',
                    pageText: '{0}-{1} の {2}',
                },
            },
            ...jaMessages,
        },
    };
}

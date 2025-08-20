import { defineStore } from "pinia";
import { computed } from "vue";

interface Session {
    token: string;
    userCode: string;
    locale: string;
    theme: string;
    firstDayOfWeek: string;
    dateShortFormat: string;
    dateLongFormat: string;
    timeShortFormat: string;
    timeLongFormat: string;
    decimalSeparator: string;
    thousandSeparator: string;
    dateExcelFormat: string;
}

const sskey = {
    session: 'session',
    token: 'token',
    userCode: 'UserCode',
    locale: 'Locale',
    theme: 'Theme',
    firstDayOfWeek: 'FirstDayOfWeek',
    dateShortFormat: 'DateShortFormat',
    dateLongFormat: 'DateLongFormat',
    timeShortFormat: 'TimeShortFormat',
    timeLongFormat: 'TimeLongFormat',
    decimalSeparator: 'DecimalSeparator',
    thousandSeparator: 'ThousandSeparator',
    dateExcelFormat: 'dateExcelFormat',
}

export const useSessionStore = defineStore('session', () => {
    // State
    let ss: Session | null = fetch();

    // Getter
    const token = computed(() => (ss ? ss.token : ''));
    const userCode = computed(() => (ss ? ss.userCode : ''));
    const locale = computed(() => (ss ? ss.locale : 'en'));
    const theme = computed(() => (ss ? ss.theme : 'light'));
    const firstDayOfWeek = computed(() => (ss ? ss.firstDayOfWeek : '1'));
    const dateShortFormat = computed(() => (ss ? ss.dateShortFormat : 'dd/MM/yyyy'));
    const dateLongFormat = computed(() => (ss ? ss.dateLongFormat : 'cccc/MMMM/yyyy'));
    const timeShortFormat = computed(() => (ss ? ss.timeShortFormat : 'HH:mm'));
    const timeLongFormat = computed(() => (ss ? ss.timeLongFormat : 'HH:mm:ss'));
    const decimalSeparator = computed(() => (ss ? ss.decimalSeparator : '.'));
    const thousandSeparator = computed(() => (ss ? ss.thousandSeparator : ','));
    const dateExcelFormat = computed(() => {
        const _shortFormat = ss ? ss.dateShortFormat : '';
        const _locale = ss ? ss.locale : '';
        switch (_shortFormat) {
            case 'dd/MM/yyyy':
            case 'dd/MMM/yyyy':
            case 'dd/MMMM/yyyy':
            case 'dd/MMMMM/yyyy':
                return 'dd/mm/yyyy'; // 👈 target format

            case 'dd/MM/yy':
            case 'dd/MMM/yy':
            case 'dd/MMMM/yy':
            case 'dd/MMMMM/yy':
                return 'dd/mm/yy'; // 👈 target format

            case 'MM/dd/yyyy':
            case 'MMM/dd/yyyy':
            case 'MMMM/dd/yyyy':
            case 'MMMMM/dd/yyyy':
                return 'mm/dd/yyyy'; // 👈 target format

            case 'MM/dd/yy':
            case 'MMM/dd/yy':
            case 'MMMM/dd/yy':
            case 'MMMMM/dd/yy':
                return 'mm/dd/yy'; // 👈 target format

            case 'yyyy/MM/dd':
            case 'yyyy/MMM/dd':
            case 'yyyy/MMMM/dd':
            case 'yyyy/MMMMM/dd':
                return 'yyyy/mm/dd'; // 👈 target format

            case 'yy/MM/dd':
            case 'yy/MMM/dd':
            case 'yy/MMMM/dd':
            case 'yy/MMMMM/dd':
                return 'yy/mm/dd'; // 👈 target format

            case 'D': {
                switch (_locale) {
                    case 'en': return 'm/d/yyyy';
                    case 'vi': return 'd/m/yyyy';
                    case 'ja': return 'yyyy/m/d';
                    default: return 'yyyy/m/d';
                }
            }
            case 'DD': {
                switch (_locale) {
                    case 'en': return 'mmm d, yyyy';
                    case 'vi': return 'd mmm, yyyy';
                    case 'ja': return 'yyyymmmddd';
                    default: return 'mmm d, yyyy';
                }
            }
        }
        return '';
    });

    // Action
    function fetch(): Session {
        // if (import.meta.env.DEV) console.log('🍍 Fetch Session!!!!!!!!!!!');
        const localData = localStorage.getItem(sskey.session);
        const targetData = localData ? JSON.parse(localData) : null;

        if (targetData) {
            targetData.token = sessionStorage.getItem(sskey.token) ?? targetData.token;
            targetData.userCode = sessionStorage.getItem(sskey.userCode) ?? targetData.userCode;
            targetData.locale = sessionStorage.getItem(sskey.locale) ?? targetData.locale;
            targetData.theme = sessionStorage.getItem(sskey.theme) ?? targetData.theme;
            targetData.firstDayOfWeek = sessionStorage.getItem(sskey.firstDayOfWeek) ?? targetData.firstDayOfWeek;
            targetData.dateShortFormat = sessionStorage.getItem(sskey.dateShortFormat) ?? targetData.dateShortFormat;
            targetData.dateLongFormat = sessionStorage.getItem(sskey.dateLongFormat) ?? targetData.dateLongFormat;
            targetData.timeShortFormat = sessionStorage.getItem(sskey.timeShortFormat) ?? targetData.timeShortFormat;
            targetData.timeLongFormat = sessionStorage.getItem(sskey.timeLongFormat) ?? targetData.timeLongFormat;
            targetData.decimalSeparator = sessionStorage.getItem(sskey.decimalSeparator) ?? targetData.decimalSeparator;
            targetData.thousandSeparator = sessionStorage.getItem(sskey.thousandSeparator) ?? targetData.thousandSeparator;
        }
        return targetData;
    }

    function create(session: Session) {
        //   if (import.meta.env.DEV) console.log('🍍 Create Session!!!!!!!!!!!');
        ss = session;
        //
        localStorage.setItem(sskey.session, JSON.stringify(session));
        // localStorage.setItem(sskey.token, session.token ?? '');
        localStorage.setItem(sskey.userCode, session.userCode ?? '');
        localStorage.setItem(sskey.theme, session.theme ?? '');
        localStorage.setItem(sskey.locale, session.locale ?? '');
        localStorage.setItem(sskey.firstDayOfWeek, session.firstDayOfWeek ?? '');
        localStorage.setItem(sskey.dateShortFormat, session.dateShortFormat ?? '');
        localStorage.setItem(sskey.dateLongFormat, session.dateLongFormat ?? '');
        localStorage.setItem(sskey.timeShortFormat, session.timeShortFormat ?? '');
        localStorage.setItem(sskey.timeLongFormat, session.timeLongFormat ?? '');
        localStorage.setItem(sskey.decimalSeparator, session.decimalSeparator ?? '');
        localStorage.setItem(sskey.thousandSeparator, session.thousandSeparator ?? '');
        //
        // sessionStorage.setItem(sskey.session, JSON.stringify(session));
        sessionStorage.setItem(sskey.token, session.token ?? '');
        sessionStorage.setItem(sskey.userCode, session.userCode ?? '');
        sessionStorage.setItem(sskey.theme, session.theme ?? '');
        sessionStorage.setItem(sskey.locale, session.locale ?? '');
        sessionStorage.setItem(sskey.firstDayOfWeek, session.firstDayOfWeek ?? '');
        sessionStorage.setItem(sskey.dateShortFormat, session.dateShortFormat ?? '');
        sessionStorage.setItem(sskey.dateLongFormat, session.dateLongFormat ?? '');
        sessionStorage.setItem(sskey.timeShortFormat, session.timeShortFormat ?? '');
        sessionStorage.setItem(sskey.timeLongFormat, session.timeLongFormat ?? '');
        sessionStorage.setItem(sskey.decimalSeparator, session.decimalSeparator ?? '');
        sessionStorage.setItem(sskey.thousandSeparator, session.thousandSeparator ?? '');
    }

    function destroy() {
        //   if (import.meta.env.DEV) console.log('🍍 Destroy Session!!!!!!!!!!!');
        ss = null;
        localStorage.removeItem(sskey.session);
        localStorage.removeItem(sskey.token);
        localStorage.removeItem(sskey.userCode);
    }

    function setProps(
        props: {
            theme?: string;
            locale?: string;
            firstDayOfWeek?: string;
            dateShortFormat?: string;
            dateLongFormat?: string;
            timeShortFormat?: string;
            timeLongFormat?: string;
            decimalSeparator?: string;
            thousandSeparator?: string;
            dateExcelFormat?: string;
        }) {
        if (!ss) return;
        //   if (import.meta.env.DEV) console.log('🍍 setProps:', props);
        if (ss) {
          ss.firstDayOfWeek = props.firstDayOfWeek ?? ss.firstDayOfWeek ?? '';
          ss.dateShortFormat = props.dateShortFormat ?? ss.dateShortFormat ?? '';
          ss.dateLongFormat = props.dateLongFormat ?? ss.dateLongFormat ?? '';
          ss.timeShortFormat = props.timeShortFormat ?? ss.timeShortFormat ?? '';
          ss.timeLongFormat = props.timeLongFormat ?? ss.timeLongFormat ?? '';
          ss.decimalSeparator = props.decimalSeparator ?? ss.decimalSeparator ?? '';
          ss.thousandSeparator = props.thousandSeparator ?? ss.thousandSeparator ?? '';
          ss.dateExcelFormat = props.dateExcelFormat ?? ss.dateExcelFormat ?? '';
        }
          localStorage.setItem(sskey.session, JSON.stringify(ss));
          localStorage.setItem(sskey.firstDayOfWeek, props.firstDayOfWeek ?? '');
          localStorage.setItem(sskey.dateShortFormat, props.dateShortFormat ?? '');
          localStorage.setItem(sskey.dateLongFormat, props.dateLongFormat ?? '');
          localStorage.setItem(sskey.timeShortFormat, props.timeShortFormat ?? '');
          localStorage.setItem(sskey.timeLongFormat, props.timeLongFormat ?? '');
          localStorage.setItem(sskey.decimalSeparator, props.decimalSeparator ?? '');
          localStorage.setItem(sskey.thousandSeparator, props.thousandSeparator ?? '');
          localStorage.setItem(sskey.dateExcelFormat, props.dateExcelFormat ?? '');

          sessionStorage.setItem(sskey.firstDayOfWeek, props.firstDayOfWeek ?? '');
          sessionStorage.setItem(sskey.dateShortFormat, props.dateShortFormat ?? '');
          sessionStorage.setItem(sskey.dateLongFormat, props.dateLongFormat ?? '');
          sessionStorage.setItem(sskey.timeShortFormat, props.timeShortFormat ?? '');
          sessionStorage.setItem(sskey.timeLongFormat, props.timeLongFormat ?? '');
          sessionStorage.setItem(sskey.decimalSeparator, props.decimalSeparator ?? '');
          sessionStorage.setItem(sskey.thousandSeparator, props.thousandSeparator ?? '');
          sessionStorage.setItem(sskey.dateExcelFormat, props.dateExcelFormat ?? '');
    }

    return {
        token,
        userCode,
        locale,
        theme,
        firstDayOfWeek,
        dateShortFormat,
        dateLongFormat,
        timeShortFormat,
        timeLongFormat,
        decimalSeparator,
        thousandSeparator,
        dateExcelFormat,

        fetch,
        create,
        destroy,
        setProps,
    };
})
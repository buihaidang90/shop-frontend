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

export const sessionStore = defineStore('session', () => {
    // State
    let ss: Session | null = fetchSession();

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
            case 'dd/MM/yyyy': return 'dd/mm/yyyy';
            case 'MM/dd/yyyy': return 'mm/dd/yyyy';
            case 'yyyy/MM/dd': return 'yyyy/mm/dd';
            case 'dd/MM/yy': return 'dd/mm/yy';
            case 'MM/dd/yy': return 'mm/dd/yy';
            case 'yy/MM/dd': return 'yy/mm/dd';
            case 'dd/MMM/yyyy': return 'dd/mm/yyyy';
            case 'MMM/dd/yyyy': return 'mm/dd/yyyy';
            case 'yyyy/MMM/dd': return 'yyyy/mm/dd';
            case 'dd/MMM/yy': return 'dd/mm/yy';
            case 'MMM/dd/yy': return 'mm/dd/yy';
            case 'yy/MMM/dd': return 'yy/mm/dd';
            case 'dd/MMMM/yyyy': return 'dd/mm/yyyy';
            case 'MMMM/dd/yyyy': return 'mm/dd/yyyy';
            case 'yyyy/MMMM/dd': return 'yyyy/mm/dd';
            case 'dd/MMMM/yy': return 'dd/mm/yy';
            case 'MMMM/dd/yy': return 'mm/dd/yy';
            case 'yy/MMMM/dd': return 'yy/mm/dd';
            case 'dd/MMMMM/yyyy': return 'dd/mm/yyyy';
            case 'MMMMM/dd/yyyy': return 'mm/dd/yyyy';
            case 'yyyy/MMMMM/dd': return 'yyyy/mm/dd';
            case 'dd/MMMMM/yy': return 'dd/mm/yy';
            case 'MMMMM/dd/yy': return 'mm/dd/yy';
            case 'yy/MMMMM/dd': return 'yy/mm/dd';
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
    function fetchSession(): Session {
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

    function createSession(session: Session) {
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

    function destroySession() {
        //   if (import.meta.env.DEV) console.log('🍍Destroy Session!!!!!!!!!!!');
        ss = null;
        localStorage.removeItem(sskey.session);
        localStorage.removeItem(sskey.token);
        localStorage.removeItem(sskey.userCode);
    }

    function setPropSession(
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
        //   if (import.meta.env.DEV) console.log('🍍Set Date Formats:', props);
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
        //   localStorage.setItem('session', JSON.stringify(ss));
        //   localStorage.setItem('FirstDayOfWeek', props.firstDayOfWeek ?? '');
        //   localStorage.setItem('DateShortFormat', props.dateShortFormat ?? '');
        //   localStorage.setItem('DateLongFormat', props.dateLongFormat ?? '');
        //   localStorage.setItem('TimeShortFormat', props.timeShortFormat ?? '');
        //   localStorage.setItem('TimeLongFormat', props.timeLongFormat ?? '');
        //   localStorage.setItem('NumDecimalSeparator', props.numDecimalSeparator ?? '');
        //   localStorage.setItem('NumThousandSeparator', props.numThousandSeparator ?? '');
        //   localStorage.setItem('NumLocale', props.numLocale ?? '');

        //   sessionStorage.setItem('FirstDayOfWeek', props.firstDayOfWeek ?? '');
        //   sessionStorage.setItem('DateShortFormat', props.dateShortFormat ?? '');
        //   sessionStorage.setItem('DateLongFormat', props.dateLongFormat ?? '');
        //   sessionStorage.setItem('TimeShortFormat', props.timeShortFormat ?? '');
        //   sessionStorage.setItem('TimeLongFormat', props.timeLongFormat ?? '');
        //   sessionStorage.setItem('NumDecimalSeparator', props.numDecimalSeparator ?? '');
        //   sessionStorage.setItem('NumThousandSeparator', props.numThousandSeparator ?? '');
        //   sessionStorage.setItem('NumLocale', props.numLocale ?? '');
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

        fetchSession,
        createSession,
        destroySession,
        setPropSession,
    };
})
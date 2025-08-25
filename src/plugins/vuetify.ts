/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { aliases } from 'vuetify/iconsets/mdi'
import i18n from "./i18n";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    adapter: i18n.adapter,
  },
  components,
  directives,
  theme: {
    defaultTheme: "lightV",
    themes: {
      lightV: {
        dark: false,
        colors: {
          // background: "#ecedf5",
          primary: "#165db2",
          secondary: "#006687",//"#b0bec5",//

          "field-disabled": "#969696",
          "field-readonly": "#ffff9b",
          "field-readonlyDark": "rgb(120 131 5 / 64%)",
          "field-lov": "#9bffff",
          "grd-header-bg": "#1867C0",
          "grd-header-text": "#ffffff",
          "btn-default": "#1867C0", // Primary blue
          "btn-save": "#1867C0", // Success green
          "btn-close": "#1867C0", // Neutral grey
          "btn-cancel": "#b0bec5", // Neutral grey: #186770
          "btn-delete": "#1867C0", // Danger red
          "btn-load": "#1867C0", // Info blue
          "btn-add": "#1867C0", // Success green
          "btn-edit": "#1867C0", // Warning orange
          "btn-reset": "#1867C0", // Purple
          "btn-print": "#4CAF50", // Blue-grey
          "btn-export": "#4CAF50", // Teal
          "btn-import": "#4CAF50", // Indigo

          sttReqNew: "#009b00",
          sttReqDiscussingTogether: "#0164ff",
          sttReqMsvChecking: "#7f06c9",
          sttReqCustomerConfirm: "#ff4801",
          sttReqConfirmingTogether: "#186770",
          sttReqWaitingMsvClose: "#ff0027",
          //sttReqClosed: '#a19c9c',
          sttReqClosed: "#990000",
          sttReqCanceled: "#383838",

          sttCurrent: "#008c00",
          sttNeedCheck: "#ff0026",
          sttOnGoing: "#0042cf",
          sttLiquidation: "#ff4800",
          sttDefault: "#000000",

          excelColHeaderBg: "#c6ddf6",
          excelColHeaderText: "#000000",
          excelRowGroupBg: "#cccccc",
          excelRowGroupText: "#000000",
        },
        variables: {
          "overlay-background": "#161c25",
          "activated-opacity": "0.2",
        },
      },
      darkV: {
        // Dark theme for Vuetify
        dark: true,
        colors: {
          "field-disabled": "#C8C8C8",
          "field-readonly": "#5c5200",
          "field-readonlyDark": "rgb(120 131 5 / 64%)",
          "field-lov": "#004d4d",
          "btn-default": "#22477a",
          "btn-save": "#22477a",
          "btn-cancel": "#62471a",
          "btn-delete": "#22477a",
          "btn-load": "#22477a",
          "btn-close": "#22477a",
          "btn-add": "#22477a",
          "btn-edit": "#22477a",
          "btn-reset": "#22477a",
          "btn-print": "#22477a",
          "btn-export": "#134416",
          "btn-import": "#134416",

          sttReqNew: "#009b00",
          sttReqDiscussingTogether: "#0164ff",
          sttReqMsvChecking: "#7f06c9",
          sttReqCustomerConfirm: "#ff4801",
          sttReqConfirmingTogether: "#186770",
          sttReqWaitingMsvClose: "#ff0027",
          //sttReqClosed: '#a19c9c',
          sttReqClosed: "#990000",
          sttReqCanceled: "#383838",

          sttCurrent: "#009b00",
          sttNeedCheck: "#ff0026",
          sttOnGoing: "#0064ff",
          sttLiquidation: "#ff4800",
          sttDefault: "#ffffff",

          excelColHeaderBg: "#c6ddf6",
          excelColHeaderText: "#000000",
          excelRowGroupBg: "#cccccc",
          excelRowGroupText: "#000000",
        },
        variables: {
          "overlay-background": "#181c23",
          "activated-opacity": "0.2",
        },
      },
    },
  },
  // icons: {
  //   aliases: {
  //     ...aliases,
  //     iconRefresh: "mdi-refresh",
  //     iconLoadData: "mdi-refresh",
  //     iconPrint: "mdi-printer",
  //     iconSave: "mdi-content-save",
  //     iconAdd: "mdi-plus",
  //     iconEdit: "mdi-pencil",
  //     iconDelete: "mdi-delete",
  //     iconClose: "mdi-close-octagon-outline",
  //     iconX: "mdi-close",
  //     iconCancel: "mdi-cancel",
  //     iconReset: "mdi-refresh",
  //     iconExport: "mdi-file-export",
  //     iconExportExcel: "mdi-file-excel",
  //     iconImport: "mdi-file-import",
  //     iconSearch: "mdi-magnify",
  //     iconFilter: "mdi-filter",
  //     iconSettings: "mdi-cog",
  //     iconInfo: "mdi-information",
  //     iconWarning: "mdi-alert",
  //     iconError: "mdi-alert-circle",
  //     iconSuccess: "mdi-check-circle",
  //     iconHelp: "mdi-help-circle",
  //     iconHome: "mdi-home",
  //     iconUser: "mdi-account",
  //     iconLock: "mdi-lock",
  //     iconUnlock: "mdi-lock-open",
  //     iconStar: "mdi-star",
  //     iconHeart: "mdi-heart",
  //     iconCheck: "mdi-check",
  //     iconCheckAll: "mdi-checkbox-multiple-marked-outline",
  //     iconUncheckAll: "mdi-checkbox-multiple-blank-outline",
  //     iconColumnPicker: "mdi-format-columns",
  //     iconCloseCircle: "mdi-close-circle",
  //     iconPlusCircle: "mdi-plus-circle",
  //     iconMinusCircle: "mdi-minus-circle",
  //     iconArrowUp: "mdi-arrow-up",
  //     iconArrowDown: "mdi-arrow-down",
  //     iconArrowLeft: "mdi-arrow-left",
  //     iconArrowRight: "mdi-arrow-right",
  //     iconChevronUp: "mdi-chevron-up",
  //     iconChevronDown: "mdi-chevron-down",
  //     iconChevronLeft: "mdi-chevron-left",
  //     iconChevronRight: "mdi-chevron-right",
  //     iconMenu: "mdi-menu",
  //     iconMore: "mdi-dots-horizontal",
  //     iconMoreVertical: "mdi-dots-vertical",
  //     iconUpload: "mdi-upload",
  //     iconDownload: "mdi-download",
  //     iconShare: "mdi-share",
  //     iconLink: "mdi-link",
  //     iconUnlink: "mdi-unlink",
  //     iconCopy: "mdi-content-copy",
  //     iconCut: "mdi-content-cut",
  //     iconPaste: "mdi-content-paste",
  //     iconBold: "mdi-format-bold",
  //     iconItalic: "mdi-format-italic",
  //     iconUnderline: "mdi-format-underline",
  //     iconStrikethrough: "mdi-format-strikethrough",
  //     iconAlignLeft: "mdi-format-align-left",
  //     iconAlignCenter: "mdi-format-align-center",
  //     iconAlignRight: "mdi-format-align-right",
  //     iconAlignJustify: "mdi-format-align-justify",
  //     iconIndentIncrease: "mdi-format-indent-increase",
  //     iconIndentDecrease: "mdi-format-indent-decrease",
  //     iconList: "mdi-format-list-bulleted",
  //     iconOrderedList: "mdi-format-list-numbered",
  //     iconQuote: "mdi-format-quote-close",
  //     iconCode: "mdi-code-tags",
  //     iconTable: "mdi-table",
  //     iconImage: "mdi-image",
  //     iconVideo: "mdi-video",
  //     iconAudio: "mdi-audio",
  //     iconCalendar: "mdi-calendar",
  //     iconClock: "mdi-clock",
  //     iconMap: "mdi-map",
  //     iconLocation: "mdi-map-marker",
  //     iconPin: "mdi-pin",
  //     iconTag: "mdi-tag",
  //     iconBookmark: "mdi-bookmark",
  //     iconFile: "mdi-file",
  //     iconFiles: "mdi-file-multiple",
  //     iconFolder: "mdi-folder",
  //     iconFolders: "mdi-folder-multiple",
  //     iconTrash: "mdi-delete-empty",
  //     iconTrashFull: "mdi-delete",
  //     iconArchive: "mdi-archive",
  //     iconUnarchive: "mdi-archive-outline",
  //     iconStarOutline: "mdi-star-outline",
  //     iconHeartOutline: "mdi-heart-outline",
  //     iconCheckOutline: "mdi-check-outline",
  //     iconCloseOutline: "mdi-close-outline",
  //     iconPlusOutline: "mdi-plus-outline",
  //     iconMinusOutline: "mdi-minus-outline",
  //     iconGroup: "mdi-group",
  //     iconUngroup: "mdi-ungroup",
  //     iconAddMail: "mdi-email-plus-outline",
  //     iconAttach: "mdi-attachment",
  //     iconAttachedFile: "mdi-paperclip",
  //   },
  // },
});

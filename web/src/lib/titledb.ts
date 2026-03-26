import { base, resolve } from "$app/paths"
import type { AppletData, TitleData } from "./types"

export const SYSTEM_APPLICATIONS_TIDHIGH = "00040010"
export const SYSTEM_APPLETS_TIDHIGH = "00040030"
export const APPLICATIONS_TIDHIGH = "00040000"
export const SYSTEM_EVENT_TID = "FFFFFFFFFFFFFFFF"

export const HOME_MENU_TID = "0004003000008F02"

// Map of tidlow: TitleData
export const SYSTEM_APPLICATIONS: Record<string, TitleData> = {
  "00021000": {
    tid: "0004001000021000",
    uid: "",
    titleName: "System Settings",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HAS?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/settings.png`
  },
  "00021100": {
    tid: "0004001000021100",
    uid: "",
    titleName: "Download Play",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HDL?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/download_play.png`
  },
  "00021200": {
    tid: "0004001000021200",
    uid: "",
    titleName: "Activity Log",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HMK?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/activity_log.png`
  },
  "00021300": {
    tid: "0004001000021300",
    uid: "",
    titleName: "Health and Safety Information",
    publisher: "Nintendo",
    region: "North America",
    serial: "?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/hns_info.png`
  },
  "20021300": {
    tid: "0004001020021300",
    uid: "",
    titleName: "New 3DS Health and Safety Information",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HAC?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/hns_info.png`
  },
  "00021400": {
    tid: "0004001000021400",
    uid: "",
    titleName: "Nintendo 3DS Camera",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HEP?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/camera.png`
  },
  "00021500": {
    tid: "0004001000021500",
    uid: "",
    titleName: "Nintendo 3DS Sound",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HES?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/sound.png`
  },
  "00021700": {
    tid: "0004001000021700",
    uid: "",
    titleName: "Mii Maker",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HED?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/mii_maker.png`
  },
  "00021800": {
    tid: "0004001000021800",
    uid: "",
    titleName: "StreetPass Mii Plaza",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HME?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/mii_plaza.png`
  },
  "00021900": {
    tid: "0004001000021900",
    uid: "",
    titleName: "eShop",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HGR?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/eshop.png`
  },
  "00021A00": {
    tid: "0004001000021A00",
    uid: "",
    titleName: "System Transfer",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HCB?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/system_transfer.png`
  },
  "00021B00": {
    tid: "0004001000021B00",
    uid: "",
    titleName: "Nintendo Zone",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HMA?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/nintendo_zone.png`
  },
  "00021D00": {
    tid: "0004001000021D00",
    uid: "",
    titleName: "Face Raiders",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HCH?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/face_raiders.png`
  },
  "20021D00": {
    tid: "0004001020021D00",
    uid: "",
    titleName: "New 3DS Face Raiders",
    publisher: "Nintendo",
    region: "North America",
    serial: "?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/face_raiders.png`
  },
  "00021E00": {
    tid: "0004001000021E00",
    uid: "",
    titleName: "AR Games",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HAR?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/ar_games.png`
  },
  "00021F00": {
    tid: "0004001000021F00",
    uid: "",
    titleName: "SAFE_MODE System Updater",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HSH?",
    trimmedSizeBytes: 123
  },
  "00024000": {
    tid: "0004001000024000",
    uid: "",
    titleName: "Promotional Video",
    publisher: "Nintendo",
    region: "North America",
    serial: "(Variable)?",
    trimmedSizeBytes: 123
  },
  "0002C000": {
    tid: "000400100002C000",
    uid: "",
    titleName: "Nintendo Network ID Settings",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HAF?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/nnid_seetings.png`
  },
  "20024100": {
    tid: "0004001020024100",
    uid: "",
    titleName: "microSD Management",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-N-HAJ?",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/microsd_management.png`
  },
  "2002CF00": {
    tid: "000400102002CF00",
    uid: "",
    titleName: "New 3DS Home Menu Digital Manual",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-P-CTAP",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/digital_manual.png`
  },
  "2002D100": {
    tid: "000400102002D100",
    uid: "",
    titleName: "New 3DS Friends List Digital Manual",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-P-CTAP",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/digital_manual.png`
  },
  "2002D300": {
    tid: "000400102002D300",
    uid: "",
    titleName: "New 3DS Notifications Digital Manual",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-P-CTAP",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/digital_manual.png`
  },
  "2002D500": {
    tid: "000400102002D500",
    uid: "",
    titleName: "New 3DS Game Notes Digital Manual",
    publisher: "Nintendo",
    region: "North America",
    serial: "CTR-P-CTAP",
    trimmedSizeBytes: 123,
    iconUrl: `${base}/icons/digital_manual.png`
  }
}

export const SYSTEM_APPLETS: Record<string, AppletData> = {
  "00008102": {
    tid: "0004003000008102",
    appletName: "Test Menu",
    serial: "CTR-P-CTAP",
    regions: ["USA", "JPN", "EUR", "CHN", "KOR", "TWN"]
  },
  "00008F02": {
    tid: "0004003000008F02",
    appletName: "Home Menu",
    serial: "CTR-P-HMM?",
    regions: ["USA"]
  },
  "00009002": {
    tid: "0004003000009002",
    appletName: "Home Menu Camera Applet",
    serial: "CTR-N-HCS?",
    regions: ["USA"]
  },
  "00009102": {
    tid: "0004003000009102",
    appletName: "???????",
    serial: "?",
    regions: ["USA"]
  },
  "00009202": {
    tid: "0004003000009202",
    appletName: "Instruction Manual Applet",
    serial: "CTR-N-HMV?",
    regions: ["USA"]
  },
  "00009302": {
    tid: "0004003000009302",
    appletName: "Game Notes",
    serial: "CTR-N-HGM?",
    regions: ["USA"]
  },
  "00009402": {
    tid: "0004003000009402",
    appletName: "Internet Browser",
    serial: "",
    regions: ["USA"]
  },
  "20009402": {
    tid: "0004003020009402",
    appletName: "New 3DS Internet Browser",
    serial: "CTR-N-HBR?",
    regions: ["USA"]
  },
  "00008A02": {
    tid: "0004003000008A02",
    appletName: "Fatal Error Viewer",
    serial: "",
    regions: ["USA", "JPN", "EUR", "CHN", "KOR", "TWN"]
  },
  "00008A03": {
    tid: "0004003000008A03",
    appletName: "SAFE_MODE",
    serial: "",
    regions: ["USA", "JPN", "EUR", "CHN", "KOR", "TWN"]
  },
  "00009602": {
    tid: "0004003000009602",
    appletName: "Friends List",
    serial: "CTR-N-HFR?",
    regions: ["USA"]
  },
  "00009702": {
    tid: "0004003000009702",
    appletName: "Notifications",
    serial: "CTR-N-HCR?",
    regions: ["USA"]
  },
  "0000C802": {
    tid: "000400300000C802",
    appletName: "Software Keyboard",
    serial: "CTR-N-HKY?",
    regions: ["USA"]
  },
  "0000C803": {
    tid: "000400300000C803",
    appletName: "SAFE_MODE Software Keyboard",
    serial: "",
    regions: ["USA"]
  },
  "2000C803": {
    tid: "000400302000C803",
    appletName: "New 3DS SAFE_MODE Software Keyboard",
    serial: "",
    regions: ["USA"]
  },
  "0000C902": {
    tid: "000400300000C902",
    appletName: "Mii Picker Applet",
    serial: "CTR-N-HMS?",
    regions: ["USA"]
  },
  "0000CB02": {
    tid: "000400300000CB02",
    appletName: "Picture Picker",
    serial: "CTR-N-HCC?",
    regions: ["USA"]
  },
  "0000CC02": {
    tid: "000400300000CC02",
    appletName: "Voice Memo Picker",
    serial: "CTR-N-HMC?",
    regions: ["USA"]
  },
  "0000C502": {
    tid: "000400300000C502",
    appletName: "Non-Critical Error Display",
    serial: "CTR-N-HEEA | CTR-N-HEEK",
    regions: ["USA", "JPN", "EUR"]
  },
  "0000C503": {
    tid: "000400300000C503",
    appletName: "SAFE_MODE Error Applet",
    serial: "CTR-N-HCR?",
    regions: ["USA", "JPN", "EUR"]
  },
  "2000C503": {
    tid: "000400302000C503",
    appletName: "New 3DS SAFE_MODE Error Applet",
    serial: "",
    regions: ["USA"]
  },
  "0000CD02": {
    tid: "000400300000CD02",
    appletName: "Circle Pad Pro Test/Calibration Applet",
    serial: "CTR-N-HADA | CTR-N-HADK",
    regions: ["USA", "JPN", "EUR"]
  },
  "0000CE02": {
    tid: "000400300000CE02",
    appletName: "eShop Applet",
    serial: "CTR-N-HAA?",
    regions: ["USA"]
  },
  "0000BD02": {
    tid: "000400300000BD02",
    appletName: "Miiverse",
    serial: "CTR-N-HAE?",
    regions: ["USA"]
  },
  "0000F602": {
    tid: "000400300000F602",
    appletName: "System Library for Miiverse",
    serial: "CTR-N-HAGA",
    regions: ["USA", "JPN", "EUR"]
  },
  "00008B02": {
    tid: "0004003000008B02",
    appletName: "In-app Miiverse-posting applet ",
    serial: "CTR-N-HAH?",
    regions: ["USA"]
  },
  "00009E02": {
    tid: "0004003000009E02",
    appletName: "Cabinet (Amiibo Settings)",
    serial: "CTR-N-HA3?",
    regions: ["USA"]
  }
}

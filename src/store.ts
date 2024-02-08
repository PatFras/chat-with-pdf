import { writable } from "svelte/store";

export const APP_STATUS = {
    INIT: 0,
    LOADING:1,
    CHAT_MODE:2,
    ERROR:-1
}

export const appStatus = writable(APP_STATUS.INIT)

export const setAppStatusLoading = () => {
    appStatus.set(APP_STATUS.LOADING)
}

export const setAppStatusError = () => {
    appStatus.set(APP_STATUS.ERROR)
}

export const setAppStatusChatMode = (response:any) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
}
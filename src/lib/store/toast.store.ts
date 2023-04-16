import { writable } from 'svelte/store'

export enum ToastType {
    WARNING,
    SUCCESS,
    ERROR,
    MESSAGE,
}

interface IToastStore {
    open: boolean
    type: ToastType | null
    message: string | null
}

const defaultState = {
    open: false,
    type: null,
    message: null,
} 

export const toast = writable<IToastStore>(defaultState)

export const setToast = ({
    type,
    message,
}: { type: ToastType, message: string }) => {
    toast.update(() => ({
        open: true,
        type,
        message,
    }))

    setTimeout(() => resetToast(), 5000)

} 

export const  resetToast = () => toast.set(defaultState)

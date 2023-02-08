import type { SvelteComponent } from 'svelte'
import { type Writable, writable } from 'svelte/store'

interface Modal {
    component: SvelteComponent | null
    open: boolean
    dismissible: boolean
    data: any
}

const defaultModal: Modal = {
    component: null,
    open: false,
    dismissible: true,
    data: null,
}

export const modal: Writable<Modal> = writable(defaultModal)

export function openModal(component: SvelteComponent, dismissible?: boolean) {
    modal.update((modal => ({
        ...modal,
        component,
        open: true,
        dismissible: dismissible || false
    })))
}

export function closeModal() {
    modal.set(defaultModal)
}

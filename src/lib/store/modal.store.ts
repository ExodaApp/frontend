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
    dismissible: false,
    data: null,
}

export const modal: Writable<Modal> = writable(defaultModal)

export function openModal(component: SvelteComponent) {
    modal.update((modal => ({
        ...modal,
        component,
        open: true,
    })))
}

export function closeModal() {
    console.log('Closing modal')

    modal.set(defaultModal)
}

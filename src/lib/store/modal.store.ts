import type { SvelteComponent } from 'svelte'
import { type Writable, writable } from 'svelte/store'

interface Modal {
    component: SvelteComponent | null
    open: boolean
    dismissible: boolean
    data: any
}

const defaultModalValue: Modal = {
    component: null,
    open: false,
    dismissible: false,
    data: null,
}

export const modal: Writable<Modal> = writable(defaultModalValue)

export function openModal(newModal: Modal) {
    modal.set(newModal)
}

export function closeModal() {
    modal.set(defaultModalValue)
}

import { writable } from 'svelte/store'

interface IEthereumStore {
    address: string | null
    chain: number | null
}

export const defaultEthereum : IEthereumStore = {
    address: null,
    chain: null,
}

export const ethereum = writable<IEthereumStore>(defaultEthereum)

export const setEthereum = (chain: number, address: string) => {
    ethereum.update(() => ({
        address,
        chain,
    }))
}

export const setChain = (chain: number) =>
    ethereum.update(ethereum => ({
        ...ethereum,
        chain,
    }))

export const setAddress = (address: string) =>
    ethereum.update(ethereum => ({
        ...ethereum,
        address,
    }))

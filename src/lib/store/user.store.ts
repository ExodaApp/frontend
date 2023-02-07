import { writable } from "svelte/store";

export interface IUserInfo {
    address: string | null
    jwt: string | null
    walletConnected: boolean,
    authenticated: boolean,
}

const defaultUser: IUserInfo = {
    walletConnected: false,
    address: null,
    jwt: null,
    authenticated: true
}

export const user = writable<IUserInfo>(defaultUser)

export const setUserAddress = (address: string) => {
    user.update(user => ({
        ...user,
        address,
        walletConnected: true,
    }))
}

export const setJwt = (jwt: string) => {
    user.update(user => ({
        ...user,
        jwt,
        authenticated: true,
    }))
}

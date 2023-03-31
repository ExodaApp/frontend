import { writable } from 'svelte/store'

export interface IUserInfo {
    jwt: string | null
    walletConnected: boolean,
    authenticated: boolean,
}

const defaultUser: IUserInfo = {
    walletConnected: false,
    jwt: null,
    authenticated: false,
}

export const user = writable<IUserInfo>(defaultUser)

export const  setUserAuthenticated = () => {
    user.update(user => ({
        ...user,
        walletConnected: true,
        authenticated: true,
    }))
}

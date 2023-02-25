import axios from 'axios'
import { PUBLIC_EXODA_API } from '$env/static/public'
import type { IExchangeWallet } from '$lib/interfaces/IExchangeWallet'

export class ExchangeWalletService {
    public static readonly baseUrl = `${ PUBLIC_EXODA_API }/exchange-wallet`

    public static async createExchangeWallet(exchangeWallet: IExchangeWallet) {
        await axios.post(
            ExchangeWalletService.baseUrl,
            exchangeWallet,
            { withCredentials: true },
        )
    }

    public static async getExchangeWallets(): Promise<IExchangeWallet[]> {
        return (await axios.get(
            ExchangeWalletService.baseUrl,
            { withCredentials: true }
        )).data
    }

    public static async deleteExchangeWallet(id: number) {
        await axios.delete(
            `${ ExchangeWalletService.baseUrl }/${ id }`,
            { withCredentials: true },
        )
    }

    public static async editExchangeWallet(exchangeWallet: IExchangeWallet) {
        if (!exchangeWallet.id)
            throw new Error('Exchange wallet doesnt exist')

        await axios.put(
            `${ ExchangeWalletService.baseUrl }/${ exchangeWallet.id }`,
            exchangeWallet,
            { withCredentials: true },
        )
    }
}

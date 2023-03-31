import detectEthereumProvider from '@metamask/detect-provider'
import { JsonRpcSigner, Web3Provider, type ExternalProvider } from '@ethersproject/providers'

interface WalletProvider extends Web3Provider {
    provider: ExternalProvider
}

/**
* Mange all interactions with user's wallet
* TODO: set user info to local storage and reconnect
*/
export class WalletService {
    private static _walletProvider : WalletProvider

    /**
    * Request connection between page and user's wallet
    */
    public static async connect(): Promise<string> {
        await WalletService.getProvider()

        return WalletService.getWalletAddress()
    }

    public static async setListeners(
        chainSetter: (chain: number) => void,
        addressSetter: (address: string) => void,
    ): Promise<void> {
        const provider = await detectEthereumProvider()

        provider?.addListener('chainChanged', (chain: string) => chainSetter(parseInt(chain, 16)))
        provider?.addListener('accountsChanged', (addresses: string) => addressSetter(addresses[0]))
    }

    public static async getProvider(): Promise<WalletProvider> {
        const provider = await detectEthereumProvider()

        if (!provider)
            throw new Error('WalletService::connect: provider not detected')

        WalletService._walletProvider = new Web3Provider(provider) as WalletProvider

        return WalletService._walletProvider
    }

    /**
    * Get user current wallet address
    */
    public static async getWalletAddress(): Promise<string> {
        return (await WalletService._request('eth_requestAccounts'))[0]
    }

    public static async getSigner(): Promise<JsonRpcSigner> {
        if (!WalletService._walletProvider)
            await WalletService.getProvider()

        return WalletService._walletProvider.getSigner()
    }

    public static get walletProvider(): WalletProvider {
        if (!WalletService._walletProvider)
            throw new Error('WalletService::signMessage: wallet provider not initialized')

        return WalletService._walletProvider
    }

    private static async _request(method: string, params?: object[]): Promise<string> {
        const request = WalletService._walletProvider.provider.request

        if(!request)
            throw new Error('WalletService::_request: provider doesnt support requests')

        return request({ method, params })
    }
}

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
        const provider = await detectEthereumProvider()

        if (!provider)
            throw new Error('WalletService::connect: provider not detected')

        WalletService._walletProvider = new Web3Provider(provider) as WalletProvider

        return WalletService.getWalletAddress()
    }

    /**
    * Signs arbitrary message using user's private key
    *
    * @return signature
    */
    public static async signMessage(message: string): Promise<string> {
        return WalletService.signer.signMessage(message)
    }

    /**
    * Get user current wallet address
    */
    public static async getWalletAddress(): Promise<string> {
        return (await WalletService._request('eth_requestAccounts'))[0]
    }

    public static get signer(): JsonRpcSigner {
        return WalletService.walletProvider.getSigner()
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

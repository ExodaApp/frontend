import detectEthereumProvider from '@metamask/detect-provider'
import { JsonRpcSigner, Web3Provider, type ExternalProvider } from '@ethersproject/providers'
import { type Writable, get } from 'svelte/store'

interface WalletProvider extends Web3Provider {
    provider: ExternalProvider
}

/**
* Mange all interactions with user's wallet
* TODO: set user info to local storage and reconnect
*/
export class WalletService {
    constructor(private readonly _walletStore: Writable<WalletProvider | null>) {}

    /**
    * Request connection between page and user's wallet
    */
    async connect(): Promise<string> {
        const provider = await detectEthereumProvider()

        console.log({ provider })

        if (!provider)
            throw new Error('WalletService::connect: provider not detected')

        this._walletStore.set(new Web3Provider(provider) as WalletProvider)

        return this.getWalletAddress()
    }

    /**
    * Signs arbitrary message using user's private key
    *
    * @return signature
    */
    async signMessage(message: string): Promise<string> {
        return this.signer.signMessage(message)
    }

    /**
    * Get user current wallet address
    */
    async getWalletAddress(): Promise<string> {
        return (await this._request('eth_requestAccounts'))[0]
    }

    get signer(): JsonRpcSigner {
        return this.walletProvider.getSigner()
    }

    get walletProvider(): WalletProvider {
        const walletProvider = get(this._walletStore)

        if (!walletProvider)
            throw new Error('WalletService::signMessage: wallet provider not initialized')

        return walletProvider
    }

    private async _request(method: string, params?: object[]): Promise<string> {
        const request = this.walletProvider.provider.request

        if(!request)
            throw new Error('WalletService::_request: provider doesnt support requests')

        return request({ method, params })
    }
}

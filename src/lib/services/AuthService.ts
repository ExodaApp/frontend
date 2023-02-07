import type { Writable } from "svelte/store";
import type { WalletService } from '$lib/services/WalletService'
import type { IUserInfo } from '$lib/store/user.store'

export class AuthService {
    constructor(
        private readonly _userStore: Writable<IUserInfo>,
        private readonly _walletService: WalletService,
    ) {}

    /**
    * Coordinate the whole authentication flow between the user wallet, front-end and back-end
    */
    public async authenticate(): Promise<string> {
        const userAddress = await this._walletService.connect()
    }
}

import { PUBLIC_EXODA_API } from '$env/static/public'
import { SSX } from "@spruceid/ssx";

/**
* Interacts with Exoda's API to handle authentication process
*/
export class AuthService {
    /**
    * Uses SSX to create a session between 
    *
    * @return user address or throws
    */
    public static async auth(): Promise<string> {
        const { address } = await AuthService._ssx.signIn()

        if (!address)
            throw new Error('AuthService::auth: address no present on response from the server')

        return address
    }

    private static get _ssx(): SSX {
        return new SSX({
            enableDaoLogin: false,
            resolveEns: false,
            providers: {
                web3: {
                    driver: window.ethereum,
                },
                server: {
                    host: PUBLIC_EXODA_API,
                    routes: {
                        nonce: '/nonce',
                        login: '/login',
                        logout: '/logout',
                    }
                },
            },
        })
    }
}

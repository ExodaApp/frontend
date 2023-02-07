import { z } from 'zod'
import axios from 'axios'
import { PUBLIC_EXODA_API } from '$env/static/public'

const AuthenticateSchema = z.object({
    jwt: z.string().min(1, { message: 'Invalid JWT token'})
})

/**
* Interacts with Exoda's API to handle authentication process
*/
export class AuthService {
    private static readonly _baseUrl = `${PUBLIC_EXODA_API}/authenticate`

    /**
    * Receives a signed message sends to back-end and if valid, receives back a JWT token
    *
    * @param userAddress - address of the user who signed the message
    * @param signature - a message signed using user's private key 
    * @return JWT
    */
    public static async authenticate(userAddress: string, signature: string): Promise<string> {
        const response = (await axios.post(AuthService._baseUrl, {
            userAddress,
            signature,
        })).data

        return AuthenticateSchema.parse(response).jwt
    }
}

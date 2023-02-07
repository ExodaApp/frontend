import axios from 'axios'
import { z } from 'zod'
import { PUBLIC_EXODA_API } from '$env/static/public'

const NonceSchema = z.object({
    nonce: z.number()
})

/**
* Interacts with Exoda's API to fetch data from user resources
*/
export class UserService {
    private static readonly _baseUrl= `${PUBLIC_EXODA_API}/user`

    /**
    * Fetch random user nonce to use in the signing process
    *
    * @param userAddress - user address to fetch nonce from
    * @return nonce
    */
    public static async getNonce(userAddress: string): Promise<number> {
         const response = (await axios.get(`${ UserService._baseUrl }/${ userAddress }/nonce`)).data

         return NonceSchema.parse(response).nonce
    }
}

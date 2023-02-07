import axios from 'axios'
import { z } from 'zod'
import { env } from '$lib/helpers/env'
import { PUBLIC_EXODA_API } from '$env/static/public'

const NonceSchema = z.object({
    nonce: z.number()
})

export class UserService {
    private readonly baseUrl= `${PUBLIC_EXODA_API}/user`

    public async getNonce(userAddress: string): Promise<number> {
         const response = (await axios.get(`${this.baseUrl}/${userAddress}/nonce`)).data

         console.log({ response})

         return NonceSchema.parse(response).nonce
    }
}

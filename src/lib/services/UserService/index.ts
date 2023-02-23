import axios from 'axios'
import { PUBLIC_EXODA_API } from '$env/static/public'
import type { IUser } from '$lib/interfaces/IUser'

export class UserService {
    /**
    * Fetch user from user address
    *
    * @param userAddress - address from the user
    * @return user or null
    */
    private static async getUser(userAddress: string): Promise<IUser | null> {
        return (await axios.get(
            `${ PUBLIC_EXODA_API }/user/${ userAddress }`,
            { withCredentials: true },
        )).data.user
    }

    private static async createUser(userAddress: string): Promise<IUser> {
        return (await axios.post(
            `${ PUBLIC_EXODA_API }/user`,
            { userAddress },
            { withCredentials: true },
        ))
    }

}

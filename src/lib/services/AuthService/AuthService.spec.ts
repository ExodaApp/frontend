import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { beforeAll, describe, expect, it } from "vitest";
import { AuthService } from '.';
import { Wallet } from 'ethers';
import { PUBLIC_EXODA_API } from '$env/static/public'
import {
    PRIVATE_TEST_WALLET_PRIVATE_KEY,
    PRIVATE_TEST_WALLET_PUBLIC_KEY,
} from '$env/static/private';

const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWRkcmVzcyI6IjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9.jklltriiTydsVHIaQeyh_N0xYuFwwVtE_h2qX97CXlQ'

const jwtResponse = { jwt: JWT_TOKEN }
const authApiPath = `${ PUBLIC_EXODA_API }/authenticate`

interface IAuthenticateBody {
    signature: string
    userAddress: string
}

const apiHandlers = [
    rest.post<IAuthenticateBody>(authApiPath, async (req, res, ctx) => {
        const { signature, userAddress } = await req.json()

        if (!signature || !userAddress)
            throw new Error('Missing params')


        return res(
            ctx.json(jwtResponse)
        )
    })
]

const server = setupServer(...apiHandlers)

describe('AuthService', () => {
    const wallet = new Wallet(PRIVATE_TEST_WALLET_PRIVATE_KEY)

    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

    it('should return JWT for user signed message', async () => {
        const nonce = '0'
        const signature = await wallet.signMessage(nonce)
        const jwt = await AuthService.authenticate(PRIVATE_TEST_WALLET_PUBLIC_KEY, signature)

        expect(jwt).to.be.equals(JWT_TOKEN)
    })
})

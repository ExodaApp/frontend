import { expect, describe, it, beforeAll } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { UserService } from '.'
import { PUBLIC_EXODA_API } from '$env/static/public'
import { PRIVATE_TEST_WALLET_PUBLIC_KEY } from '$env/static/private'

const USER_ADDRESS = PRIVATE_TEST_WALLET_PUBLIC_KEY 

const userNonceResponse = { nonce: 0 }
const userApiPath = `${ PUBLIC_EXODA_API }/user`

const apiHandlers = [
    rest.get(`${ userApiPath }/${ USER_ADDRESS }/nonce`, async (_req, res, ctx) => {
        return res(
            ctx.json(userNonceResponse)
        )
    })
]

const server = setupServer(...apiHandlers)

describe('UserService', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

    it('should fetch user nonce', async () => {
        const nonce = await UserService.getNonce(USER_ADDRESS)

        expect(nonce).to.be.equal(userNonceResponse.nonce)
    })
})

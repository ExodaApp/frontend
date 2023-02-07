import { expect, describe, it } from 'vitest'
import { UserService } from '.'

describe('UserService', () => {
    const userService = new UserService()
    const USER_ADDRESS = '0x0000000000000000000000000000000000000000'

    it('should fetch user nonce', async () => {
         userService.getNonce(USER_ADDRESS)
    })
})

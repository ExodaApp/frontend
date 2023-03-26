<script lang="ts">
    import { closeModal } from '$lib/store/modal.store'
    import { user, setUserAddress } from '$lib/store/user.store'

    import { WalletService } from '$lib/services/WalletService'
    import { AuthService } from '$lib/services/AuthService'
    import { UserService } from '$lib/services/UserService'

    import Button from '$lib/components/Button.svelte'

    let loading = false

    const handleAuthentication = async () => {
        try {
            loading = true

            const address = await AuthService.auth()
            const user = await UserService.getUser(address)

            if (!user)
                await UserService.createUser(address)

            closeModal()
            setUserAddress(address)
        } catch (error) {
            // TODO: call toast
        } finally {
            loading = false
        }
    }
</script>

<Button on:click={ handleAuthentication } loading={ loading }>Connect wallet</Button>

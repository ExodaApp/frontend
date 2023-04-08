<script lang="ts">
    import { goto } from '$app/navigation';

    import { closeModal } from '$lib/store/modal.store'
    import { user, setUserAuthenticated } from '$lib/store/user.store'
    import { setChain, setAddress, setEthereum } from '$lib/store/ethereum.store'

    import { WalletService } from '$lib/services/WalletService'
    import { AuthService } from '$lib/services/AuthService'
    import { UserService } from '$lib/services/UserService'

    import Button from '$lib/components/Button.svelte'

    let loading = false

    const handleAuthentication = async () => {
        try {
            loading = true

            const { address, chainId } = await AuthService.auth()
            const user = await UserService.getUser(address)
            await WalletService.setListeners(setChain, setAddress)

            if (!user)
                await UserService.createUser(address)

            closeModal()
            setUserAuthenticated()
            setEthereum(chainId, address)

            goto('/app/expenses')
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    }
</script>

<Button on:click={ handleAuthentication } loading={ loading }>Connect wallet</Button>

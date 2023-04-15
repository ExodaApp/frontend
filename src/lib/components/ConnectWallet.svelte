<script lang="ts">
    import { goto } from '$app/navigation';

    import { closeModal } from '$lib/store/modal.store'
    import { user, setUserAuthenticated } from '$lib/store/user.store'
    import { setChain, setAddress, setEthereum } from '$lib/store/ethereum.store'

    import { WalletService } from '$lib/services/WalletService'
    import { AuthService } from '$lib/services/AuthService'
    import { UserService } from '$lib/services/UserService'
    import { TokenService } from '$lib/services/TokenService'

    import Button from '$lib/components/Button.svelte'
	import { setWallet } from '$lib/store/wallet.store';

    let loading = false

    const handleAuthentication = async () => {
        try {
            loading = true

            const { address, chainId } = await AuthService.auth()
            const [ tokensInfo, user ] = await Promise.all([
                TokenService.getTokens(address),
                UserService.getUser(address),
                WalletService.setListeners(setChain, setAddress),
            ])

            if (!user)
                await UserService.createUser(address)

            closeModal()
            setUserAuthenticated()
            setEthereum(chainId, address)
            setWallet({
                tokens: tokensInfo.assets,
                totalUsdBalance: tokensInfo.totalBalanceUsd,
            })

            goto('/app/expenses')
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    }
</script>

<Button on:click={ handleAuthentication } loading={ loading }>Connect wallet</Button>

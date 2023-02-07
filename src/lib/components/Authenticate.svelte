<script lang="ts">
    import { walletProvider } from '$lib/store/wallet-provider.store'
    import { user, setUserAddress, setJwt } from '$lib/store/user.store'
    import { WalletService } from '$lib/services/WalletService'
    import { UserService } from '$lib/services/UserService'
    import { AuthService } from '$lib/services/AuthService'

    const handleAuthentication = async () => {
        const userAddress = await WalletService.connect() 
        const nonce = await UserService.getNonce(userAddress)

        const signature = await WalletService.signMessage(`${ nonce }`)
        const jwt = await AuthService.authenticate(userAddress, signature)

        setJwt(jwt)
        setUserAddress(userAddress)
    }
</script>

<h1>Not Connected</h1>
<button on:click="{ handleAuthentication }">Connect wallet</button>

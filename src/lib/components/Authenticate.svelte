<script lang="ts">
    import { walletProvider } from '$lib/store/wallet-provider.store'
    import { user, setUserAddress, setJwt } from '$lib/store/user.store'
    import { WalletService } from '$lib/services/WalletService'

    const walletService = new WalletService(walletProvider)
    const authService = new AuthService(user)

    const authenticate = async () => {
        const userAddress = await walletService.connect() 
        const message = (() => 'this is the message')()
        const signature = signMessage(message)
        const jwt = sendSignature(signature)
        setJwt(jwt)
        setUserAddress(userAddress)
    }

    const signMessage = async (message: string): Promise<string> => {
        const signature = await walletService.signMessage(message)
        console.log(signature)
    }

    const sendSignature = (signature: string): Proimse<string> => {
        return 'jwt'
    }

</script>

<h1>Not Connected</h1>
<button on:click="{authenticate}">Connect wallet</button>

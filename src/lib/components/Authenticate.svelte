<script lang="ts">
    import { walletProvider } from '$lib/store/wallet-provider.store'
    import wallet from '$lib/images/wallet.png'

    import { closeModal } from '$lib/store/modal.store'
    import { user, setUserAddress } from '$lib/store/user.store'
    import { setExpenses } from '$lib/store/expenses.store'
    import { setExchangeWallets } from '$lib/store/exchange-wallets.store'

    import { WalletService } from '$lib/services/WalletService'
    import { AuthService } from '$lib/services/AuthService'
    import { UserService } from '$lib/services/UserService'
    import { ExpenseService } from '$lib/services/ExpenseService'
    import { ExchangeWalletService } from '$lib/services/ExchangeWalletService'

    import Button from '$lib/components/Button.svelte'

    let loading = false

    user.subscribe(user => {
        if (user.authenticated)
            fetchUserData()
    })

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

    const fetchUserData = async () => {
        await Promise.all([
            fetchExpenses(),
            fetchExchangeWallets(),
        ])
    }

    const fetchExpenses = async () =>
        setExpenses(await ExpenseService.getExpenses())

    const fetchExchangeWallets = async () =>
        setExchangeWallets(await ExchangeWalletService.getExchangeWallets())
</script>


<div class="flex flex-col items-center justify-center text-center">
    <h1 class="font-syne text-24 font-600 mb-16">Connect your wallet</h1>
    <span class="mb-32">
        Connect your wallet to keep using Exoda
    </span>

    <img src={wallet} alt="wallet" class="w-240 mb-32"/>

    <Button on:click={ handleAuthentication } loading={ loading }>Connect wallet</Button>
</div>

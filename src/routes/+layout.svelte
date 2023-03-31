<script lang="ts">
    import "../app.css"

    import '@fontsource/lexend-deca'
    import '@fontsource/syne'
    import '@fontsource/plus-jakarta-sans'

    import { user } from '$lib/store/user.store'
    import { modal, openModal, closeModal } from '$lib/store/modal.store'

    import Menu from '$lib/components/Menu.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import LandingPage from '$lib/components/LandingPage.svelte'
    import { ExpenseService } from '$lib/services/ExpenseService'
    import { ExchangeWalletService } from '$lib/services/ExchangeWalletService'

    import { setExpenses } from '$lib/store/expenses.store'
    import { setExchangeWallets } from '$lib/store/exchange-wallets.store'

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

    user.subscribe(user => {
        if (user.authenticated)
            fetchUserData()
    })
</script>

{ #if $modal.open }
    <Modal/>
{/if}

{ #if !$user.authenticated }
    <div class="flex justify-center items-center absolute  
        bg-dark-1 backdrop-blur text-white laptop:pt-88
        w-full h-full">
        <div class="flex flex-col items-center
            w-full h-full laptop:max-w-app
            px-32 py-40
            bg-dark-solid text-white rounded-xl">
            <LandingPage/>
        </div>
    </div>
{ /if }
<div class="w-full h-screen bg-[url('/app-bg.jpg')] bg-repeat bg-cover bg-center flex flex-col text-white font-jakarta pb-20">
    <!-- Header -->
    <div class="w-full flex items-center justify-center px-16 tablet:px-32 pt-16">
        <div class="flex items-center justify-center laptop:max-w-default w-full">
            <Menu/>
        </div>
    </div>

    <!-- Content -->
    <div class="overflow-y-scroll h-full flex items-center justify-center px-16 tablet:px-32">
        <div class="w-full py-32 h-full laptop:py-24 laptop:max-w-default">
            <slot/>
        </div>
    </div>
</div>


<script lang="ts">
    import logo from '$lib/icons/logo.svg'
    import { page } from '$app/stores'

    enum MenuItem {
        EXPENSES = 'expenses',
        EXCHANGE_WALLETS = 'exchange-wallets',
        TRANSACTIONS = 'transactions'
    }

    let active: string

    $: {
        const urlParts = $page.url.pathname.split('/') 
        active = urlParts[urlParts.length - 1]
    }
</script>

<div class="flex flex-col gap-8 laptop:grid laptop:grid-cols-2
        justify-center items-center laptop:justify-between 
        text-12 font-lexend font-600 laptop:text-14
        w-full">
        <img src={logo} alt="exoda_logo"/>

        <div class="grid grid-cols-3 justify-between gap-8 bg-dark-4 rounded-full cursor-pointer">
            <a href="/app/expenses">
                <div class="flex rounded-full h-full p-8 laptop:py-16 items-center justify-center"
                    class:bg-primary="{ active === MenuItem.EXPENSES }">
                    <span>Expenses</span>
                </div>
            </a>
            <a href="/app/exchange-wallets">
                <div class="flex rounded-full h-full p-8 laptop:py-16 items-center justify-center"
                    class:bg-primary="{ active === MenuItem.EXCHANGE_WALLETS }">
                    <span>Exchanges</span>
                </div>
            </a>
            <!-- <a href="/app/transactions"> -->
            <a href="">
                <div class="flex rounded-full h-full p-8 laptop:py-16 items-center justify-center"
                    class:bg-primary="{ active === MenuItem.TRANSACTIONS }">
                    <span>Analytics (Soon)</span>
                </div>
            </a>
        </div>
</div>

<script lang="ts">
    import logo from '$lib/icons/logo.svg'
    import ConnectWallet from '$lib/components/ConnectWallet.svelte'
    import Twitter from '$lib/icons/Twitter.svelte'
</script>


<div class="flex flex-col items-center gap-48 font-syne w-full overflow-y-auto">
    <div class="flex flex-col items-center gap-16 text-center">
        <img src={logo} alt="exoda_logo" class="w-280"/>
        <h1 class="font-600 text-32">The Web3 expense tracking app</h1>
        <p class="text-18">Track your expenses using any fiat, transfer to the exchange using any token</p>
    </div>

    <div class="flex flex-col items-center gap-20">
        <ConnectWallet/>
        <p class="text-14 font-jakarta">Start tracking your expenses now</p>
    </div>

    <div class="grid grid-cols-1 laptop:grid-cols-3 p-8 gap-24 w-full">
        <div class="flex flex-col rounded-xl bg-primary p-16 relative gap-10 laptop:gap-0 laptop:h-200">
            <h2 class="font-600 text-20">1. List your expenses</h2>
            <p class="laptop:absolute bottom-16">List all your expenses and their respective fiat values. You can mix different fiat currencies</p>
        </div>
        <div class="flex flex-col rounded-xl bg-primary p-16 relative gap-10 laptop:gap-0">
            <h2 class="font-600 text-20">2. Exchange address book</h2>
            <p class="laptop:absolute bottom-16">Register the wallet of your exchange of choice. You can register multiple exchange wallets that will receive your tokens</p>
        </div>
        <div class="flex flex-col rounded-xl bg-primary p-16 relative gap-10 laptop:gap-0">
            <h2 class="font-600 text-20">3. Transfer tokens</h2>
            <p class="laptop:absolute bottom-16">Transfer the tokens you want to sell to cover your monthly expenses to the exchange your choice</p>
        </div>
    </div>

    <div class="flex flex-col gap-20 text-center">
        <div class="flex flex-col gap-8 items-center">
            <Twitter/>
            <h2 class="text-24 font-600">Follow us on Twitter</h2>
            <p class="text-18">and don't miss an update</p>
        </div>

        <a href="https://twitter.com/ExodaApp" target="__blank" class="text-20 text-primary-solid">@ExodaApp</a>
    </div>
</div>

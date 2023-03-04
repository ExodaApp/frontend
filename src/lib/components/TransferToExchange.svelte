<script lang="ts">
    import { expenses } from '$lib/store/expenses.store'
    import { exchangeWallets } from '$lib/store/exchange-wallets.store'
    import Input from '$lib/components/Input.svelte'
    import Select from '$lib/components/Select.svelte'
    import Button from '$lib/components/Button.svelte'
    import { Token } from '$lib/models/Token'

    let exchangeOptions
    let exchange
    let tokenAddress
    let token: Token

    $: exchangeOptions = $exchangeWallets.map(wallet => ({ id: wallet.id, value: wallet.name }))
    $: {
        if (!exchange)
            exchange = exchangeOptions[0].id
    }
    $: {
        // TODO: change this to actually verify address
        if (tokenAddress.length === 42) {
            // fetch token info
        }
    }

    const getToken = async () => {
        
    }

</script>

<div class="flex gap-40 px-32 flex-col items-center justify-center w-full">
    <div class="flex flex-col text-center">
        <p class="font-jakarta text-18 font-600">Transferring</p>
        <h1 class="font-syne text-48 font-600 text-primary-light leading-1">
            $ { $expenses.totalUsdValue }
        </h1>
    </div>

    <div class="flex flex-col text-center w-full gap-10">
        <p class="font-jakarta text-18 font-600">To exchange</p>
        <Select options={exchangeOptions} bind:value={exchange}/>
    </div>

    <div class="flex flex-col text-center w-full gap-10">
        <p class="font-jakarta text-18 font-600">Using token</p>
        <Input bind:value={tokenAddress}/>
    </div>

    <div class="w-full">
        <div class="flex justify-between items-end w-full font-jakarta font-600 mb-4">
            <div class="text-14 items-end">
                <p class="mb-4">Total in token:</p>
                <p class="text-20 font-font-600">BUSD 5.001,20</p>
                <p class="font-400 font-jakarta text-14 mb-4">Balance: BUSD 1.302,00</p>
            </div>
            <Button class="h-40">Transfer</Button>
        </div>
    </div>
</div>

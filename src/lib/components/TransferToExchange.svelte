<script lang="ts">
    import { Token } from '@exoda-app/tokens'
    import { expenses } from '$lib/store/expenses.store'
    import { ethereum } from '$lib/store/ethereum.store'
    import { exchangeWallets, getExchange } from '$lib/store/exchange-wallets.store'
    import Input from '$lib/components/Input.svelte'
    import Select from '$lib/components/Select.svelte'
    import Button from '$lib/components/Button.svelte'
    import { WalletService } from '$lib/services/WalletService'

    let exchangeOptions
    let exchangeId
    let exchange
    let tokenAddress
    let token: Token
    let tokenAmount: string
    let tokenPrice: string

    $: {
        if (token && token.price)
            tokenAmount = $expenses.totalUsdValue / token.price
    }
    $: exchangeOptions = $exchangeWallets.map(wallet => ({ id: wallet.id, value: wallet.name }))
    $: {
        const id = exchangeId ? exchangeId : exchangeOptions[0].id

        exchange = getExchange(id)
    }
    $: {
        // TODO: change this to actually verify address
        if (
            tokenAddress &&
            tokenAddress.length === 42 &&
            $ethereum.chain &&
            $ethereum.address
        )
            getToken()
    }

    const getToken = async () => {
        token = await Token.initialize({
            address: tokenAddress,
            chain: $ethereum.chain,
            user: $ethereum.address,
        })
    }

    const sendTransaction = async () => {
        const tokenAmount = token.price * $expenses.totalUsdValue 
        const rawValue = token.valueFromTokenDecimals(tokenAmount)
        const signer = await WalletService.getSigner()

        await token.contract.connect(signer).transfer(exchange.address, rawValue)
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
        <Select options={exchangeOptions} bind:value={exchangeId}/>
    </div>

    <div class="flex flex-col text-center w-full gap-10">
        <p class="font-jakarta text-18 font-600">Using token</p>
        <Input bind:value={tokenAddress}/>
    </div>

    { #if tokenPrice }
        <div class="flex flex-col text-center w-full gap-10">
            <p class="font-jakarta text-18 font-600">Token price</p>
            <Input bind:value={tokenPrice}/>
        </div>
    { /if }

    <div class="w-full">
        <div class="flex justify-between items-end w-full font-jakarta font-600 mb-4">
            <div class="text-14 items-end">
                { #if token }
                    <p class="mb-4">Total in token:</p>
                    <p class="text-20 font-font-600">{tokenAmount.toFixed(2)} <span class="text-16">{ token.symbol }</span></p>
                    <p class="font-400 font-jakarta text-14 mb-4">Balance: { token.balance.toFixed(2) }</p>
                { /if }
            </div>
            <Button class="h-40" on:click={sendTransaction}>Transfer</Button>
        </div>
    </div>
</div>

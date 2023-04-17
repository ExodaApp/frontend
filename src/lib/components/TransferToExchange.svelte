<script lang="ts">
    import { Token } from '@exoda-app/tokens'
    import type { BigNumber } from 'bignumber.js'
    import { expenses } from '$lib/store/expenses.store'
    import { ethereum } from '$lib/store/ethereum.store'
    import { exchangeWallets, getExchange } from '$lib/store/exchange-wallets.store'
    import Input from '$lib/components/Input.svelte'
    import Select from '$lib/components/Select.svelte'
    import Button from '$lib/components/Button.svelte'
    import SearchInput from '$lib/components/SearchInput.svelte'
    import { WalletService } from '$lib/services/WalletService'
	import { wallet } from '$lib/store/wallet.store';
    import Fuse from 'fuse.js'
	import { ToastType, setToast } from '$lib/store/toast.store';

    let exchangeOptions
    let exchangeId
    let exchange
    let tokenAddress: string
    let token: Token
    let tokenAmount: BigNumber | undefined
    let tokenPrice: string
    let fuseTokens: Fuse<Token>
    let tokenSearchResult: Token[]
    let tokenSearchTerm: string

    $: exchangeOptions = $exchangeWallets.map(wallet => ({ id: wallet.id, value: wallet.name }))
    $: {
        if (!$wallet.tokens)
            tokenSearchResult = []
        else
            tokenSearchResult = tokenSearchTerm
                ? fuseTokens.search(tokenSearchTerm).map(result => result.item)
                : $wallet.tokens
    }
    $: {
        if (token && token.price)
            tokenAmount = $expenses.totalUsdValue?.div(token.price)
    }
    $: {
        if ($wallet.tokens)
            fuseTokens = new Fuse($wallet.tokens, {
                keys: ['address', 'symbol', 'name']
            })
    }
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

    // TODO: change chain if needed
    const sendTransaction = async () => {
        try {
            if (!tokenAmount)
                throw new Error('Cannot estimate price')

            const rawValue = token.valueFromTokenDecimals(tokenAmount.toNumber())
            const signer = await WalletService.getSigner()

            await token.contract.connect(signer).transfer(exchange.address, rawValue)
        } catch (error: any) {
            setToast({
                type: ToastType.ERROR,
                message: error.reason || error.message
            })
        }
    }

    const handleClick = async (selectedToken: Token) => {
        token = selectedToken 
        tokenSearchTerm = token.symbol
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
        <SearchInput bind:value={tokenSearchTerm}>
            <div slot="options" class="max-h-250 overflow-y-auto flex flex-col gap-10">
                { #each tokenSearchResult as result, i }
                    <div
                        class="flex justify-between px-16 py-8 text-sm text-gray-700 hover:bg-dark-1 hover:text-gray-900 cursor-pointer mb"
                        role="menuitem"
                        tabindex="-1"
                        on:click={() => handleClick(result)}
                    >
                        <div class="flex gap-8 font-600 font-lexend">
                            <img src={result.logo} class="rounded-full w-24 h-24"/>
                            { result.symbol }
                        </div>
                        <div>
                            { result.balance }
                        </div>
                    </div>
                { /each }
            </div>
        </SearchInput>
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
                    <p class="text-20 font-font-600">{tokenAmount?.toFixed(2)} <span class="text-16">{ token.symbol }</span></p>
                    <p class="font-400 font-jakarta text-14 mb-4">Balance: { token.balance?.toFixed(2) }</p>
                { /if }
            </div>
            <Button class="h-40" on:click={sendTransaction}>Transfer</Button>
        </div>
    </div>
</div>

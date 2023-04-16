<script lang="ts">
    import Input from '$lib/components/Input.svelte'
    import Button from '$lib/components/Button.svelte'
    import type { IExchangeWallet } from '$lib/interfaces/IExchangeWallet'
    import { closeModal } from '$lib/store/modal.store'
    import { ethereum } from '$lib/store/ethereum.store'
    import { exchangeWallets, setExchangeWallets } from '$lib/store/exchange-wallets.store'
    import { ExchangeWalletService } from '$lib/services/ExchangeWalletService'
	import { ToastType, setToast } from '$lib/store/toast.store';

    export let data: any
    let loading: boolean
    let exchangeWallet: IExchnageWallet = {
        name: '',
        address: '',
    }

    $: {
        if (data) {
            exchangeWallet = $exchangeWallets.find(wallet => wallet.id === data)
        }
    }

    const handleSubmit = async () => {
        try {
            loading = true

            const handler = data ? handleEdit : handleCreate
            
            await handler()

            setExchangeWallets(await ExchangeWalletService.getExchangeWallets($ethereum.address))

        } catch (error: any) {
            setToast({
                type: ToastType.ERROR,
                message: error.message
            })
        } finally {
            loading = false
            closeModal()
        }
    }

    const handleEdit = () =>
        ExchangeWalletService.editExchangeWallet(exchangeWallet)

    const handleCreate = () =>
        ExchangeWalletService.createExchangeWallet(exchangeWallet)
</script>

<div class="w-full flex flex-col gap-24">
    <h1 class="font-syne text-24 font-600 mb-16">Create exchange wallet</h1>

    <div>
        <label class="text-14">Exchange name</label>
        <Input bind:value={exchangeWallet.name} />
    </div>

    <div>
        <label class="text-14">Wallet address</label>
        <Input bind:value={exchangeWallet.address} />
    </div>

    <div class="flex justify-end">
        <Button loading={loading} on:click={handleSubmit}>
            { data ? 'Edit' : 'Create' }
        </Button>
    </div>
</div>

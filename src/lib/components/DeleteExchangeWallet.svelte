<script lang="ts">
    import TrashWhite from '$lib/icons/TrashWhite.svelte'
    import Warning from '$lib/images/warning.png'
    import Button from '$lib/components/Button.svelte'
    import { ExchangeWalletService } from '$lib/services/ExchangeWalletService'

    import { setExchangeWallets } from '$lib/store/exchange-wallets.store'
    import { closeModal } from '$lib/store/modal.store'
	import { ToastType, setToast } from '$lib/store/toast.store';

    export let data: any
    let loading = false

    const handleDelete = async () => {
        try {
            loading = true

            await ExchangeWalletService.deleteExchangeWallet(data)

            setExchangeWallets(await ExchangeWalletService.getExchangeWallets())
        } catch (error: any) {
            setToast({
                type: ToastType.ERROR,
                message: error.message,
            })
        } finally {
            loading = false
            closeModal()
        }
    }
</script>

<div class="flex flex-col items-center justify-center text-center gap-32">
    <h1 class="font-syne text-24 font-600 mb-16">Are you sure you want to delete this exchange wallet?</h1>

    <img src={ Warning } class="w-280"/>

    <div class="flex w-full justify-center gap-32">
        <Button on:click={handleDelete} class="bg-red flex justify-center items-center gap-8">
            <TrashWhite class="h-20"/>
            Delete
        </Button>
    </div>
</div>


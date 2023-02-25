<script lang="ts">
    import Table from '$lib/components/Table.svelte'
    import TableEmptyState from '$lib/components/TableEmptyState.svelte'
    import CreateExchangeWallet from '$lib/components/CreateExchangeWallet.svelte'
    import DeleteExchangeWallet from '$lib/components/DeleteExchangeWallet.svelte'
    import type { IExchangeWallet } from '$lib/interfaces/IExchangeWallet'
    import { user } from '$lib/store/user.store'
    import { openModal } from '$lib/store/modal.store'
    import { exchangeWallets, setExchangeWallets } from '$lib/store/exchange-wallets.store'
    import { ExchangeWalletService } from '$lib/services/ExchangeWalletService'

    import Add from '$lib/icons/Add.svelte'

    const tableHeaders = ['Exchange', 'Wallet address'] 
    let tableContent = []
    let hasExchangeWallets = false

    $: hasExchangeWallets = !!tableContent.length
    $: tableContent = exchangeWalletsToTableContent($exchangeWallets)
    $: {
        if ($user.authenticated)
            fetchExchangeWallets()
    }

    const fetchExchangeWallets = async () =>
        setExchangeWallets(await ExchangeWalletService.getExchangeWallets())

    const exchangeWalletsToTableContent = (exchangeWallets: IExchangeWallet[]) => exchangeWallets.map(wallet => ({
        id: wallet.id,
        content: [
            wallet.name,
            wallet.address,
        ],
    }))

    const openEditModal = (event) =>
        openModal({ component: CreateExchangeWallet, data: event.detail, dismissible: true })

    function openDeleteModal(event) {
        openModal({ component: DeleteExchangeWallet, data: event.detail, dismissible: true })
    }

    const openCreateExchangeWallet = () => 
        openModal({ component: CreateExchangeWallet, dismissible: true })
</script>

<div class="flex justify-between items-center px-4">
    <h2 class="font-syne text-24 mb-16 font-600">Exchange Wallets</h2>
    <button class="flex items-center gap-4" on:click={openCreateExchangeWallet}>
        <Add class="h-20"/>
        Create
    </button>
</div>

{ #if hasExchangeWallets }
    <Table headers={tableHeaders}
        rows={tableContent}
        editable={true}
        on:edit={openEditModal}
        on:delete={openDeleteModal}/>
{ :else }
    <TableEmptyState header="No expenses yet"
        message="Click on &quot;Create&quot; and start tracking your expenses"/>
{ /if }


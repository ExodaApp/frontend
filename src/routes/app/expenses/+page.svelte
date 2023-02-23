<script lang="ts">
    import type { ActionData } from "@sveltejs/kit"

    import Summary from './Summary.svelte'
    import Table from '$lib/components/Table.svelte'
    import Button from '$lib/components/Button.svelte'
    import CreateExpenses from '$lib/components/CreateExpenses.svelte'
    import Book from '$lib/icons/Book.svelte'
    import Add from '$lib/icons/Add.svelte'

    import banking from '$lib/images/banking.png'
    import yoga from '$lib/images/yoga-animated.gif'

    import { openModal } from '$lib/store/modal.store'

    const tableHeaders = ['Expense', 'Due day', 'Value', 'Currency'] 
    const tableContent = []
    const _tableContent: { id: number, content: string[] }[][] = [
        {
            id: 0,       
            content: [
                'Credit card',
                '20',
                '$ 1500',
                'BRL',
            ],
        },
        {
            id: 1,       
            content: [
                'Credit card',
                '20',
                '$ 1500',
                'BRL',
            ],
        },
    ]

    export let form: ActionData
    let hasExpenses = false


    $: hasExpenses = !!tableContent.length

    const openCreateExpenseModal = () => {
        console.log('Opening modal')
        openModal(CreateExpenses, true)
    }
</script>

{ #if hasExpenses }
    <h2 class="font-syne text-24 mb-16 font-600">Summary</h2>
    <div class="mb-32">
        <Summary class="mb-32"/>
    </div>
{ /if }

<div class="flex justify-between items-center px-4">
    <h2 class="font-syne text-24 mb-16 font-600">Expenses</h2>
    <button class="flex items-center gap-4" on:click={openCreateExpenseModal}>
        <Add class="h-20"/>
        Create
    </button>
</div>

{ #if hasExpenses }
    <Table headers={tableHeaders}
        rows={tableContent}
        editable={true}
        on:edit={(param) => console.log('Edit emmited', param)}
        on:delete={() => console.log('Delete emmited')}/>
{ :else }
    <div class="flex flex-col items-center justify-center 
        gap-24 w-full h-max p-24
        bg-dark-2 rounded-3xl text-center">
        <h1 class="font-lexend font-600 text-24">No expenses yet</h1>
        <img src={yoga} class="w-240"/>
        <p>Click on "Create" and start tracking your expenses</p>
    </div>
{ /if }

<script lang="ts">
    import type { ActionData } from "@sveltejs/kit"

    import Summary from './Summary.svelte'
    import Table from '$lib/components/Table.svelte'
    import Button from '$lib/components/Button.svelte'
    import DeleteExpense from '$lib/components/DeleteExpense.svelte'
    import CreateExpenses from '$lib/components/CreateExpenses.svelte'
    import TableEmptyState from '$lib/components/TableEmptyState.svelte'

    import Book from '$lib/icons/Book.svelte'
    import Add from '$lib/icons/Add.svelte'

    import { ExpenseService } from '$lib/services/ExpenseService'
    import type { IExpense } from '$lib/interfaces/IExpense'
 
    import banking from '$lib/images/banking.png'

    import { openModal } from '$lib/store/modal.store'
    import { user } from '$lib/store/user.store'
    import { expenses, setExpenses } from '$lib/store/expenses.store'

    const tableHeaders = ['Expense', 'Due day', 'Currency', 'Value'] 
    let tableContent = []

    $: tableContent = expensesToTableContent($expenses.items)
    $: {
        if ($user.authenticated)
            fetchExpenses()
    }

    const fetchExpenses = async () =>
        setExpenses(await ExpenseService.getExpenses())

    const expensesToTableContent = (expenses: IExpense[]) => expenses.map(expense => ({
        id: expense.id,
        content: [
            expense.name,
            expense.dueDay,
            expense.currency,
            expense.value,
        ]
    }))

    const openCreateExpenseModal = () =>
        openModal({ component: CreateExpenses, dismissible: true })

    const openDeleteModal = (event) =>
        openModal({ component: DeleteExpense, data: event.detail, dismissible: true })

    const openEditModal = (event) =>
        openModal({ component: CreateExpenses, data: event.detail, dismissible: true })
</script>

{ #if $expenses.items.length }
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

{ #if $expenses.items.length }
    <Table headers={tableHeaders}
        rows={tableContent}
        editable={true}
        on:edit={openEditModal}
        on:delete={openDeleteModal}/>
{ :else }
    <TableEmptyState header="No expenses yet"
        message="Click on &quot;Create&quot; and start tracking your expenses"/>
{ /if }

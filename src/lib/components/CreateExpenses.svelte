<script lang="ts">
    import { ExpenseService } from '$lib/services/ExpenseService'
    import type { IExpense } from '$lib/interfaces/IExpense'
    import Button from '$lib/components/Button.svelte'
    import Input from '$lib/components/Input.svelte'

    import { expenses, setExpenses } from '$lib/store/expenses.store'
    import { user } from '$lib/store/user.store'
    import { closeModal } from '$lib/store/modal.store'

    export let data: any
    let loading: boolean
    let expense: IExpense = {
        name: '',
        dueDay: 0,
        value: 0,
        currency: '',
    }

    $: {
        if (data)
            expense = $expenses.items.find(expense => expense.id === data)
    }

    const handleSubmit = async () => {
        try {
            loading = true

            const handler = data ? handleEdit : handleCreate
            
            await handler()

            setExpenses(await ExpenseService.getExpenses($user.address))

            // TODO: add toast
        } catch (error) {
            // TODO: add toast 
        } finally {
            loading = false
            closeModal()
        }
    }

    const handleEdit = () =>
        ExpenseService.editExpense(parseExpense())

    const handleCreate = () =>
        ExpenseService.createExpenses([ parseExpense() ])

    const parseExpense = (): IExpense =>  ({
        ...expense,
        value: +expense.value,
        dueDay: +expense.dueDay
    })
</script>

<div class="w-full flex flex-col gap-24">
    <h1 class="font-syne text-24 font-600 mb-16">Create expense</h1>

    <div>
        <label class="text-14">Expense name</label>
        <Input bind:value={expense.name} />
    </div>

    <div>
        <label class="text-14">Due day</label>
        <Input bind:value={expense.dueDay} />
    </div>

    <div>
        <label class="text-14">Currency</label>
        <Input bind:value={expense.currency} />
    </div>

    <div>
        <label class="text-14">Value</label>
        <Input bind:value={expense.value} />
    </div>

    <div class="flex justify-end">
        <Button loading={loading} on:click={handleSubmit}>
            { data ? 'Edit' : 'Create' }
        </Button>
    </div>
</div>

<script lang="ts">
    import { ExpenseService } from '$lib/services/ExpenseService'
    import type { IExpense } from '$lib/interfaces/IExpense'
    import Button from '$lib/components/Button.svelte'
    import Input from '$lib/components/Input.svelte'
    import Select from '$lib/components/Select.svelte'

    import { expenses, setExpenses } from '$lib/store/expenses.store'
    import { user } from '$lib/store/user.store'
    import { closeModal } from '$lib/store/modal.store'

    export let data: any
    let loading: boolean
    let expense: IExpense = {
        name: '',
        dueDay: '',
        value: '',
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
        <Input bind:value={expense.name} placeholder="Internet bill"/>
    </div>

    <div>
        <label class="text-14">Due day</label>
        <Input bind:value={expense.dueDay} placeholder="5" type="number"/>
    </div>

    <div>
        <label class="text-14">Currency</label>
        <Select
            bind:value={expense.currency}
            emptyState="Select a currency"
            selected={{ id: 'USD', value: '🇺🇸 USD' }}
            options={[
                { id: 'USD', value: '🇺🇸 USD' },
                { id: 'BRL', value: '🇧🇷 BRL' },
                { id: 'CAD', value: '🇨🇦 CAD' },
                { id: 'ARS', value: '🇦🇷 ARS' },
                { id: 'JPY', value: '🇯🇵 JPY' },
            ]}
        />
    </div>

    <div>
        <label class="text-14">Value</label>
        <Input bind:value={expense.value} placeholder="150" type="number"/>
    </div>

    <div class="flex justify-end">
        <Button loading={loading} on:click={handleSubmit}>
            { data ? 'Edit' : 'Create' }
        </Button>
    </div>
</div>

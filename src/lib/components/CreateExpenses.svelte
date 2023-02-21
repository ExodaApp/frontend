<script lang="ts">
    import { ExpenseService } from '$lib/services/ExpenseService'
    import type { IExpense } from '$lib/interfaces/IExpense'
    import Button from '$lib/components/Button.svelte'
    import Input from '$lib/components/Input.svelte'

    let loading: boolean
    let expense: IExpense = {
        name: '',
        dueDay: 0,
        value: 0,
        currency: '',
    }

    const handleCreate = async () => {
        try {
            loading = true

            const response = await ExpenseService.createExpenses([
                parseExpense()
            ])

            console.log(respnse)
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    }

    const parseExpense = (): IExpense =>  ({
        ...expense,
        value: +expense.value,
        dueDay: +expense.dueDay
    })
</script>

<div class="w-full flex flex-col gap-24">
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
        <Button loading={loading} on:click={handleCreate}>
            Create
        </Button>
    </div>
</div>

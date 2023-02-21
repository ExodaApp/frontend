<script lang="ts">
    import Summary from './Summary.svelte'

    import Table from '$lib/components/Table.svelte'
    import Button from '$lib/components/Button.svelte'
    import Book from '$lib/icons/Book.svelte'

    import banking from '$lib/images/banking.png'
    import yoga from '$lib/images/yoga-animated.gif'

    const tableHeaders = ['Expense', 'Due day', 'Value', 'Currency'] 
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

    let hasExpenses = false

    const tableContent = []

    $: hasExpenses = !!tableContent.length

    // const editCallback = (id: number) => console.log('GOT AN ID')

    // const tableHeaders = ['Exchange', 'Address', 'Test'] 
    // const tableContent = [
    //     [
    //         'Binance',
    //         '0xa543...0306B',
    //         'Another test'
    //     ],
    // ]
</script>

<!-- <div class=""> -->
<!-- </div> -->
{ #if hasExpenses }
    <h2 class="font-syne text-24 mb-16 font-600">Summary</h2>
    <div class="mb-32">
        <Summary class="mb-32"/>
    </div>
{ /if }

<h2 class="font-syne text-24 mb-16 font-600">Expenses</h2>

{ #if hasExpenses }
    <Table headers={ tableHeaders }
        rows={ tableContent }
        editable={true}
        on:edit={(param) => console.log('Edit emmited', param)}
        on:delete={() => console.log('Delete emmited')}/>
{ :else }
    <div class="flex flex-col items-center justify-center 
        gap-24 w-full h-max p-24
        bg-dark-2 rounded-3xl text-center">
        <h1 class="font-lexend font-600 text-24">No expenses yet</h1>
        <img src={yoga} class="w-240"/>
        <span>Click on "Create expense" and start tracking your bills</span>
    </div>
{ /if }

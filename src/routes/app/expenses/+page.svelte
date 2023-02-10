<script lang="ts">
    import Summary from './Summary.svelte'
    import Table from '$lib/components/Table.svelte'
    import Button from '$lib/components/Button.svelte'
    import Book from '$lib/icons/Book.svelte'

    const tableHeaders = ['Expense', 'Due day', 'Value', 'Currency'] 
    const tableContent: { id: number, content: string[] }[][] = [
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

<h2 class="font-syne text-24 mb-16 font-600">Summary</h2>
<div class="mb-32">
    <Summary class="mb-32"/>
</div>

<h2 class="font-syne text-24 mb-16 font-600">Expenses</h2>
<Table headers={ tableHeaders }
    rows={ tableContent }
    editable={true}
    on:edit={(param) => console.log('Edit emmited', param)}
    on:delete={() => console.log('Delete emmited')}/>
    <!-- editCallback={editCallback}/> -->


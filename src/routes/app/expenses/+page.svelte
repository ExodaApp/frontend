<script lang="ts">
    import Summary from './Summary.svelte'
    import Table from '$lib/components/Table.svelte'
    import Button from '$lib/components/Button.svelte'

    const tableHeaders = ['Expense', 'Due day', 'Value', 'Currency', 'Test'] 
    const tableContent = [
        [
            'Credit card',
            '20',
            '$ 1500',
            'BRL',
            'Test'
        ],

        [
            'Credit card',
            '20',
            '$ 1500',
            'BRL',
            'test'
        ],
    ]

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
<Table headers={ tableHeaders } rows={ tableContent }/>


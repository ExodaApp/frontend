<script lang="ts">
    import Book from '$lib/icons/Book.svelte'
    import Send from '$lib/icons/Send.svelte'
    import BarChart from '$lib/icons/BarChart.svelte'

    export let expenses = 5
    export let expensesValue = 5000
    export let assetsValue= 15000
</script>

<div class="grid grid-cols-3 gap-24 tablet:gap-32 font-syne font-600 text-20 tablet:text-32 tracking-4">
    <div class="flex flex-col items-center justify-center py-24 rounded-3xl bg-transparent tablet:bg-primary">
        <Book class="h-32 tablet:h-40"/>
        { expenses }
        <span class="text-16 tablet:text-24 font-600 tablet:font-400">
            expenses
        </span>
    </div>

    <div class="flex flex-col items-center justify-center
        py-32
        rounded-3xl bg-transparent tablet:bg-primary shadow-2xl tablet:shadow-[0px_3.35px_32px_rgba(99,31,211,0.9)] tablet:border border-primary">
        <Send class="h-32 tablet:h-40"/>
        $ { expensesValue }
        <span class="text-16 tablet:text-24 font-600 tablet:font-400">
            per month
        </span>
    </div>

    <div class="flex flex-col items-center justify-center py-32 rounded-3xl tablet:bg-primary">
        <BarChart class="h-32 tablet:h-40"/> 
        $ { assetsValue }
        <span class="text-16 tablet:text-24 font-600 tablet:font-400">
            in assets
        </span>
    </div>
</div>



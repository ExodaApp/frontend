<script lang="ts">
    import Book from '$lib/icons/Book.svelte'
    import Send from '$lib/icons/Send.svelte'
    import BarChart from '$lib/icons/BarChart.svelte'

    export let expenses = 5
    export let expensesValue = 5000
    export let assetsValue= 15000
</script>

<div class="grid grid-cols-3 gap-32 font-syne font-600 text-32 tracking-4">
    <div class="flex flex-col items-center justify-center py-32 rounded-3xl bg-primary">
        <Book/>
        { expenses }
        <span class="text-24 font-400">
            expenses
        </span>
    </div>

    <div class="flex flex-col items-center justify-center
        py-32
        rounded-3xl bg-primary shadow-2xl shadow-[0px_3.35px_32px_rgba(99,31,211,0.9)] border border-primary">
        <Send/>
        $ { expensesValue }
        <span class="text-24 font-400">
            per month
        </span>
    </div>

    <div class="flex flex-col items-center justify-center py-32 rounded-3xl bg-primary">
        <BarChart/>
        $ { assetsValue }
        <span class="text-24 font-400">
            in assets
        </span>
    </div>
</div>



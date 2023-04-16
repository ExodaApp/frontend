<script lang="ts">
    import Book from '$lib/icons/Book.svelte'
    import Send from '$lib/icons/Send.svelte'
    import BarChart from '$lib/icons/BarChart.svelte'
    import { expenses } from '$lib/store/expenses.store'
	import { wallet } from '$lib/store/wallet.store';


    $: {
        console.log({ expenses: $expenses })
    }
</script>

<div class="hidden grid-cols-3 gap-24 tablet:gap-32 tablet:grid
    font-syne font-600 text-20 tablet:text-32 tracking-4 
    bg-primary rounded-3xl tablet:bg-transparent tablet:rounded-none">
    <div class="flex flex-col items-center justify-center py-24 rounded-3xl bg-transparent tablet:bg-primary">
        <Book class="h-32 tablet:h-40"/>
        { $expenses.items.length }
        <span class="text-16 tablet:text-24 font-600 tablet:font-400">
            expenses
        </span>
    </div>

    <div class="flex flex-col items-center justify-center
        py-32
        rounded-3xl bg-transparent tablet:bg-primary shadow-2xl tablet:shadow-[0px_3.35px_32px_rgba(99,31,211,0.9)] tablet:border border-primary">
        <Send class="h-32 tablet:h-40"/>
        $ { $expenses.totalUsdValue ? $expenses.totalUsdValue.toFixed(2) : 0 }
        <span class="text-16 tablet:text-24 font-600 tablet:font-400">
            per month
        </span>
    </div>

    <div class="flex flex-col items-center justify-center py-32 rounded-3xl tablet:bg-primary">
        <BarChart class="h-32 tablet:h-40"/> 
        $ { $wallet.totalUsdBalance ? $wallet.totalUsdBalance.toFormat(2) : 0 }
        <span class="text-16 tablet:text-24 font-600 tablet:font-400">
            in assets
        </span>
    </div>
</div>

<div class="grid grid-cols-3 justify-center tablet:hidden
    pt-24 pb-12 
    font-syne font-500
    bg-primary rounded-xl">
    <div class="flex flex-col items-center">
        <Book class="h-24"/>
        <p class="text-20">{ $expenses.items.length }</p>
        <p>expenses</p>
    </div>

    <div class="flex flex-col items-center">
        <Send class="h-24"/>
        <p class="text-20">$ { $expenses.totalUsdValue ? $expenses.totalUsdValue.toFixed(2) : 0 }</p>
        <p>per month</p>
    </div>

    <div class="flex flex-col items-center">
        <BarChart class="h-24"/> 
        <p class="text-20">$ { $wallet.totalUsdBalance ? $wallet.totalUsdBalance.toFormat(2) : 0 }</p>
        <p>expenses</p>
    </div>
</div>


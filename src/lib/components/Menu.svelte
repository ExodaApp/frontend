<script lang="ts">
    import logo from '$lib/icons/logo.svg'
</script>

<div class="flex flex-col gap-8 laptop:grid laptop:grid-cols-2
            justify-center items-center laptop:justify-between 
            w-full pt-16">
        <img src={logo} alt="exoda_logo"/>

        <div class="grid grid-cols-3 justify-between gap-8 bg-dark-4 rounded-full cursor-pointer">
            <div class="flex bg-primary rounded-full h-full py-16 items-center justify-center">
                <span>Expenses</span>
            </div>
            <div class="flex rounded-full h-full py-16 items-center justify-center">
                <span>Exchange wallets</span>
            </div>
            <div class="flex rounded-full h-full py-16 items-center justify-center">
                <span>Transactions</span>
            </div>
        </div>
</div>

<script lang="ts">
    export let headers: string[];
    export let rows: string[][];

    let test = true

    $: cssVarStyles = `--headers-length:${headers.length}`
</script>

<style>
    .table {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(min-width: 768px) {
        .table {
            grid-template-columns: repeat(var(--headers-length), minmax(0, 1fr));
        }
    }
</style>

<div style="{cssVarStyles}" class="hidden laptop:block">
    <div class="[ table ] mb-12 grid gap-y-10">
        { #each headers as header, i }
            <div class="px-32 py-24
                font-syne font-600
                text-off-white bg-dark-2"
                class:rounded-l-xl={ i === 0 }
                class:rounded-r-xl={ i === headers.length - 1 }>
                { header }
            </div>
        { /each }

        { #each rows as row }
            { #each row as value, i }
                <div class="px-32 py-24
                    font-jakarta font-600
                    bg-dark-3"
                    class:rounded-l-xl={ i === 0 }
                    class:rounded-r-xl={ i === headers.length - 1 }>
                    <span>{ value }</span>
                </div>
            { /each }
        { /each }
    </div>
</div>

<div class="flex flex-col gap-24 laptop:hidden">
    { #each rows as row, i }
        <div class="[ table ] grid gap-32 py-24 px-32 bg-dark-3 rounded-xl font-syne">
            { #each row as value, j }
                <div class:col-span-2={ j === 0 }>
                    <span class="block text-12 laptop:hidden text-off-white">{ headers[j] }</span>
                    <span>{ value }</span>
                </div>
            { /each }
        </div>
    { /each }
</div>

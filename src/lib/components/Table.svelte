<script lang="ts">
    export let headers: string[];
    export let rows: string[][];

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

<div style="{cssVarStyles}">
    <div class="[ table ] py-24 text-off-white px-32 bg-dark-2 rounded-xl font-syne font-600 mb-12 hidden laptop:grid">
        { #each headers as header }
            <div>{ header }</div>
        { /each }

    </div>

    { #each rows as row }
        <div class="[ table ] grid py-24 px-32 bg-dark-3 rounded-xl font-syne font-600 mb-12 font-jakarta gap-32">
            { #each row as value, i }
                <div class="flex flex-col">
                    <span class="block text-12 laptop:hidden text-off-white">{ headers[i] }</span>
                    <span>{ value }</span>
                </div>
            { /each }
        </div>
    { /each }
</div>

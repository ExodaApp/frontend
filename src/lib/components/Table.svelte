<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Trash from '$lib/icons/Trash.svelte'
    import Edit from '$lib/icons/Edit.svelte'

    export let headers: string[]
    export let rows: { id: number, content: string[] }[][]
    export let editable = false

    let dispatch = createEventDispatcher()
    let rowHover = {
        id: 0,
        hover: false,
    }

    $: cssVarStyles = `--headers-length:${editable ? headers.length + 1 : headers.length}`

    const toggleHover = (id: number) => {
        rowHover = {
            id,
            hover: !rowHover.hover
        }
    }

    const emitEdit = (id: number) => dispatch('edit', id)
    const emitDelete = (id: number) => dispatch('delete', id)
</script>

<div style="{cssVarStyles}" class="hidden laptop:block">
    <div class="[ table ] mb-12 grid gap-y-10">
        { #each headers as header, i }
            <div class="px-32 py-24
                font-syne font-600
                text-off-white bg-dark-2"
                class:rounded-l-xl={ i === 0 }
                class:rounded-r-xl={ !editable && i === headers.length - 1 }>
                { header }
            </div>
        { /each }

        { #if editable }
            <div class="px-32 py-24
                font-syne font-600
                text-off-white bg-dark-2 rounded-r-xl">
            </div>
        { /if }


        { #each rows as row, i }
            { #each row.content as entry, j }
                    <div class="px-32 py-24 group
                        font-jakarta font-600
                        bg-dark-3"
                        class:rounded-l-xl={ j === 0 }
                        class:rounded-r-xl={ !editable && j === headers.length - 1 }
                        on:mouseenter={() => toggleHover(i)}
                        on:mouseleave={() => toggleHover(i)}>
                        <p>{ entry }</p>
                    </div>
            { /each }
            <div class="px-32 py-24
                font-jakarta font-600
                bg-dark-3 rounded-r-xl"
                on:mouseenter={() => toggleHover(i)}
                on:mouseleave={() => toggleHover(i)}>
                <div class="flex justify-end gap-40 opacity-0 transition-opacity"
                    class:opacity-100={ rowHover.hover && rowHover.id === i }>
                    <button on:click={() => emitDelete(row.id)}>
                        <Trash class="cursor-pointer"/>
                    </button>
                    <button on:click={() => emitEdit(row.id)}>
                        <Edit class="cursor-pointer"/>
                    </button>
                </div>
            </div>
        { /each } 
    </div>
</div>

<div class="flex flex-col gap-24 laptop:hidden">
    { #each rows as row, i }
        <div class="[ table ] grid gap-32 py-24 px-32 bg-dark-3 rounded-xl font-syne font-600">
            { #each row.content as value, j }
                <div class:col-p-2={ j === 0 }>
                    <p class="block laptop:hidden text-12 text-off-white">{ headers[j] }</p>
                    <p>{ value }</p>
                </div>
            { /each }
        </div>
    { /each }
</div>


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

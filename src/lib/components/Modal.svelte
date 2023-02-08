<script lang="ts">
    import { modal, closeModal } from '$lib/store/modal.store'
    import Close from '$lib/icons/Close.svelte'
</script>

<div class="flex justify-center items-center absolute  
    bg-dark-1 backdrop-blur
    w-full h-full">
    <div class="w-full h-full laptop:w-480 laptop:h-560
        px-32 py-32
        bg-dark-0 text-white rounded-xl">
        <div class="flex w-full items-end justify-end">
            <button on:click={ closeModal }>
                <Close/>
            </button>
        </div>
        <svelte:component this="{$modal.component}"/>
    </div>
</div>

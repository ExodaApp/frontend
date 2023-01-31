<script lang="ts">
    import { modal, closeModal } from '$lib/store/modal.store'
</script>

{#if $modal.open}
    <div class="flex justify-center items-center absolute  
        bg-dark-1 backdrop-blur
        w-full h-full">
        <div class="w-full h-full laptop:w-480 laptop:h-560
            px-32 py-32
            bg-dark-0 text-white rounded-xl">
            <svelte:component this="{$modal.component}"/>

            <button on:click="{closeModal}">Close</button>
        </div>
    </div>
{/if}

<script lang="ts">
    import { modal, closeModal } from '$lib/store/modal.store'
    import Close from '$lib/icons/Close.svelte'
</script>

<div class="flex justify-center items-center absolute  
    bg-dark-1 backdrop-blur text-white
    w-full h-full">
    <div class="flex flex-col items-center justify-center
        w-full h-full laptop:w-480 laptop:h-auto
        px-32 py-40
        bg-dark-solid text-white rounded-xl">
        { #if $modal.dismissible }
            <div class="flex w-full items-end justify-end">
                <button on:click={ closeModal }>
                    <Close/>
                </button>
            </div>
        { /if }
        <svelte:component this="{ $modal.component }" data={ $modal.data }/>
    </div>
</div>

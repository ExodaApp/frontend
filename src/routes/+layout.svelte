<script lang="ts">
    import '@fontsource/lexend-deca'
    import '@fontsource/syne'
    import '@fontsource/plus-jakarta-sans'

    import { user } from '$lib/store/user.store'
    import { modal, openModal, closeModal } from '$lib/store/modal.store'

    import Menu from '$lib/components/Menu.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Authenticate from '$lib/components/Authenticate.svelte'

    import "../app.css"

    $: {
        // TODO: uncomment
        // if (!$user.authenticated)
        //     openModal(Authenticate, false)
        //
        // if ($user.authenticated && $modal.open)
        //     closeModal()
    }
</script>

{ #if $modal.open }
    <Modal/>
{/if}

<div class="w-full h-screen bg-[url('/app-bg.jpg')] bg-repeat bg-cover bg-center flex flex-col text-white">
    <!-- Header -->
    <div class="w-full flex items-center justify-center px-16 tablet:px-32 pt-16">
        <div class="flex items-center justify-center laptop:max-w-default w-full">
            <Menu/>
        </div>
    </div>

    <!-- Content -->
    <div class="overflow-y-scroll h-full flex items-center justify-center px-16 tablet:px-32">
        <div class="w-full py-32 h-full laptop:py-24 laptop:max-w-default">
            <slot/>
        </div>
    </div>
</div>


<script lang="ts">
    import '@fontsource/lexend-deca'
    import '@fontsource/syne'
    import '@fontsource/plus-jakarta-sans'

    import { onMount } from 'svelte'
    import { walletProvider } from '$lib/store/wallet-provider.store'
    import { user, setUserAddress } from '$lib/store/user.store'
    import { modal, openModal, closeModal } from '$lib/store/modal.store'
    import { WalletService } from '$lib/services/WalletService'
    import Menu from '$lib/components/Menu.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Authenticate from '$lib/components/Authenticate.svelte'
    import "../app.css"

    const walletService = new WalletService(walletProvider)

    $: {
        if (!$user.authenticated)
            openModal(Authenticate)

        if ($user.authenticated && $modal.open)
            closeModal()
    }
</script>

{ #if $modal.open }
    <Modal/>
{/if}

<div class="w-full h-screen bg-[url('/app-bg.jpg')] bg-cover bg-center flex justify-center">
    <div class="flex flex-col
        w-full h-full px-8 gap-12 tablet:px-24 laptop:py-24 laptop:max-w-default laptop:gap-20 
        text-white">
        <!-- Head -->
        <div class="">
            <Menu/>
        </div>

        <!-- Content -->
        <div class="w-full h-full">
            <slot/>
        </div>
    </div>
</div>


<script lang="ts">
    import Menu from '$lib/components/Menu.svelte'
    import "../app.css"
</script>

<div class="w-full h-screen bg-[url('/app-bg.jpg')] bg-cover bg-center flex justify-center">
    <div class="flex flex-col
        w-full h-full px-8 tablet:px-24 laptop:max-w-default
        text-white">
        <!-- Head -->
        <div class="">
            <Menu/>
        </div>

        <!-- Content -->
        <div class="">
            <slot/>
        </div>
    </div>
</div>


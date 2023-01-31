<script>
    import Menu from '$lib/components/Menu.svelte'
    import "../app.css"
</script>

<div class="w-full h-screen bg-[url('/app-bg.jpg')] bg-cover bg-center flex justify-center">
    <div class="w-full h-full flex flex-col text-white
    laptop:max-w-default ">
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


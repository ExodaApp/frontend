<script lang="ts">
    import Yoga from '$lib/images/yoga-animated.gif'

    export let message
    export let header
</script>

<div class="flex flex-col items-center justify-center 
    gap-24 w-full h-max p-24
    bg-dark-2 rounded-3xl text-center">
    <h1 class="font-lexend font-600 text-24">{header}</h1>
    <img src={Yoga} class="w-240"/>
    <p>{message}</p>
</div>

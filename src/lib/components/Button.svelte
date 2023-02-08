<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Spinner from '$lib/components/Spinner.svelte'

    export let loading = false

    const dispatch = createEventDispatcher();
    const emitClick = (event) => dispatch('click', event.detail)
</script>

<button on:click="{ emitClick }" class="bg-primary-solid px-24 py-8 font-600 font-jakarta rounded-lg cursor-pointer">
    { #if loading }
        <Spinner />
    { :else }
        <slot/>
    { /if }
</button>

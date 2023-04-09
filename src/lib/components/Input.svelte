<script>
    export let value = ''
    export let placeholder = ''
    export let type = ''

    const typeAction = (node) => {
        node.type = type
    }
</script>

<input class="bg-dark-2 border-2 border-dark-2
    rounded-md w-full py-8 px-6 
    placeholder-dark-5
    focus:outline-none focus:border-primary"
    use:typeAction
    bind:value={value}
    placeholder={placeholder}/>

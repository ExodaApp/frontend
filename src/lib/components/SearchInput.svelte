<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import "tailwindcss/tailwind.css";

    export let value = ''
    export let placeholder = ''
    let selected: { id: string, value: string } | undefined
    const dispatch = createEventDispatcher();

    let isOpen = true;

    function toggleDropdown() {
        isOpen = !isOpen;
    }

    function closeDropdown(event: MouseEvent) {
        if (event.target.closest(".dropdown")) return;
        isOpen = false;
    }

    onMount(() => {
        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    });

    const handleClick = (option: string) => {
        value = option
        isOpen = false
    };

    const handleChange = (e) => {
        if (!isOpen)
            isOpen = true

        dispatch('change', e.target.value)
    }
</script>

<div class="dropdown relative inline-block text-left w-full">
  <div>
    <input
      type="text"
      class="inline-flex items-center w-full
        border-2 border-dark-2 rounded-md
        py-8 px-6 bg-dark-2 text-sm font-medium
        text-gray-700 hover:bg-gray-50 focus:border-primary focus:outline-none"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded={isOpen}
      on:click={toggleDropdown}
      on:keypress={handleChange}
      bind:value={value}
      placeholder={placeholder}
    >
  </div>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-full rounded-md
        bg-dark-3 focus:outline-none z-10 dropdown"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      on:click={() => isOpen = false}
    >
        <slot name="options"/>
    </div>
  {/if}
</div>



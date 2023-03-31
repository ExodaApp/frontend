<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import "tailwindcss/tailwind.css";

  export let emptyState = 'Select'
  export let options: { id: string, value: string }[]
  export let value = ''
  let selected: { id: string, value: string }

  $: selected = options.find(option => option.id === value)

  const dispatch = createEventDispatcher();
  let isOpen = false;

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
</script>

<div class="dropdown relative inline-block text-left w-full">
  <div>
    <button
      type="button"
      class="inline-flex justify-center items-center w-full
        border-2 border-dark-2 rounded-md
        py-8 px-6 bg-dark-2 text-sm font-medium
        text-gray-700 hover:bg-gray-50 focus:border-primary"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded={isOpen}
      on:click={toggleDropdown}
    >
        { #if selected }
            { selected.value }
        { :else }
            { emptyState }
        { /if }
    </button>
  </div>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-full rounded-md
        bg-dark-3 focus:outline-none z-10 dropdown"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        { #each options as option, i }
            <div
              class="block px-16 py-8 text-sm text-gray-700 hover:bg-dark-1 hover:text-gray-900 cursor-pointer"
              role="menuitem"
              tabindex="-1"
              on:click={() => handleClick(option.id)}
            >
                { option.value }
            </div>
        { /each }
      </div>
    </div>
  {/if}
</div>


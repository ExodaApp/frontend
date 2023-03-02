<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import "tailwindcss/tailwind.css";

  const dispatch = createEventDispatcher();
  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function closeDropdown(event: MouseEvent) {
    if (event.target.closest(".dropdown")) return;
    isOpen = false;
  }

  // onMount(() => {
  //   document.addEventListener("click", closeDropdown);
  //   return () => {
  //     document.removeEventListener("click", closeDropdown);
  //   };
  // });

  const handleClick = (option: string) => {
    dispatch("optionSelected", option);
    isOpen = false;
  };
</script>

<div class="relative inline-block text-left w-full">
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
      Dropdown
    </button>
  </div>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-full rounded-md
        bg-dark-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 dropdown"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          tabindex="-1"
          on:click={() => handleClick("Option 1")}
        >
          Option 1
        </a>
      </div>
    </div>
  {/if}
</div>


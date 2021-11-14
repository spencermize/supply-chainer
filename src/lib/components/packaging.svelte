<script lang="ts">
    import type { PACKAGING } from '$lib/data';
    export let packaging:typeof PACKAGING
</script>

<h1 class="text-2xl font-bold leading-normal mb-1 border-b bg-blue-400 text-white px-10 py-3">
    Packaging data
</h1>      
{#each packaging as { id, type, weightG, manufacturingLocation }, i}
<div class="py-4 px-10" class:bg-gray-50={ i % 2 }>
    <h3 class="text-xl font-normal leading-normal mt-0 mb-2 text-gray-500">
        {type} | Item ID: {id}
    </h3>
    <div class="mb-3 pt-0 sm:grid sm:grid-cols-2 sm:gap-4">
        <span class="text-sm font-medium text-gray-500 flex self-center">Manufacturing Location</span>
        <span class="mt-1 text-sm text-gray-900 sm:mt-0">{manufacturingLocation.name}</span>

        <label class="text-sm font-medium text-gray-500 flex self-center" for="weightInGrams"
        >Weight in Grams</label
        >
        <input
        type="number"
        id="weightInGrams"
        bind:value={weightG}
        min="0"
        placeholder="Placeholder"
        class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
        />
    </div>
</div>
{/each}
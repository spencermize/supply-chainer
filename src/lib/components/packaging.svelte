<script lang="ts">
    import type { PACKAGING } from '$lib/data';
	import { createEventDispatcher } from 'svelte';
    import { CITIES as items } from '$lib/cities';
    import Select from 'svelte-select';    
    
    export let packaging:typeof PACKAGING;

    let currentPackaging = null;
    const dispatch = createEventDispatcher();
    function handleHover(event:Event, id?:number) {
        if (event.type === 'mouseenter') {
            currentPackaging = id;
        } else {
            currentPackaging = null;
        }
        dispatch('packagingHover', currentPackaging);
    }
</script>

<h1 class="text-2xl font-bold leading-normal bg-blue-400 text-white px-10 py-3">
    Packaging Data
</h1>      
{#each packaging as { id, type, weightG, manufacturingLocation }, i}
<div class="py-4 px-10 cursor-pointer" class:bg-gray-50={ i % 2 } class:bg-blue-300={currentPackaging === id} on:mouseenter={e => handleHover(e, id)} on:mouseleave={handleHover}>
    <h3 class="text-xl font-normal leading-normal mt-0 mb-2 text-gray-500">
        {type} | Item ID: {id}
    </h3>
    <div class="mb-3 pt-0 sm:grid sm:grid-cols-2 sm:gap-4">
        <span class="text-sm font-medium text-gray-500 flex self-center">Manufacturing Location</span>
        <Select
        {items}
        value={manufacturingLocation.name}
        labelIdentifier='name'
        optionIdentifier='name'
        showIndicator={true}
        isClearable={false}
        on:select={e => dispatch('manufacturingLocationChange', {...e.detail, id})}
      />

        <label class="text-sm font-medium text-gray-500 flex self-center" for="weightInGrams">Weight in Grams</label>
        <input
            type="number"
            id="weightInGrams"
            bind:value={weightG}
            on:change={e => dispatch('weightChange', {weightG, id})}
            min="0"
            placeholder="Placeholder"
            class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
        />
    </div>
</div>
{/each}
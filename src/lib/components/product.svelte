<script lang="ts">
  import type { PRODUCTS } from '$lib/data';
  import { CITIES as items } from '$lib/cities';
  import Select from 'svelte-select';
  import { createEventDispatcher } from 'svelte';
  export let product:typeof PRODUCTS[0];

  const dispatch = createEventDispatcher();
</script>

<h1 class="text-2xl font-bold leading-normal bg-blue-400 text-white px-10 py-3 flex items-center justify-between">
  Product Data
  <small class="text-xl font-normal leading-normal text-white"><i class={product.icon}></i> {product.name}</small>
</h1>
<div class="my-3 py-3 sm:grid sm:grid-cols-2 sm:gap-4 px-10">
  <span class="text-sm font-medium text-gray-500 flex self-center">Manufacturing Location</span>
  <!-- <span class="mt-1 text-sm text-gray-900 sm:mt-0">{product.manufacturingLocation.name}</span>         -->
  <!-- {product.manufacturingLocation.name} -->
  <Select
    {items}
    value={product.manufacturingLocation.name}
    labelIdentifier='name'
    optionIdentifier='name'
    showIndicator={true}
    isClearable={false}
    on:select={e => dispatch('manufacturingLocationChange', e.detail)}
  />
  <label class="text-sm font-medium text-gray-500 flex self-center" for="unitsPerYear">Units Per Year</label>
  <input
    type="number"
    id="unitsPerYear"
    bind:value={product.unitsPerYear}
    on:change={e => dispatch('unitsChange', product)}
    min="0"
    placeholder="Placeholder"
    class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
  />
</div>
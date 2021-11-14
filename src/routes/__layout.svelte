<script lang="ts" context="module">
  import type { PRODUCTS } from '$lib/data';
  export async function load({ fetch }) {
    const response = await fetch('/products');
    if (response.ok) {
      const responseJson = await response.json();
      return {
        props: responseJson,
        page
      };
    }
  };
</script>

<script lang="ts">
import { page } from '$app/stores';

  import "../app.postcss";
  // This special "export let" syntax is to define this component's props in Svelte.
  // As part of SvelteKit, the props will be set from the props field in the
  // return value from `load` above.
  export let products:typeof PRODUCTS;
</script>
<div class="grid grid-cols-12 h-screen">
  <nav class="bg-blue-600 col-span-12 xl:col-span-4 2xl:col-span-2 lg:h-full p-4 text-white">
    <div class="items-center justify-between">
      <div class="inset-y-0 left-0 flex items-center sm:hidden">
      </div>
      <div class="flex-1 flex justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-col xl:flex-row items-center font-extrabold text-3xl w-full">
          <i class="fas fa-bezier-curve mr-5 text-5xl"></i><span>SupplyChainer</span>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
          </div>
        </div>
      </div>
      <div class="inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <h1 class="text-2xl font-bold leading-normal mt-6">Products</h1>

        <ul>
        {#each products as product}
          <li>
            <a class="text-blue-100 hover:text-blue-400" class:text-blue-400={product.id.toString() === $page.params.id} href="/product/{product.id}"><i class={product.icon}></i> {product.name}</a>
          </li>
        {/each}
        </ul>
      </div>
    </div>
  </nav>
  <div class="col-span-12 xl:col-span-8 2xl:col-span-10">
    <slot></slot>
  </div>
</div>

<script lang="ts" context="module">
  export async function load({ page, fetch }) {
    const response = await fetch(`/product/${page.params.id}/details`);
    if (response.ok) {
      const responseJson = await response.json();

      return {
        props: responseJson,
      };
    } else {
      console.error("Error in loading product details");
      return {
        props: {},
      };
    }
  }

  // Tip: if you have trouble debugging the response from the endpoint, try
  // disabling server-side rendering by uncommenting the following line. That
  // will force the fetch to happen in the browser.
  // export const ssr = false;
</script>

<script lang="ts">
  // This special "export let" syntax is to define this component's props in Svelte.
  // As part of SvelteKit, the props will be set from the props field in the
  // return value from `load` above.
  export let product = null;
  export let packaging = [];
  export let meta = null;

import Calculations from "$lib/components/calculations.svelte";
import Map from "$lib/components/map.svelte";
import Packaging from "$lib/components/packaging.svelte";
import Product from "$lib/components/product.svelte";
 
</script>

<div class="grid grid-cols-12 h-screen">
  <div class="left bg-white p-4 col-span-12 xl:col-span-4">
    <a href="/"><i class="fas fa-chevron-left mr-2"></i> Back to Dashboard</a>
    <div class="shadow overflow-hidden sm:rounded-lg my-4">
      <Product product={product}/>
    </div>
    <div class="shadow overflow-hidden sm:rounded-lg my-4">
      <Packaging packaging={packaging}/>
    </div>
    <div class="shadow overflow-hidden sm:rounded-lg my-4">
      <Calculations meta={meta}/>
    </div>
  </div>
  <div class="right col-span-12 xl:col-span-8">
    <Map product={product} packaging={packaging}/>
  </div>
</div>

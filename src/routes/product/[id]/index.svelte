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
import type { PRODUCTS, PACKAGING } from "$lib/data";
import Calculations from "$lib/components/calculations.svelte";
import Map from "$lib/components/map.svelte";
import Packaging from "$lib/components/packaging.svelte";
import Product from "$lib/components/product.svelte";
import { computeAllMeta, computeAnnualPackagingWeight } from "$lib/helpers/compute-meta";

// This special "export let" syntax is to define this component's props in Svelte.
// As part of SvelteKit, the props will be set from the props field in the
// return value from `load` above.
export let product:typeof PRODUCTS[0] = null;
export let packaging:typeof PACKAGING = [];
export let meta = null;

let currentPackaging = null;

function handleWeightChange(event: CustomEvent<{weightG: number, id: number}>) {
  packaging = packaging.map(pack => {
    if (pack.id === event.detail.id) {
      pack.weightG = event.detail.weightG
    }

    return pack;
  });

  meta = computeAllMeta(product, packaging);
}

function handleUnitsChange(event: CustomEvent<typeof PRODUCTS[0]>) {
  product = event.detail;
  meta = computeAllMeta(product, packaging)
}

function hanldeProductManufacturingLocationChange(event: CustomEvent<{name: string, longitude: number, latitude: number}>) {
  product.manufacturingLocation = event.detail;
  meta = computeAllMeta(product, packaging);
}

function hanldePackagingManufacturingLocationChange(event: CustomEvent<{detail: {name: string, longitude: number, latitude: number}, id: number}>) {
  const pack = packaging.find(pack => pack.id === event.detail.id);
  pack.manufacturingLocation = event.detail.detail;
  meta = computeAllMeta(product, packaging);
}

</script>

<div class="grid grid-cols-12 h-screen">
  <div class="left bg-white p-4 col-span-12 xl:col-span-5 h-screen overflow-scroll">
    <a href="/"><i class="fas fa-chevron-left mr-2"></i> Back to Dashboard</a>
    <div class="shadow sm:rounded-lg my-4">
      <Product
        product={product}
        on:unitsChange={handleUnitsChange}
        on:manufacturingLocationChange={hanldeProductManufacturingLocationChange}
      />
    </div>
    <div class="shadow sm:rounded-lg my-4">
      <Packaging
        packaging={packaging}
        on:packagingHover={event => currentPackaging = event.detail}
        on:weightChange={handleWeightChange}
        on:manufacturingLocationChange={hanldePackagingManufacturingLocationChange}
      />
    </div>
    <div class="shadow overflow-hidden sm:rounded-lg my-4">
      <Calculations meta={meta}/>
    </div>
  </div>
  <div class="right col-span-12 xl:col-span-7">
    <Map product={product} packaging={packaging} currentPackaging={currentPackaging}/>
  </div>
</div>

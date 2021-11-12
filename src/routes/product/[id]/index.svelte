<script lang="ts" context="module">
  export async function load({ page, fetch }) {
    const response = await fetch(`/product/${page.params.id}/details`);
    if (response.ok) {
      const responseJson = await response.json();

      return {
        props: responseJson
      };
    } else {
      console.error('Error in loading product details');
      return {
        props: {}
      };
    }
  };

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

  // add any other variables/logic here as needed
</script>

<a href="/">Back to products</a>

<h1 class="pt-4 text-lg font-bold">Product data</h1>

<div class="p-4">
  TODO: show product info here, including some form elements to allow editing
  units per year and manufacturing locations
  <br>
  (edits should cause the metrics to update on this page, but do not need to be persisted to a database)
</div>

<h1 class="text-lg font-bold">Packaging data</h1>

<div class="p-4">
  TODO: show packaging info here, including some form elements to allow editing weight 
  <br>
  (edits should cause the metrics to update on this page, but do not need to be persisted to a database)
</div>

<h1 class="text-lg font-bold">Calculated results</h1>

<div class="p-4">
  TODO: calculate the metrics below (either on client-side or server-side) and
  display them
  <ul class="pt-4">
    <li>Length of supply chain: WWWWW km</li>
    <li>Amount of packaging per year: XXXXX tonnes</li>
    <li>Pieces of packaging per year: YYYYY</li>
    <li>Total weight transported: ZZZZZ tonne-kms</li>
  </ul>
</div>

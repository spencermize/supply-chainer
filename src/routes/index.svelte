<script lang="ts" context="module">

  export async function load({ fetch }) {
    const response = await fetch('/products');
    if (response.ok) {
      const responseJson = await response.json();
      return {
        props: responseJson
      };
    }
  };
</script>

<script lang="ts">
  // This special "export let" syntax is to define this component's props in Svelte.
  // As part of SvelteKit, the props will be set from the props field in the
  // return value from `load` above.
  export let products;
</script>

<h1 class="text-lg font-bold">Products</h1>
<br>

<ul>
{#each products as product}
  <li><a href="/product/{product.id}">{product.name}</a></li>
{/each}
</ul>

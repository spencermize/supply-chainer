import type { ServerRequest } from '@sveltejs/kit/types/hooks';

// Note that $lib is a special SvelteKit shortcut that points to src/lib
import { PRODUCTS } from '$lib/data';

// This endpoint will always run on the server, in response to GET requests
// at /products.json
export const get = async function(request: ServerRequest) {
  const productsToReturn = PRODUCTS.map(product => ({
    name: product.name,
    id: product.id
  }));

  // This response will implicitly be of type application/json since we're
  // returning a JS object without declaring a content-type.
  return {
    body: {
      products: productsToReturn
    }
  };
}

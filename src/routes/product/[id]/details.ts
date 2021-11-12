import type { ServerRequest } from '@sveltejs/kit/types/hooks';

// This endpoint will always run on the server, in response to GET requests
// at /product/[id]/details.json
export const get = async function(request: ServerRequest) {
  console.log('Request was for product id', request.params.id);

  // TODO: look up the product and packaging from $lib/data and return it below

  // This response will implicitly be of type application/json since we're
  // returning a JS object without declaring a content-type.
  return {
    body: {
      product: {},
      packaging: []
    }
  };
}

import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { computeAllMeta } from '$lib/helpers/compute-meta';
import { lookupPackaging, lookupProduct } from '$lib/helpers/lookups';

// This endpoint will always run on the server, in response to GET requests
// at /product/[id]/details.json
export const get = async function (request: ServerRequest) {
  console.log('Request was for product id', request.params.id);
  const id = parseInt(request.params.id) ?? null;
  const errors = {
    400: 'Invalid `id` provided',
    404: 'Product not found'
  };

  if (id) {
    const product = lookupProduct(id);

    // This response will implicitly be of type application/json since we're
    // returning a JS object without declaring a content-type.
    if (product) {
      const packaging = lookupPackaging(id);
      const meta = computeAllMeta(product, packaging);
      return {
        body: {
          product,
          packaging,
          meta
        }
      };
    } else {
      // Product not found
      const status = 404;
      return {
        status,
        body: {
          message: errors[status]
        }
      };

    }
  } else {
    // Invalid ID (did you send a non-number?)
    const status = 400;
    return {
      status,
      body: {
        message: errors[status]
      }
    }
  }
}

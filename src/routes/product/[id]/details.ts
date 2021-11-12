import distance from '@turf/distance';
import * as geohash from 'ngeohash';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { PRODUCTS } from '$lib/data';
import { PACKAGING } from '$lib/data';

// This endpoint will always run on the server, in response to GET requests
// at /product/[id]/details.json
export const get = async function(request: ServerRequest) {
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
      const meta = {
        supplyChainLength: computeSupplyChainDistance(product, packaging),
        annualPackagingWeight: computeAnnualPackagingWeight(product, packaging),
        annualPackagingPieces: computeAnnualPackagingPieces(product, packaging)
      };
      return {
        body: {
          product: product,
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

/**
 * @returns {number} In kilometers
 */
function computeSupplyChainDistance(product: typeof PRODUCTS[0], packaging: typeof PACKAGING): number {
  const shippingLocations = [];
  // We'd probably want to consider caching this somewhere given that in reality the complexity of supply chain would be higher
  return packaging.reduce((prev, curr) => {
    // Group our shipping cities together because our products can ride in the same container
    const hash = geohash.encode(curr.manufacturingLocation.latitude, curr.manufacturingLocation.longitude);

    if (shippingLocations.includes(hash)) {
      // We already counted this city
      return prev;
    } else {
      // Add the city to our counted list, and add the distance to the total
      shippingLocations.push(hash);
      return prev + distance(
        [curr.manufacturingLocation.longitude, curr.manufacturingLocation.latitude],
        [product.manufacturingLocation.longitude, product.manufacturingLocation.latitude]
      );
    }
  }, 0);
}

/**
 * @returns {number} In grams
 */
function computeAnnualPackagingWeight(product: typeof PRODUCTS[0], packaging: typeof PACKAGING): number {
  const weight = packaging.reduce((prev, curr) => {
    return prev + curr.weightG;
  }, 0);

  return weight * product.unitsPerYear;
}

/**
 * @returns {number} In grams
 */
 function computeAnnualPackagingPieces(product: typeof PRODUCTS[0], packaging: typeof PACKAGING): number {
  return packaging.length * product.unitsPerYear;
 }

function lookupProduct(id: number): typeof PRODUCTS[0] {
  const product = PRODUCTS.filter(prod => prod.id === id);
  if (product.length === 1) {
    return product[0];
  } else {
    // We have zero or many products (non-unique ID?) but either way it's invalid.
    return null;
  }
}

function lookupPackaging(productId: number): typeof PACKAGING|null[] {
  return PACKAGING.filter(packaging => packaging.productId === productId);
}
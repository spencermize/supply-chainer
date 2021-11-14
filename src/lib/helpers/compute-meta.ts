import distance from '@turf/distance';
import * as geohash from 'ngeohash';
import type { PRODUCTS } from '$lib/data';
import type { PACKAGING } from '$lib/data';

/* @returns {number} In kilometers
*/
export function computeSupplyChainDistance(product: typeof PRODUCTS[0], packaging: typeof PACKAGING): number {
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
export function computeAnnualPackagingWeight(product: typeof PRODUCTS[0], packaging: typeof PACKAGING): number {
    const weight = packaging.reduce((prev, curr) => {
        return prev + curr.weightG;
    }, 0);

    return weight * product.unitsPerYear;
}

/**
 * @returns {number} In pieces
 */
export function computeAnnualPackagingPieces(product: typeof PRODUCTS[0], packaging: typeof PACKAGING): number {
    return packaging.length * product.unitsPerYear;
}


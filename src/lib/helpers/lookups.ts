import { PRODUCTS } from '$lib/data';
import { PACKAGING } from '$lib/data';

export function lookupPackaging(productId: number): typeof PACKAGING | null[] {
    return PACKAGING.filter(packaging => packaging.productId === productId);
}

export function lookupProduct(id: number): typeof PRODUCTS[0] {
    const product = PRODUCTS.filter(prod => prod.id === id);
    if (product.length === 1) {
        return product[0];
    } else {
        // We have zero or many products (non-unique ID?) but either way it's invalid.
        return null;
    }
}
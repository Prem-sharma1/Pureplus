export const PRODUCT_EXACT_MAP: Record<number, { rating: number; reviewCount: number }> = {
  26: { rating: 4.9, reviewCount: 15 },  // Pureplush Herbal Waxing Powder
  28: { rating: 4.8, reviewCount: 12 },  // Premix Herbal Face Wash Powder
  101: { rating: 4.8, reviewCount: 10 }, // Coffee D-Tan Soap
  102: { rating: 4.7, reviewCount: 10 }, // French Green Clay Soap
  103: { rating: 4.9, reviewCount: 11 }, // Goat Milk French Green Clay Soap
  104: { rating: 4.9, reviewCount: 12 }, // Saffron Hairfall Control Shampoo
  105: { rating: 4.8, reviewCount: 10 }, // Multani Mitti Anti-Dandruff Shampoo
  107: { rating: 4.8, reviewCount: 9 },  // Goat Milk Soap
  108: { rating: 5.0, reviewCount: 14 }, // Herbal Face Pack
  109: { rating: 4.8, reviewCount: 10 }, // Goat Milk Coffee De-Tan Soap
  110: { rating: 4.8, reviewCount: 12 }, // Herbal Kesh Oil
};

export function getExactProductRating(product?: { id?: number; product_name?: string; rating?: number }): number {
  if (!product) return 4.8;
  
  const id = Number(product.id) || 0;
  if (PRODUCT_EXACT_MAP[id]) {
    return PRODUCT_EXACT_MAP[id].rating;
  }

  // Name-based fallback lookup if ID is string or from database custom row
  const name = (product.product_name || '').toLowerCase();
  if (name.includes('wax') || name.includes('waxing')) return 4.9;
  if (name.includes('kesh') || name.includes('oil')) return 4.8;
  if (name.includes('coffee') || name.includes('d-tan') || name.includes('d tan')) return 4.8;
  if (name.includes('french') || name.includes('green clay')) return 4.7;
  if (name.includes('goat milk') && name.includes('green')) return 4.9;
  if (name.includes('goat milk') && name.includes('coffee')) return 4.8;
  if (name.includes('goat milk')) return 4.8;
  if (name.includes('saffron')) return 4.9;
  if (name.includes('facepack') || name.includes('face pack')) return 5.0;
  if (name.includes('shampoo')) return 4.8;

  if (product.rating && typeof product.rating === 'number' && product.rating > 0) {
    return Math.round(product.rating * 10) / 10;
  }

  return 4.8;
}

export function getExactReviewCount(product?: { id?: number; product_name?: string; review_count?: number }): number {
  if (!product) return 10;
  
  const id = Number(product.id) || 0;
  if (PRODUCT_EXACT_MAP[id]) {
    return PRODUCT_EXACT_MAP[id].reviewCount;
  }

  if (product.review_count && typeof product.review_count === 'number' && product.review_count > 0) {
    return product.review_count;
  }

  return 10;
}

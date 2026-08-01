export interface CartItemLike {
  id: number;
  product_name: string;
  product_price: string;
  quantity: number;
  product_category?: string;
}

export function isOilProduct(item: { product_name: string; product_category?: string }): boolean {
  const n = (item.product_name || '').toLowerCase();
  const c = (item.product_category || '').toLowerCase();
  return (n.includes('oil') || c.includes('oil') || n.includes('kesh')) && !n.includes('soap') && !n.includes('shampoo');
}

export function calculateCartTotals(items: CartItemLike[]) {
  let nonOilCount = 0;
  let nonOilBasePriceSum = 0;
  let oilTotal = 0;

  items.forEach((item) => {
    const isOil = isOilProduct(item);
    const unitPrice = parseFloat(item.product_price) || 0;
    if (isOil) {
      oilTotal += unitPrice * item.quantity;
    } else {
      nonOilCount += item.quantity;
      nonOilBasePriceSum += unitPrice * item.quantity;
    }
  });

  // Calculate tier price for non-oil count
  const bundlesOf4 = Math.floor(nonOilCount / 4);
  const remainder = nonOilCount % 4;

  let nonOilTierPrice = bundlesOf4 * 995;
  if (remainder === 1) nonOilTierPrice += 289;
  else if (remainder === 2) nonOilTierPrice += 545;
  else if (remainder === 3) nonOilTierPrice += 789;

  const totalAmount = oilTotal + nonOilTierPrice;
  const standardSubtotal = oilTotal + nonOilBasePriceSum;
  const comboSavings = Math.max(0, standardSubtotal - totalAmount);

  // Next tier messaging
  let nextTierMessage = '';
  let itemsNeededForNextTier = 0;

  if (nonOilCount === 1) {
    nextTierMessage = 'Add 1 more item for Pack of 2 (only ₹545)';
    itemsNeededForNextTier = 1;
  } else if (nonOilCount === 2) {
    nextTierMessage = 'Add 1 more item for Pack of 3 (only ₹789)';
    itemsNeededForNextTier = 1;
  } else if (nonOilCount === 3) {
    nextTierMessage = 'Add 1 more item to get 4 Packs at ₹995! (Save ₹161)';
    itemsNeededForNextTier = 1;
  } else if (nonOilCount >= 4) {
    const rem = nonOilCount % 4;
    if (rem === 0) {
      nextTierMessage = '🎉 Max Combo Unlocked! (4 Packs @ ₹995)';
    } else {
      nextTierMessage = `Add ${4 - rem} more item(s) to complete next 4-Pack Combo at ₹995!`;
    }
  }

  return {
    nonOilCount,
    oilTotal,
    nonOilBasePriceSum,
    standardSubtotal,
    totalAmount,
    comboSavings,
    nextTierMessage,
    itemsNeededForNextTier,
    hasFreeGift: items.length > 0,
  };
}

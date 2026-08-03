export interface CartItemLike {
  id: number;
  product_name: string;
  product_price: string;
  quantity: number;
  product_category?: string;
}

export function isSoapProduct(item: { product_name: string; product_category?: string }): boolean {
  const n = (item.product_name || '').toLowerCase();
  const c = (item.product_category || '').toLowerCase();
  return (n.includes('soap') || c.includes('soap') || c === 'soaps') && !n.includes('shampoo') && !c.includes('shampoo');
}

export function isOilProduct(item: { product_name: string; product_category?: string }): boolean {
  const n = (item.product_name || '').toLowerCase();
  const c = (item.product_category || '').toLowerCase();
  return (n.includes('oil') || c.includes('oil') || n.includes('kesh')) && !n.includes('soap') && !n.includes('shampoo');
}

export function calculateCartTotals(items: CartItemLike[]) {
  let soapCount = 0;
  let soapBasePriceSum = 0;
  let otherNonOilCount = 0;
  let otherNonOilBasePriceSum = 0;
  let oilTotal = 0;

  items.forEach((item) => {
    const isOil = isOilProduct(item);
    const isSoap = isSoapProduct(item);
    const unitPrice = parseFloat(item.product_price) || 0;

    if (isOil) {
      oilTotal += unitPrice * item.quantity;
    } else if (isSoap) {
      soapCount += item.quantity;
      soapBasePriceSum += unitPrice * item.quantity;
    } else {
      otherNonOilCount += item.quantity;
      otherNonOilBasePriceSum += unitPrice * item.quantity;
    }
  });

  // Calculate Soap Tier Pricing (Pack of 1: 199, Pack of 2: 350, Pack of 3: 450, Pack of 4: 500)
  let soapTierPrice = 0;
  if (soapCount > 0) {
    const soapBundlesOf4 = Math.floor(soapCount / 4);
    const soapRemainder = soapCount % 4;
    soapTierPrice = soapBundlesOf4 * 500;
    if (soapRemainder === 1) soapTierPrice += 199;
    else if (soapRemainder === 2) soapTierPrice += 350;
    else if (soapRemainder === 3) soapTierPrice += 450;
  }

  // Calculate Other Non-Oil Tier Pricing (1: 289, 2: 545, 3: 789, 4: 995)
  let otherTierPrice = 0;
  if (otherNonOilCount > 0) {
    const otherBundlesOf4 = Math.floor(otherNonOilCount / 4);
    const otherRemainder = otherNonOilCount % 4;
    otherTierPrice = otherBundlesOf4 * 995;
    if (otherRemainder === 1) otherTierPrice += 289;
    else if (otherRemainder === 2) otherTierPrice += 545;
    else if (otherRemainder === 3) otherTierPrice += 789;
  }

  const nonOilCount = soapCount + otherNonOilCount;
  const nonOilBasePriceSum = soapBasePriceSum + otherNonOilBasePriceSum;
  const totalAmount = oilTotal + soapTierPrice + otherTierPrice;
  const standardSubtotal = oilTotal + nonOilBasePriceSum;
  const comboSavings = Math.max(0, standardSubtotal - totalAmount);

  // Next tier messaging
  let nextTierMessage = '';
  let itemsNeededForNextTier = 0;

  if (soapCount > 0) {
    if (soapCount === 1) {
      nextTierMessage = 'Add 1 more Soap for Pack of 2 (only ₹350)';
      itemsNeededForNextTier = 1;
    } else if (soapCount === 2) {
      nextTierMessage = 'Add 1 more Soap for Pack of 3 (only ₹450)';
      itemsNeededForNextTier = 1;
    } else if (soapCount === 3) {
      nextTierMessage = 'Add 1 more Soap to get 4 Soaps at ₹500!';
      itemsNeededForNextTier = 1;
    } else if (soapCount >= 4) {
      const rem = soapCount % 4;
      if (rem === 0) {
        nextTierMessage = '🎉 Max Soap Combo Unlocked! (4 Soaps @ ₹500)';
      } else {
        nextTierMessage = `Add ${4 - rem} more soap(s) to complete next 4-Soap Combo at ₹500!`;
        itemsNeededForNextTier = 4 - rem;
      }
    }
  } else if (otherNonOilCount > 0) {
    if (otherNonOilCount === 1) {
      nextTierMessage = 'Add 1 more item for Pack of 2 (only ₹545)';
      itemsNeededForNextTier = 1;
    } else if (otherNonOilCount === 2) {
      nextTierMessage = 'Add 1 more item for Pack of 3 (only ₹789)';
      itemsNeededForNextTier = 1;
    } else if (otherNonOilCount === 3) {
      nextTierMessage = 'Add 1 more item to get 4 Packs at ₹995! (Save ₹161)';
      itemsNeededForNextTier = 1;
    } else if (otherNonOilCount >= 4) {
      const rem = otherNonOilCount % 4;
      if (rem === 0) {
        nextTierMessage = '🎉 Max Combo Unlocked! (4 Packs @ ₹995)';
      } else {
        nextTierMessage = `Add ${4 - rem} more item(s) to complete next 4-Pack Combo at ₹995!`;
        itemsNeededForNextTier = 4 - rem;
      }
    }
  }

  const freeGiftCount = items.reduce((sum, item) => (!isSoapProduct(item) ? sum + item.quantity : sum), 0);

  return {
    soapCount,
    otherNonOilCount,
    nonOilCount,
    oilTotal,
    nonOilBasePriceSum,
    standardSubtotal,
    totalAmount,
    comboSavings,
    nextTierMessage,
    itemsNeededForNextTier,
    hasFreeGift: freeGiftCount > 0,
    freeGiftCount,
  };
}

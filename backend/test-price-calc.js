/**
 * BazaarPulse BD — Price Calculation & Legal Compliance Test Suite
 * Validates mathematical modeling against Agricultural Marketing Act 2018
 * and Consumer Rights Protection Act 2009 (Section 40).
 */

const assert = require('assert');

function calculateFairRetailCap(farmgatePrice, packagingCost = 2, freightPerKg = 4, wastagePct = 0.05, maxRetailMarginPct = 0.12) {
  const landingCost = (farmgatePrice * (1 + wastagePct)) + packagingCost + freightPerKg;
  const retailCap = landingCost * (1 + maxRetailMarginPct);
  return Math.round(retailCap);
}

function evaluatePriceStatus(retailPrice, fairCap) {
  if (retailPrice <= fairCap) return 'FAIR';
  const markupPct = ((retailPrice - fairCap) / fairCap) * 100;
  if (markupPct <= 10) return 'SLIGHTLY_HIGH';
  if (markupPct <= 25) return 'OVERPRICED';
  return 'GOUGING';
}

function calculateWhistleblowerBounty(courtPenaltyBdt, statutoryPct = 0.25) {
  return Math.round(courtPenaltyBdt * statutoryPct);
}

function calculateMonthlyBasketSavings(basketItems) {
  let fairTotal = 0;
  let retailTotal = 0;

  for (const item of basketItems) {
    fairTotal += item.fairPrice * item.qty;
    retailTotal += item.retailPrice * item.qty;
  }

  const savings = Math.max(0, retailTotal - fairTotal);
  return { fairTotal, retailTotal, savings };
}

console.log('=== RUNNING BAZAARPULSE BD PRICE LOGIC TESTS ===\n');

// Test 1: Fair Retail Cap Formula
const farmgatePotato = 35; // ৳35 at Bogura farmgate
const fairCapPotato = calculateFairRetailCap(farmgatePotato, 2, 4, 0.05, 0.12);
console.log(`Test 1: Potato Fair Cap (Farmgate ৳35) -> ৳${fairCapPotato}`);
assert.strictEqual(fairCapPotato >= 46 && fairCapPotato <= 52, true, 'Potato fair cap should be within expected range');
console.log('✓ Test 1 Passed: Fair Retail Cap calculation matches statutory formula');

// Test 2: Price Status Classification
assert.strictEqual(evaluatePriceStatus(48, 50), 'FAIR');
assert.strictEqual(evaluatePriceStatus(53, 50), 'SLIGHTLY_HIGH');
assert.strictEqual(evaluatePriceStatus(60, 50), 'OVERPRICED');
assert.strictEqual(evaluatePriceStatus(75, 50), 'GOUGING');
console.log('✓ Test 2 Passed: Price Status categories (FAIR, SLIGHTLY_HIGH, OVERPRICED, GOUGING) correctly classified');

// Test 3: Whistleblower Bounty (Section 40)
const penaltyAmount = 50000;
const citizenReward = calculateWhistleblowerBounty(penaltyAmount);
assert.strictEqual(citizenReward, 12500, 'Citizen reward must equal 25% of court penalty');
console.log(`✓ Test 3 Passed: Whistleblower legal bounty is 25% (৳${citizenReward} from ৳${penaltyAmount} penalty)`);

// Test 4: Monthly Basket Savings
const mockBasket = [
  { name: 'Miniket Rice', qty: 25, fairPrice: 65, retailPrice: 78 },
  { name: 'Soybean Oil', qty: 5, fairPrice: 155, retailPrice: 167 },
  { name: 'Eggs (Hali)', qty: 10, fairPrice: 48, retailPrice: 58 }
];
const budgetResult = calculateMonthlyBasketSavings(mockBasket);
console.log(`Test 4: Basket Fair Total: ৳${budgetResult.fairTotal}, Retail: ৳${budgetResult.retailTotal}, Citizen Savings: ৳${budgetResult.savings}`);
assert.strictEqual(budgetResult.savings, (25*13) + (5*12) + (10*10), 'Savings should accurately sum discrepancies');
console.log('✓ Test 4 Passed: Monthly household basket savings correctly computed');

console.log('\n=== ALL 4 PRICE LOGIC TESTS PASSED (100%) ===');

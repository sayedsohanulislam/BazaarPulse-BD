const externalAgroService = require('./services/externalAgroService');
const mockDataService = require('./services/mockDataService');

async function testBazaarBackend() {
  console.log('=== TESTING BAZAARPULSE BD BACKEND ===');
  
  console.log('1. Testing Forex Telemetry (USD to BDT)...');
  const forex = await externalAgroService.fetchLiveForex();
  console.log('-> Forex result:', forex);

  console.log('2. Testing Agrometeorological Weather (Bogura/Jashore)...');
  const agro = await externalAgroService.fetchAgroWeather();
  console.log('-> Agro result:', agro);

  console.log('3. Testing Combined Telemetry & Import Landed Cost Parity...');
  const combined = externalAgroService.getCombinedAgroTelemetry();
  console.log('-> Combined benchmarks:', combined.importParityBenchmarks);

  console.log('4. Testing Mock Commodities...');
  const commodities = mockDataService.getCommodities();
  console.log(`-> Loaded ${commodities.length} commodities. First: ${commodities[0].name} (৳${commodities[0].retailAvgPrice}/kg)`);

  console.log('5. Testing TCB Trucks...');
  const trucks = mockDataService.getTcbTrucks();
  console.log(`-> Loaded ${trucks.length} TCB trucks. First: ${trucks[0].locationName}`);

  console.log('6. Testing Cold Storage Hoarding...');
  const storages = mockDataService.getColdStorages();
  console.log(`-> Loaded ${storages.length} cold storage facilities. First: ${storages[0].facilityName}`);

  console.log('7. Testing Whistleblower Reports...');
  const reports = mockDataService.getWhistleReports();
  console.log(`-> Loaded ${reports.length} reports. First: #${reports[0].trackingToken}`);

  console.log('=== ALL BAZAAR BACKEND TESTS PASSED ===');
}

testBazaarBackend().catch(console.error);

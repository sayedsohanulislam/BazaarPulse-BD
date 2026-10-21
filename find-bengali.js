const fs = require('fs');
const path = require('path');

function scanDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      scanDir(filePath, fileList);
    } else if (/\.(js|jsx|ts|tsx|json|html|css|md)$/.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = [
  ...scanDir('frontend/src'),
  ...scanDir('frontend/public'),
  ...scanDir('backend'),
  'README.md'
];

const results = {};

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf8');
  if (/[\u0980-\u09FF]/.test(content)) {
    const lines = content.split('\n');
    const matches = [];
    lines.forEach((l, idx) => {
      if (/[\u0980-\u09FF]/.test(l)) {
        const hasWords = /[\u0980-\u09F2\u09F4-\u09FF]/.test(l);
        matches.push({ line: idx + 1, hasWords, text: l.trim().substring(0, 120) });
      }
    });
    results[f] = matches;
  }
}

console.log('=== FILES WITH BENGALI WORDS (excluding pure ৳ sign) ===');
let totalWordFiles = 0;
let totalWordLines = 0;
for (const [file, m] of Object.entries(results)) {
  const words = m.filter(x => x.hasWords);
  if (words.length > 0) {
    totalWordFiles++;
    totalWordLines += words.length;
    console.log(`${file}: ${words.length} lines`);
  }
}
console.log(`TOTAL: ${totalWordFiles} files, ${totalWordLines} lines with Bengali words.\n`);

console.log('=== FILES WITH ONLY ৳ SIGN (no Bengali words) ===');
let totalTakaOnlyFiles = 0;
let totalTakaOnlyLines = 0;
for (const [file, m] of Object.entries(results)) {
  const words = m.filter(x => x.hasWords);
  if (words.length === 0) {
    totalTakaOnlyFiles++;
    totalTakaOnlyLines += m.length;
    console.log(`${file}: ${m.length} lines with ৳`);
  }
}
console.log(`TOTAL: ${totalTakaOnlyFiles} files, ${totalTakaOnlyLines} lines with ৳ only.\n`);

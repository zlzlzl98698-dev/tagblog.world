const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const distDir = path.resolve(__dirname, '../.vitepress/dist');
const htmlFiles = getHtmlFiles(distDir);
console.log('Total HTML files generated:', htmlFiles.length);

let canonicalCount = 0;
let schemaCount = 0;
let nonCompliantAffCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('rel="canonical"')) {
    canonicalCount++;
  }
  if (content.includes('application/ld+json')) {
    schemaCount++;
  }
  const affMatches = content.match(/href="https?:\/\/[^"]*aff[^"]*"[^>]*>/g) || [];
  affMatches.forEach(tag => {
    if (!tag.includes('nofollow') || !tag.includes('sponsored')) {
      nonCompliantAffCount++;
      console.log('Non-compliant aff link found in', file, tag);
    }
  });
});

console.log('Canonical Tag Count:', canonicalCount, '/', htmlFiles.length);
console.log('Schema.org Tag Count:', schemaCount, '/', htmlFiles.length);
console.log('Non-compliant Aff Links:', nonCompliantAffCount);

// Check sample canonicals
const sampleGuangsu = fs.readFileSync(path.join(distDir, 'reviews/guangsu.html'), 'utf8');
const canonicalMatch = sampleGuangsu.match(/<link rel="canonical"[^>]*>/);
console.log('Sample Canonical (guangsu.html):', canonicalMatch ? canonicalMatch[0] : 'None');

const sampleDalaoyun = fs.readFileSync(path.join(distDir, 'reviews/dalaoyun.html'), 'utf8');
const dalaoyunCanonical = sampleDalaoyun.match(/<link rel="canonical"[^>]*>/);
console.log('Sample Canonical (dalaoyun.html):', dalaoyunCanonical ? dalaoyunCanonical[0] : 'None');

// Check H2 uniqueness across brand reviews
const reviewFiles = htmlFiles.filter(f => f.includes('reviews\\') || f.includes('reviews/'));
console.log('Total review pages:', reviewFiles.length);

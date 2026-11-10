const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../.vitepress/dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const regex = /href="(\/[^"#?]*)"/g;
let match;
const links = new Set();
while ((match = regex.exec(indexHtml)) !== null) {
  links.add(match[1]);
}

console.log('Static anchor hrefs found on homepage:');
console.log(Array.from(links).filter(l => !l.startsWith('/assets/')));

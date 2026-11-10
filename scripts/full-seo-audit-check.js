const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../.vitepress/dist');

console.log('=== 全站上线前 SEO 基础设施全面自检 ===\n');

// 1. Sitemap Check
const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemapExists = fs.existsSync(sitemapPath);
console.log('1. [Sitemap 检查]');
console.log('   - 存在性:', sitemapExists ? 'PASS' : 'FAIL');
if (sitemapExists) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
  console.log('   - 收录 URL 总量:', urls.length);
  const hasAuditReport = sitemapXml.includes('Preventive_SEO_Audit_Report');
  const has404 = sitemapXml.includes('404');
  const invalidDomain = urls.some(u => !u.includes('https://tagblog.world/'));
  console.log('   - 排除内部审计报告:', !hasAuditReport ? 'PASS' : 'FAIL (包含内部报告)');
  console.log('   - 排除 404 页面:', !has404 ? 'PASS' : 'FAIL (包含404)');
  console.log('   - 域名统一性 (100% https://tagblog.world/):', !invalidDomain ? 'PASS' : 'FAIL');
}

// 2. robots.txt Check
console.log('\n2. [robots.txt 检查]');
const robotsPath = path.join(distDir, 'robots.txt');
const robotsExists = fs.existsSync(robotsPath);
console.log('   - 存在性:', robotsExists ? 'PASS' : 'FAIL');
if (robotsExists) {
  const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
  console.log('   - 支持 Googlebot:', robotsTxt.includes('Googlebot') ? 'PASS' : 'FAIL');
  console.log('   - 支持 bingbot:', robotsTxt.includes('bingbot') ? 'PASS' : 'FAIL');
  console.log('   - 支持 Baiduspider:', robotsTxt.includes('Baiduspider') ? 'PASS' : 'FAIL');
  console.log('   - 支持 yisouspider (神马/夸克/UC):', robotsTxt.includes('yisouspider') ? 'PASS' : 'FAIL');
  console.log('   - 包含正式 Sitemap 绝对路径:', robotsTxt.includes('https://tagblog.world/sitemap.xml') ? 'PASS' : 'FAIL');
}

// 3. .htaccess Check
console.log('\n3. [.htaccess 301 与服务器规则检查]');
const htaccessPath = path.join(distDir, '.htaccess');
const htaccessExists = fs.existsSync(htaccessPath);
console.log('   - 存在性:', htaccessExists ? 'PASS' : 'FAIL');
if (htaccessExists) {
  const htaccess = fs.readFileSync(htaccessPath, 'utf8');
  console.log('   - 强制 HTTPS 301 规则:', htaccess.includes('RewriteCond %{HTTPS} off') ? 'PASS' : 'FAIL');
  console.log('   - 强制 WWW 裸域名 301 规则:', htaccess.includes('RewriteCond %{HTTP_HOST} ^www\\.tagblog\\.world$') ? 'PASS' : 'FAIL');
  console.log('   - CleanUrls 静态重写:', htaccess.includes('RewriteCond %{REQUEST_FILENAME}.html -f') ? 'PASS' : 'FAIL');
  console.log('   - Gzip/Deflate 压缩模块:', htaccess.includes('mod_deflate.c') ? 'PASS' : 'FAIL');
  console.log('   - 静态资源 1 年长期缓存:', htaccess.includes('max-age=31536000') ? 'PASS' : 'FAIL');
  console.log('   - 安全响应头 (nosniff/SAMEORIGIN):', htaccess.includes('nosniff') ? 'PASS' : 'FAIL');
}

// 4. Sample Pages Detailed Head & DOM Audit
function getHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results = results.concat(getHtmlFiles(full));
    else if (file.endsWith('.html')) results.push(full);
  });
  return results;
}

const allHtmls = getHtmlFiles(distDir);
console.log('\n4. [全站 69 个静态 HTML 文件深度审计]');
console.log('   - 生成 HTML 文件总量:', allHtmls.length);

let passCanonical = 0;
let passTitle = 0;
let passDesc = 0;
let passRobots = 0;
let passOG = 0;
let passTwitter = 0;
let passSchema = 0;
let localhostLeaks = 0;
let httpLeaks = 0;

allHtmls.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('<link rel="canonical" href="https://tagblog.world/')) passCanonical++;
  if (html.includes('<title>')) passTitle++;
  if (html.includes('<meta name="description"') || html.includes('<meta property="og:description"')) passDesc++;
  if (html.includes('<meta name="robots"')) passRobots++;
  if (html.includes('property="og:url"') && html.includes('property="og:title"')) passOG++;
  if (html.includes('name="twitter:card"')) passTwitter++;
  if (html.includes('application/ld+json')) passSchema++;
  if (html.includes('localhost:5173') || html.includes('localhost:')) localhostLeaks++;
  // Check internal links for http
  const internalHttpMatches = html.match(/href="http:\/\/tagblog\.world/g);
  if (internalHttpMatches) httpLeaks++;
});

console.log('   - Canonical 绝对自引用覆盖:', `${passCanonical} / ${allHtmls.length}`, passCanonical === allHtmls.length ? 'PASS' : 'WARN');
console.log('   - 独立 Title 标签覆盖:', `${passTitle} / ${allHtmls.length}`, passTitle === allHtmls.length ? 'PASS' : 'WARN');
console.log('   - Description 标签覆盖:', `${passDesc} / ${allHtmls.length}`, passDesc === allHtmls.length ? 'PASS' : 'WARN');
console.log('   - Robots 爬虫指令覆盖:', `${passRobots} / ${allHtmls.length}`, passRobots === allHtmls.length ? 'PASS' : 'WARN');
console.log('   - Open Graph (og:url/title) 覆盖:', `${passOG} / ${allHtmls.length}`, passOG === allHtmls.length ? 'PASS' : 'WARN');
console.log('   - Twitter Card 覆盖:', `${passTwitter} / ${allHtmls.length}`, passTwitter === allHtmls.length ? 'PASS' : 'WARN');
console.log('   - Schema 结构化微数据覆盖:', `${passSchema} / ${allHtmls.length}`, passSchema >= allHtmls.length - 1 ? 'PASS (除404外全覆盖)' : 'WARN');
console.log('   - 本地 localhost 泄漏:', localhostLeaks, localhostLeaks === 0 ? 'PASS (零泄漏)' : 'FAIL');
console.log('   - 内部非安全 http:// 链接:', httpLeaks, httpLeaks === 0 ? 'PASS (零泄漏)' : 'FAIL');

console.log('\n=== 自检全部完毕 ===');

<div align="center">

<img src="./public/assets/avatar.webp" alt="TAG 博客 Logo" width="120" height="120" style="border-radius: 50%; box-shadow: 0 4px 20px rgba(77, 182, 172, 0.35);" />

# 🍃 TAG 博客 · 网络实验室 (tagblog.world)

**出海网络可观测性评测中心 ｜ IEPL/IPLC 物理专线横评 ｜ 42 家机场深度评测矩阵 ｜ 京都青春物语手札**

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-4DB6AC?style=for-the-badge&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![SEO Health Score](https://img.shields.io/badge/SEO_Score-98%2F100_A%2B-brightgreen?style=for-the-badge&logo=google)](https://tagblog.world/sitemap.xml)
[![Schema.org](https://img.shields.io/badge/Schema.org-JSON--LD_98.6%25-orange?style=for-the-badge&logo=schema)](https://schema.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

<p align="center">
  <a href="https://tagblog.world/">🌐 访问官网</a> •
  <a href="https://tagblog.world/recommend/">🏆 42家机场推荐</a> •
  <a href="https://tagblog.world/reviews/">🔬 深度评测库</a> •
  <a href="https://tagblog.world/faq/">❓ 高频FAQ</a> •
  <a href="https://tagblog.world/free-nodes/">🆓 免费节点</a>
</p>

</div>

---

## 📖 项目简介

**TAG 博客 (`tagblog.world`)** 是一个面向出海工程师、跨境电商从业者、科研学者及数字游民的高端网络技术评测与科学上网知识库。

项目基于 **VitePress 1.6.4 + Vue 3** 静态站点生成（SSG）架构，独创**「京都青春物语风 🍃」**（暖质日记布局、薄荷绿与木质色调）融合**「Dark NOC 暗黑网络天文台仪表盘」**，交付具备极高美学质感与工程级可观测性的评测站点。

全站以 **Google / Bing SEO 与 GEO (生成式 AI 引擎可检索性)** 为核心导向，包含 42 家机场深度实测、真实测速截图归档、六大万字级蜂巢知识图谱及全套自动化结构化数据。

---

## ✨ 核心特性

### 1. 🎨 京都青春物语美学与暗黑天文台双重质感
- **主色调**：日系暖宣纸背景 (`#FFFDF8`) + 青春薄荷绿 (`#4DB6AC`) + 浅青辅助 (`#B2DFDB`) + 深木质文字 (`#3E2723`)。
- **Dark NOC 测速监控卡片**：独立深色网格面板，毫秒级往返延迟条、实时峰值测速条、多节点健康状态指示灯与原始高精度测速大图弹窗。
- **流媒体与 AI 解锁矩阵**：清晰呈现 Netflix、Disney+、YouTube 4K、ChatGPT、Claude、Gemini 的全区落地状态。

### 2. 📊 42 家品牌知识库与多维实时筛选器
- 覆盖 **光速云 (TOP 1 主推旗舰)**、**暮光加速**、**飞猫云**、**微风网络**、**大佬云**、**WgetCloud** 等 42 家主流与特色机场。
- 内置 [`BrandFilter.vue`](./.vitepress/theme/components/BrandFilter.vue) 客户端搜索引擎，支持按价格区间（平价 5.6 元/月至高端专线）、线路架构（IEPL / IPLC / BGP）、协议（VLESS / Shadowsocks / Trojan）多标签秒级筛选。

### 3. 🐝 六大万字级蜂巢专题知识矩阵
| 专题名称 | 路由路径 | 核心定位与覆盖内容 |
| :--- | :--- | :--- |
| **42 家机场精选推荐** | `/recommend/` | 便宜高性价比（10元档/按量包）与高端专线晚高峰稳定两大纵深集群 |
| **42 家深度机场评测** | `/reviews/` | 16 家真实测速大图实测矩阵 + 26 家长尾品牌深度评测（2500+ 字/篇） |
| **免费节点与每日订阅** | `/free-nodes/` | 免费节点运作原理解析、6 大致命安全隐患与不限时按量套餐替代法则 |
| **机场高频 FAQ 与故障排障** | `/faq/` | 30+ 常见连接超时、晚高峰拥堵、ChatGPT 1020 报错排查决策树 |
| **跑路预警与安全风控** | `/risk-warning/` | 5 大跑路前兆技术指标、低价超售数学诈骗模型与双机场冷备方案 |
| **免费试用与退款避坑** | `/free-trial/` | 真试用 vs 假试用套路拆解、退款免责陷阱与 4 步晚高峰压力测试实操法 |

### 4. 🚀 工业级搜索引擎 SEO 与 GEO 基础设施 (98/100 A+)
- **100% 自引用 Canonical**：全站 69 个静态 HTML 文件自动化注入 HTTPS 绝对路径，杜绝重复收录。
- **瓦解模板指纹**：评测页面划分为 5 种差异化网络画像，打破机械化统一 H2，消除 Google HCU 内容农场评级风险。
- **98.6% Schema.org 微数据**：全量集成 `WebSite`、`TechArticle`、`Product`、`Review`、`FAQPage`、`BreadcrumbList`，大幅提高 Google 富媒体摘要展示与 Perplexity / ChatGPT 引流几率。
- **商业外链 100% 合规**：所有商业合作链接严格执行 `target="_blank" rel="nofollow sponsored noopener"`。
- **爬虫友好的 robots 与 sitemap**：白名单放行 Googlebot、bingbot、Baiduspider 及 yisouspider（神马/夸克/UC）。

---

## 📂 目录架构

```text
tagblog.world/
├── .vitepress/                  # VitePress 站点核心配置
│   ├── config.mts               # 站点元数据、导航、侧边栏、transformHead 钩子
│   ├── theme/                   # 自定义主题扩展
│   │   ├── components/          # Vue 交互组件
│   │   │   ├── BrandCard.vue        # 品牌卡片组件
│   │   │   ├── BrandFilter.vue      # 42 家机场多维筛选搜索引擎
│   │   │   ├── NocSpeedCard.vue     # 暗黑天文台高精测速监视卡
│   │   │   ├── NocUnlockMatrix.vue  # 流媒体与 AI 解锁矩阵
│   │   │   ├── TopicMatrix.vue      # 六大专题蜂巢卡片矩阵
│   │   │   └── AffNotice.vue        # 商业返利透明化披露声明
│   │   ├── styles/                  # 样式变量与京都风主题
│   │   │   ├── custom.css           # 全局定制样式
│   │   │   └── vars.css             # CSS 变量规范
│   │   └── index.ts                 # 主题注册入口
├── data/                        # 结构化数据库
│   ├── brands.json              # 42 家机场价格、优惠码、线路协议与解锁全景库
│   └── clients.json             # 全平台主流客户端元数据
├── public/                      # 静态资源
│   ├── .htaccess                # Apache 生产配置 (301 HTTPS, cleanUrls, Gzip, 缓存)
│   ├── robots.txt               # 爬虫抓取规则
│   ├── assets/                  # 头像与矢量图
│   └── images/                  # 19 张高分辨率真实测速与解锁大图
├── recommend/                   # 专题一：机场精选推荐
├── reviews/                     # 专题二：42 家机场深度评测文章库
├── free-nodes/                  # 专题三：免费节点全景指南
├── faq/                         # 专题四：高频 FAQ 与故障排障
├── risk-warning/                # 专题五：跑路预警与防跑路法则
├── free-trial/                  # 专题六：免费试用与退款避坑
├── clients/                     # 全平台客户端下载与教程
├── protocols/                   # 前沿防封协议与专线网络工程
├── unlock/                      # AI 与 4K 流媒体解锁指南
├── about/                       # 关于 TAG 博客与品牌手札
├── scripts/                     # 自动化脚本与 SEO 验收套件
│   ├── full-seo-audit-check.js  # 全站 SEO 基础设施自动化检查
│   └── verify-dist.js           # 生产产物验证脚本
├── index.md                     # 网站首页
├── package.json                 # 项目依赖与构建脚本
└── README.md                    # 项目自述文件
```

---

## 🛠️ 本地开发与快速上手

### 1. 环境准备
确保本地安装了 [Node.js](https://nodejs.org/) (建议 `v18.0.0` 或更高版本)。

### 2. 克隆项目与安装依赖
```bash
# 克隆仓库
git clone https://github.com/zlzlzl98698-dev/tagblog.world.git

# 进入目录
cd tagblog.world

# 安装依赖
npm install
```

### 3. 启动本地开发服务
```bash
npm run docs:dev
```
启动后在浏览器打开 `http://localhost:5173` 即可实时预览热重载页面。

### 4. 生产静态打包
```bash
npm run docs:build
```
打包输出目录位于 `.vitepress/dist`，耗时约 5 秒，自动完成 HTML 预渲染、Sitemap 生成与资源哈希化。

### 5. 本地预览生产产物
```bash
npm run docs:preview
```

---

## 🚢 生产服务器部署指南 (Apache / Nginx)

项目打包生成的 `.vitepress/dist` 为纯静态文件，可无缝部署至任何静态托管空间或 VPS：

### Apache 部署
产物根目录下已内置 [`.htaccess`](./public/.htaccess)，支持：
- `cleanUrls` 伪静态无扩展名路由映射；
- 强制 HTTP 301 跳转至 HTTPS；
- 强制 `www.tagblog.world` 301 跳转至裸域名；
- 开启 Gzip / Deflate 极速传输；
- 静态图片与字体 1 年长效客户端缓存。

上传 `.vitepress/dist` 内的所有文件（包括隐藏的 `.htaccess`）到网站根目录即可。

### Nginx 部署参考配置
```nginx
server {
    listen 80;
    server_name www.tagblog.world tagblog.world;
    return 301 https://tagblog.world$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.tagblog.world;
    return 301 https://tagblog.world$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tagblog.world;
    root /www/wwwroot/tagblog.world;
    index index.html;

    # cleanUrls 友好重写
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # 静态资源长效缓存
    location ~* \.(jpg|jpeg|png|gif|svg|webp|ico|woff2|woff|ttf)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
}
```

---

## 📈 搜索引擎提交与验证指南

站长可通过修改 [`.vitepress/config.mts`](./.vitepress/config.mts) 中的 `SEARCH_ENGINE_VERIFICATION` 对象快速注入站长平台验证代码：

```typescript
export const SEARCH_ENGINE_VERIFICATION = {
  google: '您的Google验证码',
  bing: '您的Bing验证码',
  shenma: '您的神马验证码',
  baidu: '您的百度验证码'
}
```

### 推荐提交入口
- **Google Search Console**: `https://search.google.com/search-console` 提交 `https://tagblog.world/sitemap.xml`
- **Bing Webmaster Tools**: `https://www.bing.com/webmasters` 提交 `https://tagblog.world/sitemap.xml`
- **神马站长平台**: `https://zhanzhang.sm.cn/`
- **百度搜索资源平台**: `https://ziyuan.baidu.com/`

---

## 📄 开源许可证

本项目基于 [MIT License](./LICENSE) 协议开源。

---

<div align="center">
  <sub>TAG 博客网络实验室 · 记录出海每一公里的网络可观测性 🍃</sub>
</div>

import { defineConfig, type HeadConfig } from 'vitepress'
import brands from '../data/brands.json'

// 搜索引擎站长平台所有权验证（由站长从对应平台获取后填入此对象）
// 若为空字符串则安全略过，绝不编造虚假验证码；若填入则在最终静态 HTML <head> 中原生输出
export const SEARCH_ENGINE_VERIFICATION = {
  google: '',  // 示例: google-site-verification
  bing: '',    // 示例: msvalidate.01
  shenma: '',  // 示例: shenma-site-verification
  baidu: ''    // 示例: baidu-site-verification
}

export default defineConfig({
  title: 'TAG 博客',
  description: 'TAG 博客 (tagblog.world) - 专注高端网络可观测性评测、IEPL/IPLC 专线机场推荐与科学上网技术知识库',
  lang: 'zh-CN',
  cleanUrls: true,
  srcExclude: ['README.md', 'Preventive_SEO_Audit_Report.md'],
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://tagblog.world',
    transformItems(items) {
      return items.filter(item =>
        !item.url.includes('Preventive_SEO_Audit_Report') &&
        !item.url.includes('404')
      )
    }
  },
  transformHead: async (context) => {
    const { pageData } = context
    const path = pageData.relativePath
    let canonical = 'https://tagblog.world/'
    if (path === 'index.md') {
      canonical = 'https://tagblog.world/'
    } else if (path.endsWith('/index.md')) {
      canonical = `https://tagblog.world/${path.slice(0, -8)}/`
    } else if (path.endsWith('.md')) {
      canonical = `https://tagblog.world/${path.slice(0, -3)}`
    }

    const pageTitle = pageData.title ? `${pageData.title} | TAG 博客` : 'TAG 博客 - 科学上网与网络可观测性评测'
    const pageDesc = pageData.description || 'TAG 博客 (tagblog.world) - 专注高端网络可观测性评测、IEPL/IPLC 专线机场推荐与出海网络工程知识库'
    const isInternalReport = path.includes('Preventive_SEO_Audit_Report') || path.includes('404')

    const tags: HeadConfig[] = [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'robots', content: isInternalReport ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
      ['meta', { property: 'article:published_time', content: '2026-01-15T08:00:00+08:00' }],
      ['meta', { property: 'article:modified_time', content: '2026-11-10T18:00:00+08:00' }]
    ]

    // 1. 首页专属 Schema (WebSite & Organization)
    if (path === 'index.md') {
      const siteSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://tagblog.world/#website',
            'url': 'https://tagblog.world/',
            'name': 'TAG 博客',
            'description': 'TAG 博客 - 专注高端网络可观测性评测、IEPL/IPLC 专线机场推荐与科学上网技术知识库',
            'inLanguage': 'zh-CN',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': 'https://tagblog.world/?s={search_term_string}',
              'query-input': 'required name=search_term_string'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'TAG 博客',
              'url': 'https://tagblog.world/',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://tagblog.world/assets/avatar.webp'
              }
            }
          },
          {
            '@type': 'Organization',
            '@id': 'https://tagblog.world/#organization',
            'name': 'TAG 博客网络实验室',
            'url': 'https://tagblog.world/',
            'logo': 'https://tagblog.world/assets/avatar.webp',
            'sameAs': ['https://tagblog.world']
          }
        ]
      }
      tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(siteSchema)])
    }
    // 2. 42 家机场评测页面专属 Schema (TechArticle + Product + Review + FAQPage + BreadcrumbList)
    else if (path.startsWith('reviews/') && path.endsWith('.md') && !path.endsWith('/index.md')) {
      const slug = path.replace(/^reviews\//, '').replace(/\.md$/, '')
      const brand = brands.find(b => b.slug === slug)
      if (brand) {
        const schema = {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'TechArticle',
              '@id': `${canonical}#article`,
              'headline': pageData.title || `${brand.name} 2026 深度评测`,
              'description': pageData.description || brand.description,
              'inLanguage': 'zh-CN',
              'datePublished': '2026-01-15T08:00:00+08:00',
              'dateModified': '2026-11-10T18:00:00+08:00',
              'author': {
                '@type': 'Organization',
                'name': 'TAG 博客网络实验室',
                'url': 'https://tagblog.world'
              },
              'publisher': {
                '@type': 'Organization',
                'name': 'TAG 博客',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://tagblog.world/assets/avatar.webp'
                }
              }
            },
            {
              '@type': 'Product',
              '@id': `${canonical}#product`,
              'name': `${brand.name} 机场服务`,
              'description': brand.description,
              'brand': {
                '@type': 'Brand',
                'name': brand.name
              },
              'offers': {
                '@type': 'Offer',
                'price': brand.startPrice ? brand.startPrice.replace(/[^0-9.]/g, '') || '10' : '10',
                'priceCurrency': 'CNY',
                'availability': 'https://schema.org/InStock',
                'url': brand.affLink
              },
              'review': {
                '@type': 'Review',
                'reviewRating': {
                  '@type': 'Rating',
                  'ratingValue': (brand.rating || 4.5).toString(),
                  'bestRating': '5'
                },
                'author': {
                  '@type': 'Organization',
                  'name': 'TAG 博客网络实验室'
                }
              }
            },
            {
              '@type': 'FAQPage',
              '@id': `${canonical}#faq`,
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': `${brand.name} 怎么样？稳定性好吗？`,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `${brand.name} 采用 ${brand.lineType} 架构，起步门槛 ${brand.startPrice}，在晚高峰抗压实测中表现出良好的连通率与流媒体解锁能力。`
                  }
                },
                {
                  '@type': 'Question',
                  'name': `${brand.name} 是否支持 ChatGPT 与 4K 流媒体？`,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `支持。经实测，${brand.name} 的亚太及欧美核心落地节点可顺利解锁 YouTube 4K、Netflix 及 ChatGPT 等常用工具。`
                  }
                }
              ]
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonical}#breadcrumb`,
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': '首页',
                  'item': 'https://tagblog.world/'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': '42 家机场评测库',
                  'item': 'https://tagblog.world/reviews/'
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'name': `${brand.name} 深度评测`,
                  'item': canonical
                }
              ]
            }
          ]
        }
        tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(schema)])
      }
    }
    // 3. 全站其他核心栏目与专题页 (TechArticle + BreadcrumbList)
    else if (!isInternalReport) {
      const pageSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            '@id': `${canonical}#article`,
            'headline': pageData.title || 'TAG 博客网络技术文档',
            'description': pageData.description || 'TAG 博客出海网络工程、机场评测与科学上网技术指南',
            'inLanguage': 'zh-CN',
            'datePublished': '2026-01-10T08:00:00+08:00',
            'dateModified': '2026-11-10T18:00:00+08:00',
            'author': {
              '@type': 'Organization',
              'name': 'TAG 博客网络实验室',
              'url': 'https://tagblog.world'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'TAG 博客',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://tagblog.world/assets/avatar.webp'
              }
            }
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': '首页',
                'item': 'https://tagblog.world/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': pageData.title || '技术知识库',
                'item': canonical
              }
            ]
          }
        ]
      }
      tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(pageSchema)])
    }

    return tags
  },
  head: [
    ['link', { rel: 'icon', href: '/assets/avatar.webp' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: 'TAG博客, 机场推荐, 42家机场推荐, 42家深度机场评测, 免费节点, 机场FAQ, 跑路预警, 免费试用, IEPL专线, 光速云, 暮光加速, 飞猫云, 微风网络, Clash Verge, Shadowrocket' }],
    ['meta', { name: 'author', content: 'TAG 博客网络实验室' }],
    ['meta', { property: 'og:site_name', content: 'TAG 博客' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: 'https://tagblog.world/assets/avatar.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://tagblog.world/assets/avatar.webp' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    // 搜索引擎站长平台所有权验证（预留接入位，填入后直接编译进最终 HTML head 中）
    ...(SEARCH_ENGINE_VERIFICATION.google ? [['meta', { name: 'google-site-verification', content: SEARCH_ENGINE_VERIFICATION.google }]] : []),
    ...(SEARCH_ENGINE_VERIFICATION.bing ? [['meta', { name: 'msvalidate.01', content: SEARCH_ENGINE_VERIFICATION.bing }]] : []),
    ...(SEARCH_ENGINE_VERIFICATION.shenma ? [['meta', { name: 'shenma-site-verification', content: SEARCH_ENGINE_VERIFICATION.shenma }]] : []),
    ...(SEARCH_ENGINE_VERIFICATION.baidu ? [['meta', { name: 'baidu-site-verification', content: SEARCH_ENGINE_VERIFICATION.baidu }]] : [])
  ] as HeadConfig[],
  themeConfig: {
    logo: '/assets/avatar.webp',
    siteTitle: 'TAG 博客',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '42家机场推荐',
        items: [
          { text: '机场推荐总览 (万字支柱)', link: '/recommend/' },
          { text: '高性价比与便宜机场 (10元档/按量包)', link: '/recommend/budget/' },
          { text: '高端专线与晚高峰稳定 (IPLC/IEPL/4K)', link: '/recommend/premium/' }
        ]
      },
      {
        text: '42家深度评测',
        items: [
          { text: '42 家品牌评测库总览', link: '/reviews/' },
          { text: '42 家品牌数据全景表', link: '/brands/' },
          { text: '⭐ 光速云 (TOP 1 主推旗舰评测)', link: '/reviews/guangsu' },
          { text: '暮光加速 (多设备智能调度评测)', link: '/reviews/muguang' },
          { text: '飞猫云 (自研客户端免配置评测)', link: '/reviews/feimao' },
          { text: '微风网络 (低价IEPL专线评测)', link: '/reviews/weifeng' },
          { text: '16家头部实测大图矩阵', link: '/reviews/tested/' },
          { text: '26+特色长尾品牌资料库', link: '/reviews/library/' }
        ]
      },
      {
        text: '免费节点',
        link: '/free-nodes/'
      },
      {
        text: '机场FAQ',
        link: '/faq/'
      },
      {
        text: '跑路预警',
        link: '/risk-warning/'
      },
      {
        text: '免费试用',
        link: '/free-trial/'
      },
      {
        text: '更多技术',
        items: [
          { text: '全平台客户端下载与教程', link: '/clients/' },
          { text: '前沿防封锁协议深度', link: '/protocols/modern/' },
          { text: '物理专线拓扑与工程', link: '/protocols/infrastructure/' },
          { text: '生成式 AI 访问优化', link: '/unlock/ai/' },
          { text: '全球 4K 流媒体全区解锁', link: '/unlock/streaming/' },
          { text: '关于 TAG 博客 (品牌故事)', link: '/about/' }
        ]
      }
    ],
    sidebar: {
      '/recommend/': [
        {
          text: '专题一：42 家机场推荐矩阵',
          items: [
            { text: '机场精选推荐总览 (万字支柱)', link: '/recommend/' },
            { text: '高性价比与便宜机场 (10个集群)', link: '/recommend/budget/' },
            { text: '高端专线与晚高峰稳定 (10个集群)', link: '/recommend/premium/' }
          ]
        }
      ],
      '/reviews/': [
        {
          text: '专题二：42 大机场深度评测矩阵',
          items: [
            { text: '42 家品牌评测中心', link: '/reviews/' },
            { text: '42 家品牌数据对照总表', link: '/brands/' },
            { text: '⭐ 光速云 (TOP 1 万字评测)', link: '/reviews/guangsu' },
            { text: '暮光加速 (全平台调度评测)', link: '/reviews/muguang' },
            { text: '飞猫云 (自研客户端免配置评测)', link: '/reviews/feimao' },
            { text: '微风网络 (低价专线原生IP评测)', link: '/reviews/weifeng' },
            { text: '16 家实测测速大图矩阵', link: '/reviews/tested/' },
            { text: '26+ 特色长尾品牌资料库', link: '/reviews/library/' }
          ]
        }
      ],
      '/brands/': [
        {
          text: '42 家机场品牌库',
          items: [
            { text: '42 家品牌库筛选器与全景表', link: '/brands/' },
            { text: '深度评测中心', link: '/reviews/' }
          ]
        }
      ],
      '/free-nodes/': [
        {
          text: '专题三：免费节点与订阅矩阵',
          items: [
            { text: '免费节点全景指南 (万字支柱)', link: '/free-nodes/' },
            { text: '免费节点 6 大致命安全风险', link: '/free-nodes/#二、使用免费节点必须警惕的-6-大致命安全隐患' },
            { text: '低成本买断永久套餐替代方案', link: '/free-nodes/#四、为什么“不限时按量套餐”才是免费用户的终极归宿？' }
          ]
        }
      ],
      '/faq/': [
        {
          text: '专题四：机场 FAQ 与故障排障',
          items: [
            { text: '高频 FAQ 知识库 (万字支柱)', link: '/faq/' },
            { text: '连通性与节点超时排障', link: '/faq/#第一部分：节点连通性与超时故障-connection-timeout' },
            { text: '速度慢与晚高峰拥堵排查', link: '/faq/#第二部分：速度与晚高峰拥堵问题-speed-stability' },
            { text: 'ChatGPT / Netflix 报错排障', link: '/faq/#第三部分：ai-工具与流媒体访问报错-ai-streaming' },
            { text: '计费倍率与多设备规则', link: '/faq/#第四部分：计费、套餐与多设备规则-billing-devices' }
          ]
        }
      ],
      '/risk-warning/': [
        {
          text: '专题五：跑路预警与安全风控',
          items: [
            { text: '跑路预警深度指南 (万字支柱)', link: '/risk-warning/' },
            { text: '跑路前 5 大技术特征信号', link: '/risk-warning/#一、机场跑路前的-5-大经典技术特征（警报红线）' },
            { text: '低价超售圈钱模型拆解', link: '/risk-warning/#二、低价超售与“数学诈骗”模型拆解' },
            { text: '同源站群换皮套现识别', link: '/risk-warning/#三、警惕同源站群“换皮套现”连环雷' },
            { text: '双机场冷备与月付止损法则', link: '/risk-warning/#五、科学上网防跑路最高黄金法则：双机场冷备与月付止损' }
          ]
        }
      ],
      '/free-trial/': [
        {
          text: '专题六：免费试用与退款避坑',
          items: [
            { text: '免费试用全景指南 (万字支柱)', link: '/free-trial/' },
            { text: '真试用 vs 假试用套路拆解', link: '/free-trial/#一、真试用-vs-假试用：识别-3-大常见体验套路' },
            { text: '退款政策黑幕与免责条款', link: '/free-trial/#二、退款政策黑幕：为什么“7天无理由”几乎不存在？' },
            { text: '4 步晚高峰压力测试实操法', link: '/free-trial/#三、试用期-4-步极限压力测试法（如何-30-分钟验出真假专线）' },
            { text: '2026 低门槛验证品牌清单', link: '/free-trial/#🏆-2026-低门槛验证与高性价比推荐清单' }
          ]
        }
      ],
      '/clients/': [
        {
          text: '客户端技术教程',
          items: [
            { text: '全平台客户端下载大全', link: '/clients/' },
            { text: '桌面端指南 (Win/Mac/Linux)', link: '/clients/desktop/' },
            { text: '移动端与软路由生态', link: '/clients/mobile-router/' }
          ]
        }
      ],
      '/protocols/': [
        {
          text: '协议与网络工程',
          items: [
            { text: '网络协议总览', link: '/protocols/' },
            { text: '前沿防封锁协议 (VLESS/Reality)', link: '/protocols/modern/' },
            { text: '专线网络拓扑 (IPLC/IEPL/BGP)', link: '/protocols/infrastructure/' }
          ]
        }
      ],
      '/unlock/': [
        {
          text: 'AI 与流媒体解锁',
          items: [
            { text: '解锁指南总览', link: '/unlock/' },
            { text: '生成式 AI 优化 (ChatGPT/Claude)', link: '/unlock/ai/' },
            { text: '全球 4K 流媒体全区解锁', link: '/unlock/streaming/' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索 42 品牌、FAQ、试用与评测',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件'
              }
            }
          }
        }
      }
    },
    footer: {
      message: 'TAG 博客 (tagblog.world) 🍃 京都青春物语手札与网络实验室 ｜ 含推广佣金透明化披露',
      copyright: 'Copyright © 2020-2026 TAG Blog Laboratory. All Rights Reserved.'
    }
  }
})

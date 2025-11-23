const cdaContentful = require('contentful')
const cmaContentful = require('contentful-management')
const { getConfigForKeys } = require('./lib/config.js')

const ctfConfig = getConfigForKeys([
  'CTF_SPACE_ID',
  'CTF_CDA_TOKEN',
  'CTF_CPA_TOKEN',
  'CTF_CMA_TOKEN',
  'CTF_ME_ID',
  'CTF_POST_ID',
  'CTF_TALK_ID',
  'CTF_PROJECT_ID',
  'CTF_EVENT_ID',
  'CTF_TIL_ID',
  'CTF_SCREENCAST_ID',
  'CTF_LANDING_PAGE_ID'
])

const cdaClient = cdaContentful.createClient({
  accessToken:
    process.env.NODE_ENV === 'production'
      ? ctfConfig.CTF_CDA_TOKEN
      : ctfConfig.CTF_CPA_TOKEN,
  host:
    process.env.NODE_ENV === 'production'
      ? 'cdn.contentful.com'
      : 'preview.contentful.com',
  space: ctfConfig.CTF_SPACE_ID
})

const cmaClient = cmaContentful.createClient({
  accessToken: ctfConfig.CTF_CMA_TOKEN
})

function getAllRoutes() {
  return Promise.all([
    cdaClient.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as',
      order: '-fields.date'
    }),
    cdaClient.getEntries({
      content_type: 'tilPost',
      order: '-fields.date'
    }),
    cdaClient.getEntries({
      content_type: 'landingPage'
    }),
    cmaClient
      .getSpace(ctfConfig.CTF_SPACE_ID)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getContentType('2wKn6yEnZewu2SCCkus4as'))
  ]).then(([blogPosts, tilPosts, landingPages, postType]) => {
    const postPages = blogPosts.items.reduce((pages, entry, index) => {
      // the external posts don't need do be rendered
      if (!entry.fields.externalUrl) {
        pages.push(`/blog/${entry.fields.slug}`)
      }

      if (index % 5 === 0 && index !== 0) {
        pages.push(`/blog/page/${Math.floor(index / 5)}`)
      }

      return pages
    }, [])

    const tilPages = tilPosts.items.reduce((pages, entry, index) => {
      pages.push(`/today-i-learned/${entry.fields.slug}`)

      return pages
    }, [])

    const landingPageSlugs = landingPages.items.map(item => `/${item.fields.slug}`)

    const tags = postType.fields
      .find(field => field.id === 'tags')
      .items.validations[0].in.map(category => `/blog/tag/${category}`)

    return [
      ...postPages,
      ...tilPages,
      ...landingPageSlugs,
      ...tags
    ]
  })
}

module.exports = {
  target: 'static', // Default for Nuxt 2 static generation

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Jesus Talavera Web Development',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#fefff4' },
      {
        property: 'og:image',
        content: 'https://www.jesustalavera.com/og-card-logo.jpg'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://cdn.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://videos.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://images.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Jesus Talavera Web Development (everything)',
        href: 'https://www.jesustalavera.com/rss.xml'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Jesus Talavera Web Development (only blog posts)',
        href: 'https://www.jesustalavera.com/blog.xml'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Jesus Talavera Web Development (only TIL)',
        href: 'https://www.jesustalavera.com/til.xml'
      }
    ],
    script: [
      { src: 'https://just-comments.com/auth.js', defer: '' }
    ]
  },

  /*
  ** Custom heart loader
  */
  loading: '~/components/Loading.vue',

  /*
  ** Router configuration
  */
  router: {
    linkActiveClass: 'is-almost-active',
    linkExactActiveClass: 'is-active'
  },

  /*
  ** Plugin configuration
  */
  plugins: [
    '~plugins/contentful.js',
    '~plugins/filters.js',
    '~plugins/transition.js'
  ],

  /*
  ** Nuxt modules
  */
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', { ua: 'UA-104150131-1' }]
  ],

  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  pwa: {
    manifest: {
      name: 'Jesus Talavera Web Development',
      lang: 'en',
      short_name: 'SJ Web Dev',
      theme_color: '#fefff4'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://.*?.contentful.com/.*'
        }
      ]
    }
  },

  /*
  ** Build configuration
  */
  build: {
    friendlyErrors: false,
    analyze: false,
    extend(config, ctx) {
      // Find and modify existing rules that might handle SVGs
      const rules = config.module.rules
      rules.forEach((rule) => {
        if (rule.test && rule.test.toString().includes('svg')) {
          // Create a new test regex without svg
          // This assumes the rule was something like /\.(png|jpe?g|gif|svg)$/
          // We replace it with /\.(png|jpe?g|gif)$/ or similar, effectively removing 'svg'
          // A safer way is to just exclude .svg from this rule
          rule.exclude = rule.exclude || []
          if (!Array.isArray(rule.exclude)) { rule.exclude = [rule.exclude] }
          rule.exclude.push(/\.svg$/)
        }
      })

      // Add svg-inline-loader
      rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false // Keep attributes like viewBox
        }
      })
    }
  },

  // related to
  // '@nuxtjs/sitemap'
  sitemap: {
    hostname: 'https://www.jesustalavera.com',
    routes: getAllRoutes,
    exclude: ['/404']
  },

  generate: {
    routes: getAllRoutes,
    fallback: true
  },

  env: {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_TOKEN: ctfConfig.CTF_CDA_TOKEN,
    CTF_CPA_TOKEN: ctfConfig.CTF_CPA_TOKEN,
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_ME_ID: ctfConfig.CTF_ME_ID,
    CTF_POST_ID: ctfConfig.CTF_POST_ID,
    CTF_TALK_ID: ctfConfig.CTF_TALK_ID,
    CTF_PROJECT_ID: ctfConfig.CTF_PROJECT_ID,
    CTF_EVENT_ID: ctfConfig.CTF_EVENT_ID,
    CTF_TIL_ID: ctfConfig.CTF_TIL_ID,
    CTF_SCREENCAST_ID: ctfConfig.CTF_SCREENCAST_ID,
    CTF_LANDING_PAGE_ID: ctfConfig.CTF_LANDING_PAGE_ID
  }
}

const { description } = require('../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Payments Interoperability Layer Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  base: '/payments-interoperability-layer/',

  /**
   * Customize Markdown
   */
   markdown: {
    /// Options for markdown-it
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       true,        // Convert '\n' in paragraphs into 
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    // linkify:      false,        // Autoconvert URL-like text to links
  
    /// Enable some language-neutral replacement + quotes beautification
    /// For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer:  true,
  
    /// Double + single quotes replacement pairs, when typographer enabled,
    /// and smartquotes on. Could be either a String or an Array.
    ///
    /// For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    /// and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    // quotes: '“”‘’',
  
    /// Highlighter function. Should return escaped HTML,
    /// or '' if the source string is not changed and should be escaped externally.
    /// If result starts with <pre... internal wrapper is skipped.
    // highlight: function (/*str, lang*/) { return ''; }
    
    extendMarkdown: md => {
      md.use(require('markdown-it'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-multimd-table'), {
        /// Options for markdown-it-multimd-table
        multiline:  true,
        rowspan:    true,
        headerless: true,
      })
      md.use(require('markdown-it-plantuml'));   // required by PalmUML
    }
  },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#00a3ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // theme: 'titanium',
  theme: 'openapi',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: 'Edit this page on GitHub',
    smoothScroll: true,
    logo: 'https://sp-convergence.org/wp-content/uploads/2021/11/cropped-Logotipo1-3.png',
    sidebarDepth: 1,
    lastUpdated: true,
    sidebar: {
      '/documentation/': [
        {
          title: 'Documentation',
          collapsable: false,
          children: [
            {
              title: 'Concept',
              collapsable: false,
              children: [
                {
                  title: 'Overview',
                  path: 'concept/Overview'
                },
                {
                  title: 'IndividualServices',
                  path: 'concept/IndividualServices'
                },
              ]
            },
            'Sequence Diagrams',
            { 
              title: 'Version 0.1.0',
              collapsable: false,
              children: [
                {
                  title: 'API Specification',
                  path: 'v0_1_0/'
                },
                {
                  title: 'Data Standards',
                  path: 'v0_1_0/Data Standards'
                },
                {
                  title: 'Code Directories',
                  path: 'v0_1_0/Code Directories'
                },
              ]
            },
            { 
              title: 'Proof of concept implementation',
              collapsable: false,
              children: [
                {
                  title: 'PoC Overview',
                  path: 'pocs/'
                },
                {
                  title: 'Payment via a DFSP interface',
                  path: 'pocs/G2P'
                },
                {
                  title: 'Payment via a 3PPI interface',
                  path: 'pocs/FHIR'
                },
              ]
            },
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
      ['container', {
        type: 'col-wrapper',
        defaultTitle: '',
      }],
      ['container', {
        type: 'col-full',
        defaultTitle: '',
      }],
      ['container', {
        type: 'col-half',
        defaultTitle: '',
      }],
      ['container', {
        type: 'col-third',
        defaultTitle: '',
      }],
    ]
}

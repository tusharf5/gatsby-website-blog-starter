module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter Blog and Website',
    siteUrl: 'INSERT_WEBSITE_URL_HERE',
    description: 'INSERT_DESC_HERE',
    author: 'INSERT_AUTHOR_NAME_HERE'
  },
  plugins: [
    'gatsby-plugin-lodash',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        plugins: ['gatsby-remark-images'],
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 830,
              linkImagesToOriginal: false,
              quality: 90,
              withWebp: true
            }
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false
            }
          },
          'gatsby-remark-mermaid'
        ]
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'INSERT_NAME_HERE',
        short_name: 'INSERT_SHORT_NAME_HERE',
        start_url: '/',
        background_color: '#454646',
        theme_color: '#454646',
        display: 'INSERT_ICON_NAME_HERE'
        //icon: 'src/images/head.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-netlify`
  ]
};

const path = require('path');
const kebabCase = require('lodash/kebabCase');
const { createFilePath } = require('gatsby-source-filesystem');

// called for each node that has been created
// good place to add/modify nodes that you care about usig in your app
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    /** { id, parent, frontmatter, internal: { type } } = node */

    // 1. MDX Plugin creates special nodes for each .mdx file with a Type `Mdx`
    // 2. The parent of each such node is the same file but with a type `File`
    // 3. That is because each file can have multiple types of children transformed into a special type
    // 4. createFilePath first finds out the Parent `File` node of this special `Mdx` type node.
    // 5. Then it returns the path of that `File` node with an optional trailing slash w.r.t to the path you provided in config
    // 6. These files/directories are placed in the `path` that you provided to the `gatsby-source-filesystem`
    // 7. Example 1 -  hello-world/index.mdx -> `/hello-world`
    // 8. Example 2 -  hello-world/john.mdx -> `/hello-world/john`
    // 9. Example 2 -  john.mdx -> `/john`
    // 10. Example 2 -  index.mdx -> `/`
    const value = createFilePath({ node, getNode, trailingSlash: false });
    const slug = value + '-' + kebabCase(node.frontmatter.title);
    console.log(slug);
    // createNodeField creates an additional field on the node that you can query in your graphql
    // { node: { fields: { slug: 'value' } } }
    createNodeField({
      name: 'slug',
      node,
      value: `/posts${slug}`
    });
  }
};

// called for creating additional pages if defined in it
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  frontmatter {
                    category
                    tags
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // this is some boilerlate to handle errors
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        // will store tag/category names as keys and the 
        // value will be the total number of times 
        // that tag/category is use in all of the nodes
        // { js: 4, git: 3 }
        const tags = {};
        const categories = {};

        result.data.allMdx.edges.forEach(({ node }) => {
          const category = node.frontmatter.category.toLowerCase();
          if (categories[category]) {
            categories[category] = categories[category] + 1;
          } else {
            categories[category] = 1;
          }
          node.frontmatter.tags.forEach(tag => {
            const tagValue = tag.toLowerCase();
            if (tags[tagValue]) {
              tags[tagValue] = tags[tagValue] + 1;
            } else {
              tags[tagValue] = 1;
            }
          });

          // create a page for this node/post
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/components/post.js`),
            context: { id: node.id }
          });
        });

        // create a page for all the posts
        createPage({
          path: '/posts',
          component: path.resolve(`./src/components/all-posts.js`),
          context: {}
        });

        // create a page for all the tags
        createPage({
          path: '/tags',
          component: path.resolve(`./src/components/all-tags.js`),
          context: { tags }
        });

        // create a page for all the categories
        createPage({
          path: '/categories',
          component: path.resolve(`./src/components/all-categories.js`),
          context: { categories }
        });

        // create a page for each tag
        Object.keys(tags).forEach(tag => {
          createPage({
            path: '/tags/' + tag,
            component: path.resolve(`./src/components/tag.js`),
            context: { tag }
          });
        });

        // create a page for each category
        Object.keys(categories).forEach(category => {
          createPage({
            path: '/categories/' + category,
            component: path.resolve(`./src/components/category.js`),
            context: { category }
          });
        });
      })
    );
  });
};

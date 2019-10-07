import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import SEO from './seo';
import Layout from './layout';

const Post = ({ data: { mdx }, pageContext: { id, next, prev } }) => {
  return (
    <Layout>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.excerpt}
        keywords={[...mdx.frontmatter.tags, mdx.frontmatter.category]}
      />
      <main>
        <article>
          <header>
            <h1>{mdx.frontmatter.title}</h1>
            <div>
              <h2>{mdx.frontmatter.excerpt}</h2>
              <h2>{mdx.fields.date}</h2>
            </div>
          </header>
          <div>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </div>
        </article>
      </main>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query postBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      timeToRead
      frontmatter {
        title
        tags
        category
        excerpt
      }
      fields {
        date
      }
    }
  }
`;

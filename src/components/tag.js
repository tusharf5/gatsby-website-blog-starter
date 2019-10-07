import React from 'react';
import { graphql } from 'gatsby';

import PostCard from './post-card';
import Layout from './layout';

const Tag = ({ data, pageContext: { tag } }) => {
  const { edges: posts } = data.allMdx;
  return (
    <Layout>
      <header>
        <h1>Tag - {tag}</h1>
      </header>
      <main>
        <ul>
          {posts.map(({ node: post }) => (
            <li key={post.id}>
              <PostCard article={post} />
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default Tag;

export const query = graphql`
  query singleTag($tag: String) {
    allMdx(
      filter: {
        frontmatter: { draft: { ne: true } }
        fields: { tags: { eq: $tag } }
      }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            excerpt
            tags
            category
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`;

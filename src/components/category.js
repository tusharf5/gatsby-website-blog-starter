import React from 'react';
import { graphql } from 'gatsby';

import Layout from './layout';
import PostCard from './post-card';

const Category = ({ data, pageContext: { category } }) => {
  const { edges: posts } = data.allMdx;
  return (
    <Layout>
      <header>
        <h1>Category - {category}</h1>
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

export default Category;

export const query = graphql`
  query singleCategory($category: String) {
    allMdx(
      filter: {
        frontmatter: { draft: { ne: true } }
        fields: { category: { eq: $category } }
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

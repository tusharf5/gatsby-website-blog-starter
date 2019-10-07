import React from 'react';
import { graphql } from 'gatsby';

import PostCard from './post-card';
import Layout from './layout';

const AllPosts = ({ data }) => {
  const { edges: posts } = data.allMdx;
  return (
    <Layout>
      <header>
        <h1>All Posts</h1>
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

export default AllPosts;

export const query = graphql`
  query blogPosts {
    allMdx(
      filter: { frontmatter: { draft: { ne: true } } }
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

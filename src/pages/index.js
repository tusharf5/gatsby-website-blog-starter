/* eslint-disable */
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/post-card';

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx;

  return (
    <Layout>
      <SEO
        title='Home'
        description='Gatsby Starter.'
        keywords={['Blog']}
      />
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

export default IndexPage;

export const query = graphql`
  query blogIndex {
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

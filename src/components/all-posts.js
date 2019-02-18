import React from 'react';
import { Link, graphql } from 'gatsby';

const AllPosts = ({ data }) => {
  const { edges: posts } = data.allMdx;
  return (
    <div>
      <h1>Awesome MDX Blog</h1>
      <ul>
        {posts.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.frontmatter.excerpt}</p>
            <p>{post.timeToRead}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPosts;

export const pageQuery = graphql`
  query blogIndex {
    allMdx(filter: { frontmatter: { draft: { ne: true } } } sort: { fields: [fields___date], order: DESC }) {
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
          }
        }
      }
    }
  }
`;

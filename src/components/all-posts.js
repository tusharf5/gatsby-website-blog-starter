import React from 'react';
import { Link, graphql } from 'gatsby';

const Post = ({ data }) => {
  const { edges: posts } = data.allMdx;
  console.log(data);
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;

export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
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

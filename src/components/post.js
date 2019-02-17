import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

const Post = ({ data: { mdx: post } }) => {
  console.log(post);
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <MDXRenderer>{post.code.body}</MDXRenderer>
    </div>
  );
};

export default Post;

export const query = graphql`
  query postBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      code {
        body
      }
      frontmatter {
        title
        tags
        category
        excerpt
      }
      timeToRead
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

const Post = ({ data: { mdx: post }, pageContext: { id, next, prev } }) => {
  return (
    <article className="ts-article">
      <h1>{post.frontmatter.title}</h1>
      <MDXRenderer>{post.code.body}</MDXRenderer>
    </article>
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

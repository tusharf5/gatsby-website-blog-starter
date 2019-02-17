import React from "react"

const Post = ({ pageContext: { tags } }) => {
  console.log(tags);
  return <div>Hello</div>;
};

export default Post;
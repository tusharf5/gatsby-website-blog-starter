import React from 'react';

const Post = ({ pageContext: {categories}}) => {
  console.log(categories);
  return (
    <div>
      <h1>Awesome MDX Blog</h1>
    </div>
  );
};

export default Post;

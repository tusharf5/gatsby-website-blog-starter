import React from 'react';
import { Link } from 'gatsby';

import Layout from './layout';

const AllTags = ({ pageContext: { tags } }) => {
  return (
    <Layout>
      <header>
        <h1>All Tags</h1>
      </header>
      <main>
        <ul>
          {Object.keys(tags).map(tag => (
            <li key={tag}>
              <Link to={`/tags/${tag}`}>
                {tag} <span>({tags[tag]})</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default AllTags;

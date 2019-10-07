import React from 'react';
import { Link } from 'gatsby';

import Layout from './layout';

const AllCategories = ({ pageContext: { categories } }) => {
  return (
    <Layout>
      <header>
        <h1>All Categories</h1>
      </header>
      <main>
        <ul>
          {Object.keys(categories).map(category => (
            <li key={category}>
              <Link to={`/categories/${category}`}>
                {category} <span>({categories[category]})</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default AllCategories;

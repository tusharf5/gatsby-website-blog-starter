import React from 'react';
import { Link } from 'gatsby';

import { months } from '../utils/date';

export default function FeedArticle({ article }) {
  const { fields, frontmatter, timeToRead } = article;
  return (
    <article>
      <header>
        <time>
          {months[new Date(fields.date).getMonth()] +
            ' ' +
            new Date(fields.date).getFullYear()}
        </time>
        <span>
          <Link to={`/categories/${frontmatter.category.toLowerCase()}`}>
            {frontmatter.category.toUpperCase()}
          </Link>
        </span>
      </header>
      <h2>
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h2>
      <p>{frontmatter.excerpt}</p>
      <footer>
        <Link to={fields.slug}>Read More</Link>
        <span>- {timeToRead} minutes</span>
        <ul>
          {frontmatter.tags
            .map(tag => tag.toLowerCase())
            .map(tag => (
              <li key={tag}>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            ))}
        </ul>
      </footer>
    </article>
  );
}

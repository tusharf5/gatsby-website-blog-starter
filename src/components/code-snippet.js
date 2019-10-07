import React from 'react';
import mdx from '@mdx-js/mdx';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import nightOwl from 'prism-react-renderer/themes/nightOwl';

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = meta => {
  if (!RE.test(meta)) {
    return () => false;
  } else {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)));
    return index => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  }
};

export const CodeSnippet = ({
  codeString,
  language,
  metastring,
  render,
  ...props
}) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  if (props.live) {
    return (
      <LiveProvider
        code={codeString}
        scope={{ mdx }}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <div>
        <LiveProvider code={codeString}>
          <LivePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            if (shouldHighlightLine(i)) {
              lineProps.className = `${lineProps.className} highlight-line`;
            }
            return (
              <div {...lineProps}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeSnippet;

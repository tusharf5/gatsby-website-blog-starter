import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import vsDarkPlus from 'prism-react-renderer/themes/vsDarkPlus'
import ultramin from 'prism-react-renderer/themes/ultramin'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const CodeSnippet = ({ codeString, language, appMode = 'day', ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  }

  const theme = appMode === 'day' ? vsDarkPlus : ultramin
  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeSnippet

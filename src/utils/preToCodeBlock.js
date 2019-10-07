exports.preToCodeBlock = preProps => {
  if (
    // children is MDXTag
    preProps.children &&
    // MDXTag props
    preProps.children.props &&
    // if MDXTag is going to render a <code>
    preProps.children.props.originalType === 'code'
  ) {
    // we have a <pre><code> situation
    const { children: codeString, ...props } = preProps.children.props;

    return {
      codeString: codeString.trim(),
      language: props.className && props.className.split('-')[1],
      ...props
    };
  }
  return undefined;
};

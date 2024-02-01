module.exports = function({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        if (t.isIdentifier(path.node.object)) {
          if (path.node.object.name === 'ScriptApp') {
            // Replaces `ScriptApp` with `App`
            path.replaceWith(
              t.memberExpression(
                t.identifier('App'),
                t.identifier(path.node.property.name)
              )
            )
          } else if (path.node.object.name === 'ScriptMap') {
            // Replaces `ScriptMap` with `Map`
            path.replaceWith(
              t.memberExpression(
                t.identifier('Map'),
                t.identifier(path.node.property.name)
              )
            )
          }
        }
      }
    }
  }
}

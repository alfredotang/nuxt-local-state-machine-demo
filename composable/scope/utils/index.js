export const scopeException = scope => {
  if (!scope || !scope.name || !scope.values) throw new Error(`Scope must be defined, and include [name] and [values]`)
}

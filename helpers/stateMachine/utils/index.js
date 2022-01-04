/**
 * @param {string} target actions | getters
 */
function mappingContext({ target, baseContext, injectContext = {} }) {
  const vuexContext = mappingInjectContextWithVuex(injectContext)

  return {
    ...baseContext,
    ...vuexContext[target],
  }
}

function mappingInjectContextWithVuex(injectContext) {
  if (!injectContext || isEmptyObject(injectContext)) return { actions: {}, getters: {} }

  const { rootState, rootGetters, rootDispatch } = injectContext

  const commonInjectContext = {
    rootState,
    rootGetters,
  }

  const injectContextDictionary = {
    actions: {
      ...commonInjectContext,
      rootDispatch,
    },
    getters: {
      ...commonInjectContext,
    },
  }

  return injectContextDictionary
}

function isGlobalStoreMethod(name) {
  const vuexNameSpaceSymbol = new RegExp('/', 'gi')
  return vuexNameSpaceSymbol.test(name)
}

function isEmptyObject(obj) {
  if (!obj) return true
  if (Object.keys(obj).length === 0) return true
  return false
}

function omit(obj, key) {
  const { [key]: omitted, ...rest } = obj
  return rest
}

export { omit, isEmptyObject, isGlobalStoreMethod, mappingInjectContextWithVuex, mappingContext }

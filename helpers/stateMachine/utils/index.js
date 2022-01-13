/**
 * @param {string} target actions | getters
 */
function mappingContext({ target, baseContext, injectOptions = {} }) {
  const injectContext = mappingInjectContext(injectOptions || {})

  return {
    ...baseContext,
    ...injectContext[target],
  }
}

function mappingInjectContext({ contextFrom, injectContext }) {
  const injectContextDictionary = { vuex: {} }
  const injectContextDictionaryKey = Object.keys(injectContextDictionary)
  if (!contextFrom || !injectContextDictionaryKey.includes(contextFrom)) return {}
  if (isEmptyObject(injectContext)) return {}

  injectContextDictionary.vuex = { ...mappingVuexContext(injectContext) }

  return injectContextDictionary[contextFrom]
}

function mappingVuexContext(injectContext) {
  const { rootState, rootGetters, rootDispatch } = injectContext || {}

  const commonInjectContext = {
    rootState,
    rootGetters,
  }

  return {
    actions: {
      ...commonInjectContext,
      rootDispatch,
    },
    getters: {
      ...commonInjectContext,
    },
  }
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

export { isEmptyObject, isGlobalStoreMethod, mappingInjectContext, mappingContext, mappingVuexContext }

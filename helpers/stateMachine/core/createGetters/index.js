class CreateMethods {
  constructor(initialGetters, context) {
    this._context = context
    this._initialGetters = initialGetters
    this.init()
  }
  init() {
    const { state, rootState, rootGetters } = this._context
    this._methods.forEach(method => {
      this[method] = this._initialGetters[method](state, this, rootState, rootGetters)
    })
  }

  get _methods() {
    return Object.keys(this._initialGetters)
  }
}

/**
 * @param context { state } or { state, rootState, rootGetters }
 */
function createGetters(initialGetters, context) {
  if (!initialGetters) {
    return { getter: null }
  }

  const getters = new CreateMethods(initialGetters, context)

  return { getters }
}

export { CreateMethods, createGetters }

export default createGetters

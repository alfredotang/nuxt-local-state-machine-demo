class CreateMethods {
  constructor(initialGetters, context) {
    this._context = context
    this._initialGetters = initialGetters
    this.init()
  }
  init() {
    this._context.getters = this
    this._methods.forEach(method => {
      this[method] = this._initialGetters[method]({ ...this._context })
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

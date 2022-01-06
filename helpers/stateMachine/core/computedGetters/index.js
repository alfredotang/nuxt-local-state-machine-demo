import { mappingContext } from '~/helpers/stateMachine/utils'
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

function computedGetters({ initialGetters, baseContext, injectOptions }) {
  if (!initialGetters) {
    return { getter: null }
  }

  const context = mappingContext({ target: 'getters', baseContext, injectOptions })

  const getters = new CreateMethods(initialGetters, context)

  return { getters }
}

export { CreateMethods, computedGetters }

export default computedGetters

import { mappingContext, isEmptyObject } from '~/helpers/stateMachine/utils'
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

class CreateMethodsV2 {
  constructor(initialGetters, context) {
    this._context = context
    this._initialGetters = initialGetters
    this.init()
  }
  init() {
    this._context.getters = this
    this._methods.forEach(method => {
      Object.defineProperty(this, method, {
        get() {
          return this._initialGetters[method](this._context)
        },
        set(value) {
          return value
        },
      })
    })
  }

  get _methods() {
    return Object.keys(this._initialGetters)
  }
}

const computedGetters = ({ initialGetters, baseContext, injectOptions }) => {
  if (isEmptyObject(initialGetters)) {
    return { getter: {} }
  }

  const context = mappingContext({ target: 'getters', baseContext, injectOptions })

  const getters = new CreateMethodsV2(initialGetters, context)

  return { getters }
}

export { CreateMethods, computedGetters }

export default computedGetters

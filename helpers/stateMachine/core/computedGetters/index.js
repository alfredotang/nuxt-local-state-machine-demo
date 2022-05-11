export class ComputedGetters {
  constructor(initialGetters, context) {
    this._context = context
    this._initialGetters = initialGetters
    this.init()
  }
  init() {
    const context = { ...this._context, getters: this }
    this._methods.forEach(method => {
      Object.defineProperty(this, method, {
        get() {
          try {
            return this._initialGetters[method](context)
          } catch (e) {
            return undefined
          }
        },
      })
    })
  }

  get _methods() {
    return Object.keys(this._initialGetters)
  }
}

import { mappingContext, isEmptyObject } from '~/helpers/stateMachine/utils'

export class CreateStateMachine {
  constructor(options, injectOptions) {
    this._initialState = options.initialState || {}
    this._initialActions = options.initialActions || {}
    this._initialMutations = options.initialMutations || {}
    this._initialGetters = options.initialGetters || {}
    this._injectOptions = injectOptions || {}
    this._commit = this._commit.bind(this)
    this._dispatch = this._dispatch.bind(this)
  }

  _commit(type, payload) {
    this._initialMutations[type](this._initialState, payload)
  }

  _dispatch(type, payload) {
    if (!this._initialActions[type]) throw new Error(`ActionsError: '${type}' is not defined on actions`)

    const context = mappingContext({
      target: 'actions',
      baseContext: {
        state: this.state,
        commit: this._commit,
        dispatch: this._dispatch,
        getters: this.getters,
      },
      injectOptions: this.injectOptions,
    })

    return this._initialActions[type](context, payload)
  }

  get state() {
    return this._initialState
  }

  get actions() {
    if (isEmptyObject(this._initialActions)) return null
    const keys = Object.keys(this._initialActions)

    return keys.reduce((collection, type) => {
      collection[type] = payload => this._dispatch(type, payload)
      return collection
    }, {})
  }

  get getters() {
    const context = mappingContext({
      target: 'getters',
      baseContext: {
        state: this.state,
      },
      injectOptions: this.injectOptions,
    })
    return new ComputedGetters(this._initialGetters, context)
  }
}

class ComputedGetters {
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
          return () => this._initialGetters[method](this._context)
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

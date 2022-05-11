import { mappingContext, isEmptyObject } from '~/helpers/stateMachine/utils'
import { ComputedGetters } from '~/helpers/stateMachine/core/computedGetters'

class StateMachine {
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
      injectOptions: this._injectOptions,
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
      injectOptions: this._injectOptions,
    })
    return new ComputedGetters(this._initialGetters, context)
  }
}

export default StateMachine

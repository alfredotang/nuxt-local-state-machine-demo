import { mappingContext, isEmptyObject } from '~/helpers/stateMachine/utils'
import createMutations from '~/helpers/stateMachine/core/createMutations'
import createActions from '~/helpers/stateMachine/core/createActions'

/**
 * @param options { initialState, initialActions, initialMutations, initialGetters }
 * @param injectOptions { contextFrom, injectContext }
 */
function createStateMachine(options, injectOptions = {}) {
  const { initialState, initialActions = null, initialMutations = {}, initialGetters = null } = options

  if (isEmptyObject(initialState)) throw new Error(`'state' is a required option for createStateMachine`)
  const { state, commit, getters } = createMutations({ initialState, initialMutations, initialGetters, injectOptions })

  const { actions } = createActions({ initialActions, baseContext: { state, commit, getters }, injectOptions })

  return { state, getters, actions }
}

export { createStateMachine }
export default createStateMachine

import { mappingContext, isEmptyObject } from '~/helpers/stateMachine/utils'
import createMutations from '~/helpers/stateMachine/core/createMutations'
import createGetters from '~/helpers/stateMachine/core/createGetters'
import createActions from '~/helpers/stateMachine/core/createActions'

/**
 * @param options { initialState, initialActions, initialMutations, initialGetters }
 * @param injectOptions { contextFrom, injectContext }
 */
function createStateMachine(options, injectOptions = {}) {
  const { initialState, initialActions = null, initialMutations = {}, initialGetters = null } = options

  if (isEmptyObject(initialState)) throw new Error(`'state' is a required option for createStateMachine`)
  const { state, commit } = createMutations(initialState, initialMutations)

  const gettersContext = mappingContext({ target: 'getters', baseContext: { state }, injectOptions })

  const { getters } = createGetters(initialGetters, gettersContext)

  const actionsContext = mappingContext({
    target: 'actions',
    baseContext: { state, commit, getters },
    injectOptions,
  })
  const { actions } = createActions(initialActions, actionsContext)

  const machine = { state }

  if (actions) machine.actions = actions
  if (getters) machine.getters = getters

  return machine
}

export { createStateMachine }
export default createStateMachine

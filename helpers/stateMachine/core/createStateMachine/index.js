import { mappingContext, isEmptyObject } from '~/helpers/stateMachine/utils'
import createMutations from '~/helpers/stateMachine/core/createMutations'
import createGetters from '~/helpers/stateMachine/core/createGetters'
import createActions from '~/helpers/stateMachine/core/createActions'

function createStateMachine(options, injectContext = null) {
  const { initialState, initialActions = null, initialMutations = {}, initialGetters = null } = options

  if (isEmptyObject(initialState)) throw new Error(`'state' is a required option for createStateMachine`)
  const { state, commit } = createMutations(initialState, initialMutations)

  const gettersBaseContext = mappingContext({ target: 'getters', baseContext: { state }, injectContext })

  const { getters } = createGetters(initialGetters, gettersBaseContext)

  const actionsBaseContext = mappingContext({
    target: 'actions',
    baseContext: { state, commit, getters },
    injectContext,
  })
  const { actions } = createActions(initialActions, actionsBaseContext, injectContext)

  const machine = { state }

  if (actions) machine.actions = actions
  if (getters) machine.getters = getters

  return machine
}

export { createStateMachine }
export default createStateMachine

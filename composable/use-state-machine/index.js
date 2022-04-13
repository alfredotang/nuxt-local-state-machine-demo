import { useStore, reactive } from '@nuxtjs/composition-api'
import createStateMachine, { CreateStateMachineV2 } from '~/helpers/stateMachine/core'
import { connectContext } from '~/helpers/stateMachine/utils'

const useStateMachine = ({
  state: initialState,
  getters: initialGetters = {},
  actions: initialActions = {},
  mutations: initialMutations = {},
}) => {
  const store = useStore()
  const injectContext = {
    rootGetters: store.getters,
    rootState: store.state,
    rootDispatch: store.dispatch,
  }

  const options = {
    initialState: initialState(),
    initialGetters,
    initialActions: connectContext(initialActions, store),
    initialMutations,
  }

  const injectOptions = {
    injectContext,
    contextFrom: 'vuex',
  }

  const machine = new CreateStateMachineV2(options, injectOptions)
  const state = reactive(machine.state)
  const getters = machine.getters
  const actions = machine.actions || {}

  return { state, getters, actions }
}

export { useStateMachine }

export default useStateMachine

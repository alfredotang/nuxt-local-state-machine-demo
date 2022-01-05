import { useStore, reactive, toRaw } from '@nuxtjs/composition-api'
import createStateMachine from '~/helpers/stateMachine/core/createStateMachine'

function useStateMachine({
  state: initialState,
  getters: initialGetters = {},
  actions: initialActions = {},
  mutations: initialMutations = {},
}) {
  const store = useStore()
  const injectContext = {
    rootGetters: store.getters,
    rootState: store.state,
    rootDispatch: store.dispatch,
  }

  const reactiveInitialState = reactive(initialState())

  const options = {
    initialState: toRaw(reactiveInitialState),
    initialGetters,
    initialActions,
    initialMutations,
  }

  const machine = createStateMachine(options, { injectContext, contextFrom: 'vuex' })
  const state = reactiveInitialState
  const getters = machine.getters || {}
  const actions = machine.actions || {}

  return { state, getters, actions }
}

export { useStateMachine }

export default useStateMachine

import { useStore, reactive, computed, toRaw } from '@nuxtjs/composition-api'
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

  const options = {
    initialState: initialState(),
    initialGetters,
    initialActions,
    initialMutations,
  }

  const machine = createStateMachine(options, injectContext)
  const state = machine.state
  const getters = machine.getters ? machine.getters : {}
  const actions = machine.actions ? machine.actions : {}

  return { state, getters, actions }
}

export { useStateMachine }

export default useStateMachine

function computedState(state) {
  return new Proxy(state, {
    get: function (target, name) {
      const computedTarget = computed(() => target)
      if (!name) return computedTarget
      return computed(() => target[name]).value
    },
  })
}

import { useStore, reactive, toRaw, toRef, toRefs, computed, isReactive } from '@nuxtjs/composition-api'
import createStateMachine from '~/helpers/stateMachine/core'

function useStateMachine({
  state: initialState,
  getters: initialGetters = {},
  actions: initialActions = {},
  mutations: initialMutations = {},
}) {
  const store = useStore()
  const injectContext = {
    rootGetters: mapVuxRootGettersToReactive(store.getters),
    rootState: reactive(store.state),
    rootDispatch: store.dispatch,
  }

  const options = {
    initialState: initialState(),
    initialGetters,
    initialActions,
    initialMutations,
  }

  const injectOptions = {
    injectContext,
    contextFrom: 'vuex',
  }

  const machine = createStateMachine(options, injectOptions)
  const state = reactive(machine.state)
  const getters = reactive(machine.getters)
  const actions = machine.actions || {}

  return { state, getters, actions }
}

function mapVuxRootGettersToReactive(vuexGetters) {
  const reactiveRootGetters = new Proxy(
    {},
    {
      get: function (target, prop) {
        return computed(() => vuexGetters[prop])
      },
    }
  )
  return reactiveRootGetters
}

export { useStateMachine }

export default useStateMachine

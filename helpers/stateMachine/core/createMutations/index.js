import { produce } from 'immer'
import { isEmptyObject } from '~/helpers/stateMachine/utils'
import computedGetters from '~/helpers/stateMachine/core/computedGetters'

function createNextState(initialState, mutations, action) {
  if (!action) return produce(initialState, () => {})
  const mutationKeys = Object.keys(mutations)
  if (!mutationKeys.includes(action.type)) throw new Error(`'commit': ${action.type} is not defined`)

  const nextState = produce(initialState, draft => {
    mutations[action.type](draft, action.payload || null)
  })

  return nextState
}

function createMutations({ initialState, initialMutations, initialGetters, injectOptions }) {
  const stateKeys = Object.keys(initialState)
  const state = { ...initialState }
  const getterKeys = Object.keys(initialGetters)
  const { getters } = computedGetters({ initialGetters, baseContext: { state }, injectOptions })
  if (isEmptyObject(initialMutations)) {
    return {
      state: initialState,
      commit: function () {
        throw new Error(`must be created mutations first`)
      },
      getters,
    }
  }

  function commit(type, payload = null) {
    const nextState = createNextState(state, initialMutations, { type, payload })
    stateKeys.forEach(key => {
      state[key] = nextState[key]
    })

    if (isEmptyObject(initialGetters)) return
    const { getters: nextGetters } = computedGetters({
      initialGetters,
      baseContext: { state: nextState },
      injectOptions,
    })
    getterKeys.forEach(key => {
      getters[key] = nextGetters[key]
    })
  }

  return { state, commit, getters }
}

export { createNextState, createMutations }
export default createMutations

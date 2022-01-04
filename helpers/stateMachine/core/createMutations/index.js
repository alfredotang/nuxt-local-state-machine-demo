import { produce } from 'immer'
import { isEmptyObject } from '~/helpers/stateMachine/utils'

function createNextState(initialState, mutations, action) {
  if (!action) return produce(initialState, () => {})
  const mutationKeys = Object.keys(mutations)
  if (!mutationKeys.includes(action.type)) throw new Error(`'commit': ${action.type} is not defined`)

  const nextState = produce(initialState, draft => {
    mutations[action.type](draft, action.payload || null)
  })

  return nextState
}

function createMutations(state, mutations) {
  const stateKeys = Object.keys(state)
  if (isEmptyObject(mutations)) {
    return { state: produce(state, () => {}), commit: function () {} }
  }

  function commit(type, payload = null) {
    const nextState = createNextState(state, mutations, { type, payload })
    stateKeys.forEach(key => {
      state[key] = nextState[key]
    })
  }

  return { state, commit }
}

export { createNextState, createMutations }
export default createMutations

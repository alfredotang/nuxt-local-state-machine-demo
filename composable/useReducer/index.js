import { reactive, toRaw } from '@nuxtjs/composition-api'

const useReducer = (reducer, initialState, initialAction) => {
  const state = reactive(initialState)
  const dispatch = action => {
    const newState = reducer(toRaw(state), action)
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }

  if (initialAction !== null) {
    dispatch(initialAction)
  }
  return [state, dispatch]
}

export default useReducer

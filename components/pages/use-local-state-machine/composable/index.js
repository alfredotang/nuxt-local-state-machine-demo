import { useStateMachine } from '~/composable'

import fakers from '~/fakers/faker4'

export const state = () => ({
  now: new Date().toString(),
  data: fakers.data,
  pageName: 'world',
})

export const getters = {
  now: ({ state }) => state.now,
  data: ({ state }) => state.data,
  pageName: ({ state }) => state.pageName,
  pageNameX: ({ state, getters }) => getters.pageName + '-X-[form-local-state-machine]',
  pageNameXY: ({ state, getters, rootState, rootGetters }) => rootGetters['world/pageNameXY'],
}

const actions = {
  changePageName({ commit }, payload) {
    commit('SET_PAGE_NAME', payload)
  },
}

const mutations = {
  SET_PAGE_NAME(state, payload) {
    state.pageName = payload
  },
}

export const useInit = () => {
  const machine = useStateMachine({ state, getters, actions, mutations })
  return machine
}

export default useInit

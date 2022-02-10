import faker3 from '~/fakers/faker3'
import faker4 from '~/fakers/faker4'
import { getTime } from '~/components/pages/home/composable/utils'
import { useProvider, useStateMachine } from '~/composable'

export const state = () => ({
  countryDataMap: {
    tw: { ...faker3.data },
    en: { ...faker4.data },
  },
  timer: getTime(new Date()),
  pageName: 'home',
})

export const mutations = {
  SET_TIMER(state, payload) {
    state.timer = payload
  },
  SET_PAGE_NAME(state, payload) {
    state.pageName = payload
  },
}

export const actions = {
  setTimerToNow({ commit }) {
    commit('SET_TIMER', getTime(new Date()))
  },
  setPageName({ commit }, payload) {
    commit('SET_PAGE_NAME', payload)
  },
  switchCountry({ rootDispatch }, payload) {
    // rootDispatch === vuex.store.dispatch
    rootDispatch('setting/switchCountry', payload)
  },
  async setPageNameToTimer({ dispatch, getters }) {
    await dispatch('setTimerToNow')
    const timer = getters.timers()
    dispatch('setPageName', timer)
  },
  step1({ dispatch }) {
    dispatch('switchCountry', 'en')
  },
  step2({ dispatch }) {
    dispatch('step1')
  },
  step3({ dispatch }) {
    dispatch('step2')
  },
  step4({ dispatch }) {
    dispatch('step3')
  },
  step5({ dispatch }) {
    dispatch('step4')
  },
  stepFinal({ dispatch }) {
    dispatch('step5')
  },
}

export const getters = {
  fakeData: ({ state }) => state.fakeData,
  timer: ({ state }) => state.timer,
  // rootGetters === vuex.store.getters
  country: ({ rootGetters }) => rootGetters['setting/country'],
  countryData: ({ state, getters }) => state.countryDataMap[getters.country()],
  pageName: ({ state }) => state.pageName,
}

export const scope = 'pages/home'

const useInit = () => {
  const machine = useStateMachine({
    state,
    mutations,
    getters,
    actions,
  })

  // 註冊 scope 讓 child 都可以用到
  useProvider(scope, machine)

  return machine
}

export default useInit

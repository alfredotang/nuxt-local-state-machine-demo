import { version } from 'moment'
import faker from '~/fakers/faker1'

export const state = () => ({
  country: 'tw',
  defaultCountryData: { ...faker.data },
  locale: 'zh-TW',
  settingVuex: 'settingVuex',
  helloWorld: 'helloWorld',
})

export const mutations = {
  SET_COUNTRY(state, payload) {
    state.country = payload
  },
}

export const actions = {
  switchCountry({ commit }, payload) {
    commit('SET_COUNTRY', payload)
  },
}

export const getters = {
  country: state => state.country,
  locale: state => state.locale,
  settingVuex({ settingVuex }) {
    console.log({ settingVuex })
    return state.settingVuex
  },
  helloWorld({ helloWorld }) {
    console.log({ helloWorld })
    return helloWorld
  },
  getVersion() {
    return (version = '1.0.0') => version
  },
  errorCode() {
    return data.filter(item => item.id < 100)
  },
}

import faker from '~/fakers/faker1'

export const state = () => ({
  country: 'tw',
  defaultCountryData: { ...faker.data },
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
}

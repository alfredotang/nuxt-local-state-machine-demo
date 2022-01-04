import fakers from '~/fakers/faker3'

export const state = () => ({
  now: new Date().toString(),
  data: fakers.data,
  pageName: 'world',
})

export const getters = {
  now: state => state.now,
  data: state => state.data,
  pageName: state => state.pageName,
  pageNameX: (state, getters) => getters.pageName + 'X',
  pageNameXY: (state, getters) => getters.pageNameX + 'Y-form-vuex',
}

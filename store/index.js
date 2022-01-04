import fakers from '~/fakers/faker1'

export const state = () => ({
  now: new Date().toString(),
  data: fakers.data,
  pageName: 'home',
})

export const getters = {
  now: state => state.now,
  data: state => state.data,
  pageName: state => state.pageName,
}

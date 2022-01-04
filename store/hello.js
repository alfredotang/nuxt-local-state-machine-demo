// import fakers from '~/fakers/faker2'

export const state = () => ({
  now: new Date().toString(),
  // data: fakers.data,
  pageName: 'hello',
})

export const getters = {
  now: state => state.now,
  // data: state => state.data,
  pageName: state => state.pageName,
}

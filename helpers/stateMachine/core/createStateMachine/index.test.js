import { createStateMachine } from '~/helpers/stateMachine/core/createStateMachine'

describe('createStateMachine', () => {
  describe('actions', () => {
    const TEST = 'TEST'
    const TEST_WITH_GETTERS = 'TEST_WITH_GETTERS'
    const TEST_WITH_ASYNC = 'TEST_WITH_ASYNC'

    let state, actions
    beforeEach(() => {
      const options = createStateMachine({
        initialState: {
          a: 1,
        },
        initialActions: {
          [TEST]({ commit }, payload) {
            commit(TEST, payload)
          },
          [TEST_WITH_GETTERS]({ commit, getters }) {
            commit(TEST, getters[TEST_WITH_GETTERS]())
          },
          [TEST_WITH_ASYNC]({ commit, getters }, payload) {
            return new Promise(resolve => {
              setTimeout(() => {
                commit(TEST, payload)
                resolve()
              }, 0)
            })
          },
        },
        initialMutations: {
          [TEST](state, payload) {
            state.a = payload
          },
        },
        initialGetters: {
          [TEST_WITH_GETTERS]: ({ state }) => state.a + 10,
        },
      })

      state = options.state
      actions = options.actions
    })

    it('committing', () => {
      actions[TEST](2)
      expect(state.a).toBe(2)
    })
    it('committing with getters', () => {
      actions[TEST_WITH_GETTERS]()
      expect(state.a).toBe(11)
    })
    it('dispatch', () => {
      actions[TEST](2)
      expect(state.a).toBe(2)
    })

    it('async dispatch', async () => {
      await actions[TEST_WITH_ASYNC](3)
      actions[TEST_WITH_GETTERS]()
      expect(state.a).toBe(13)
    })
  })
  describe('getters', () => {
    describe('has mutations', () => {
      const TEST = 'TEST'
      const TEST_WITH_GETTERS = 'TEST_WITH_GETTERS'
      const TEST_WITH_ASYNC_ACTIONS = 'TEST_WITH_ASYNC_ACTIONS'
      let actions, getters
      beforeEach(() => {
        const options = createStateMachine({
          initialState: {
            a: 1,
          },
          initialActions: {
            [TEST]({ commit }, payload) {
              commit(TEST, payload)
            },
            [TEST_WITH_ASYNC_ACTIONS]({ commit }, payload) {
              return new Promise(resolve => {
                setTimeout(() => {
                  commit(TEST, payload)
                  resolve()
                }, 0)
              })
            },
          },
          initialMutations: {
            [TEST](state, payload) {
              state.a = payload
            },
          },
          initialGetters: {
            [TEST]: ({ state }) => state.a,
            [TEST_WITH_GETTERS]: ({ getters }) => getters[TEST]() + 10,
          },
        })

        actions = options.actions
        getters = options.getters
      })

      it('get state', () => {
        expect(getters[TEST]()).toBe(1)
      })
      it('get state after action', () => {
        actions[TEST](2)
        expect(getters[TEST]()).toBe(2)
      })
      it('get state after async action', async () => {
        await actions[TEST_WITH_ASYNC_ACTIONS](2000)
        expect(getters[TEST]()).toBe(2000)
      })
      it('get state with getters', () => {
        expect(getters[TEST_WITH_GETTERS]()).toBe(11)
      })
    })
    describe(`not defined mutations`, () => {
      const TEST = 'TEST'
      const TEST_WITH_GETTERS = 'TEST_WITH_GETTERS'
      let getters
      beforeEach(() => {
        const options = createStateMachine({
          initialState: {
            a: 1,
          },
          initialGetters: {
            [TEST]: ({ state }) => state.a,
            [TEST_WITH_GETTERS]: ({ getters }) => getters[TEST]() + 10,
          },
        })

        getters = options.getters
      })

      it('get state', () => {
        expect(getters[TEST]()).toBe(1)
      })
      it('get state with getters', () => {
        expect(getters[TEST_WITH_GETTERS]()).toBe(11)
      })
    })
  })
})
describe('createStateMachine with injectOptions', () => {
  const injectOptions = {
    injectContext: {},
    contextFrom: 'vuex',
  }
  beforeEach(() => {
    const TEST = 'TEST'
    const TEST_WITH_GETTERS = 'TEST_WITH_GETTERS'
    const TEST_WITH_ASYNC = 'TEST_WITH_ASYNC'
    const options = createStateMachine({
      initialState: {
        a: 100,
      },
      initialActions: {
        [TEST]({ commit }, payload) {
          commit(TEST, payload)
        },
        [TEST_WITH_GETTERS]({ commit, getters }) {
          commit(TEST, getters[TEST_WITH_GETTERS]())
        },
        [TEST_WITH_ASYNC]({ commit }, payload) {
          return new Promise(resolve => {
            setTimeout(() => {
              commit(TEST, payload)
              resolve()
            }, 0)
          })
        },
      },
      initialMutations: {
        [TEST](state, payload) {
          state.a = payload
        },
      },
      initialGetters: {
        [TEST]: ({ state }) => state.a,
        [TEST_WITH_GETTERS]: ({ getters }) => getters[TEST]() + 10,
      },
    })
    injectOptions.injectContext = {
      rootState: options.state,
      rootGetters: options.getters,
      rootDispatch: (type, payload) => options.actions[type](payload),
    }
  })
  describe('actions', () => {
    const TEST = 'TEST'
    const TEST_WITH_ROOT_STATE = 'TEST_WITH_ROOT_STATE'
    const TEST_WITH_GETTERS = 'TEST_WITH_GETTERS'
    const TEST_WITH_ROOT_GETTERS = 'TEST_WITH_ROOT_GETTERS'
    const TEST_WITH_ROOT_DISPATCH = 'TEST_WITH_ROOT_DISPATCH'
    const TEST_WITH_ASYNC = 'TEST_WITH_ASYNC'
    const TEST_WITH_ASYNC_ROOT_DISPATCH = 'TEST_WITH_ASYNC_ROOT_DISPATCH'

    let state, actions
    beforeEach(() => {
      const options = createStateMachine(
        {
          initialState: {
            a: 1,
          },
          initialActions: {
            [TEST]({ commit }, payload) {
              commit(TEST, payload)
            },
            [TEST_WITH_ROOT_STATE]({ dispatch, rootState }) {
              dispatch(TEST, rootState.a)
            },
            [TEST_WITH_ROOT_GETTERS]({ commit, rootGetters }) {
              commit(TEST, rootGetters[TEST_WITH_GETTERS]())
            },
            [TEST_WITH_ROOT_DISPATCH]({ dispatch, rootDispatch }) {
              rootDispatch(TEST, 200)
              dispatch(TEST_WITH_ROOT_STATE)
            },
            async [TEST_WITH_ASYNC_ROOT_DISPATCH]({ rootDispatch, dispatch }) {
              await rootDispatch(TEST_WITH_ASYNC, 1000)
              dispatch(TEST_WITH_ROOT_STATE)
            },
          },
          initialMutations: {
            [TEST](state, payload) {
              state.a = payload
            },
          },
          initialGetters: {
            [TEST_WITH_GETTERS]: ({ state }) => state.a + 10,
          },
        },
        injectOptions
      )

      state = options.state
      actions = options.actions
    })

    it('committing with rootState', () => {
      actions[TEST_WITH_ROOT_STATE]()
      expect(state.a).toBe(100)
    })
    it('committing with rootGetters', () => {
      actions[TEST_WITH_ROOT_GETTERS]()
      expect(state.a).toBe(110)
    })
    it('dispatch with root dispatch', () => {
      actions[TEST_WITH_ROOT_DISPATCH]()
      expect(state.a).toBe(200)
    })

    it('dispatch with async root dispatch', async () => {
      await actions[TEST_WITH_ASYNC_ROOT_DISPATCH]()
      expect(state.a).toBe(1000)
    })
  })
  describe('getters', () => {
    const TEST = 'TEST'
    const TEST_WITH_GETTERS = 'TEST_WITH_GETTERS'
    const TEST_WITH_ROOT_GETTERS = 'TEST_WITH_ROOT_GETTERS'
    const TEST_WITH_ROOT_STATE = 'TEST_WITH_ROOT_STATE'
    const TEST_WITH_ROOT_DISPATCH = 'TEST_WITH_ROOT_DISPATCH'
    const TEST_WITH_ASYNC = 'TEST_WITH_ASYNC'
    const TEST_WITH_ASYNC_ROOT_DISPATCH = 'TEST_WITH_ASYNC_ROOT_DISPATCH'

    let actions, getters
    beforeEach(() => {
      const options = createStateMachine(
        {
          initialState: {
            a: 1,
          },
          initialActions: {
            [TEST]({ commit }, payload) {
              commit(TEST, payload)
            },
            [TEST_WITH_ROOT_DISPATCH]({ rootDispatch }) {
              rootDispatch(TEST, 10000)
            },
            async [TEST_WITH_ASYNC_ROOT_DISPATCH]({ rootDispatch }) {
              await rootDispatch(TEST_WITH_ASYNC, 58000)
            },
          },
          initialMutations: {
            [TEST](state, payload) {
              state.a = payload
            },
          },
          initialGetters: {
            [TEST_WITH_ROOT_STATE]: ({ rootState }) => rootState.a,
            [TEST_WITH_ROOT_GETTERS]: ({ rootGetters }) => rootGetters[TEST_WITH_GETTERS]() + 10,
          },
        },
        injectOptions
      )

      actions = options.actions
      getters = options.getters
    })

    it('get root state', () => {
      expect(getters[TEST_WITH_ROOT_STATE]()).toBe(100)
    })
    it('get root getters', () => {
      expect(getters[TEST_WITH_ROOT_GETTERS]()).toBe(120)
    })
    it('get state after rootDispatch', () => {
      actions[TEST_WITH_ROOT_DISPATCH]()
      expect(getters[TEST_WITH_ROOT_STATE]()).toBe(10000)
    })
    it('get rootGetters after rootDispatch', () => {
      actions[TEST_WITH_ROOT_DISPATCH]()
      expect(getters[TEST_WITH_ROOT_GETTERS]()).toBe(10020)
    })
    it('get state after async rootDispatch', async () => {
      await actions[TEST_WITH_ASYNC_ROOT_DISPATCH]()
      expect(getters[TEST_WITH_ROOT_STATE]()).toBe(58000)
    })
    it('get rootGetters after async rootDispatch', async () => {
      await actions[TEST_WITH_ASYNC_ROOT_DISPATCH]()
      expect(getters[TEST_WITH_ROOT_GETTERS]()).toBe(58020)
    })
  })
})

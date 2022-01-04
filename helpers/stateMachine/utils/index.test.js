import {
  omit,
  isEmptyObject,
  isGlobalStoreMethod,
  mappingInjectContextWithVuex,
  mappingContext,
} from '~/helpers/stateMachine/utils'

describe('state machine utils', () => {
  describe('omit', () => {
    const object = {
      a: 1,
      b: 2,
    }
    it('omit key in object', () => {
      const expectResult = { b: 2 }
      expect(omit(object, 'a')).toEqual(expectResult)
    })

    it('omit key not in object', () => {
      const expectResult = {
        a: 1,
        b: 2,
      }

      expect(omit(object, 'c')).toEqual(expectResult)
    })
  })

  describe('isEmptyObject', () => {
    describe('object is empty or not exist', () => {
      it('object is empty', () => {
        const testCase = {}
        expect(isEmptyObject(testCase)).toBe(true)
      })

      it('object is null', () => {
        const testCase = null
        expect(isEmptyObject(testCase)).toBe(true)
      })

      it('object is undefined', () => {
        const testCase = undefined
        expect(isEmptyObject(testCase)).toBe(true)
      })
    })

    it('object has value', () => {
      const testCase = { a: 1 }
      expect(isEmptyObject(testCase)).toBe(false)
    })
  })

  describe('isGlobalStoreMethod', () => {
    it(`should be global store method`, () => {
      expect(isGlobalStoreMethod('a/b/c')).toBe(true)
    })

    it(`shouldn't be global store method`, () => {
      expect(isGlobalStoreMethod('helloWorldHiHa')).toBe(false)
    })
  })

  describe('mappingInjectContextWithVuex', () => {
    let defaultReturnValue = { actions: {}, getters: {} }
    describe('injectContext is empty or not exist object', () => {
      it('injectContext is empty', () => {
        const testCase = {}
        expect(mappingInjectContextWithVuex(testCase)).toEqual(defaultReturnValue)
      })

      it('injectContext is null', () => {
        const testCase = null
        expect(mappingInjectContextWithVuex(testCase)).toEqual(defaultReturnValue)
      })

      it('injectContext is undefined', () => {
        const testCase = undefined
        expect(mappingInjectContextWithVuex(testCase)).toEqual(defaultReturnValue)
      })
    })
    it('injectContext is exist', () => {
      const testCase = {
        rootState: 1,
        rootGetters: 2,
        rootDispatch: 3,
      }
      const expectResult = {
        actions: {
          rootState: 1,
          rootGetters: 2,
          rootDispatch: 3,
        },
        getters: {
          rootState: 1,
          rootGetters: 2,
        },
      }
      expect(mappingInjectContextWithVuex(testCase)).toEqual(expectResult)
    })
  })
  describe('mappingContext', () => {
    describe('injectContext is empty or not exist object', () => {
      const expectInjectContextIsEmptyOrNotExistResult = {
        state: 1,
      }
      it('injectContext is empty', () => {
        const testCase = {
          target: 'actions',
          baseContext: { state: 1 },
          injectContext: {},
        }
        expect(mappingContext(testCase)).toEqual(expectInjectContextIsEmptyOrNotExistResult)
      })

      it('injectContext is null', () => {
        const testCase = {
          target: 'actions',
          baseContext: { state: 1 },
          injectContext: null,
        }
        expect(mappingContext(testCase)).toEqual(expectInjectContextIsEmptyOrNotExistResult)
      })

      it('injectContext is undefined', () => {
        const testCase = {
          target: 'actions',
          baseContext: { state: 1 },
          injectContext: undefined,
        }
        expect(mappingContext(testCase)).toEqual(expectInjectContextIsEmptyOrNotExistResult)
      })
    })
  })
  describe('injectContext is exist', () => {
    const injectContext = {
      rootState: 1,
      rootGetters: 2,
      rootDispatch: 3,
    }

    const baseContext = {
      state: 1,
    }

    it('target is actions', () => {
      const testCase = {
        target: 'actions',
        baseContext,
        injectContext,
      }
      const expectResult = {
        ...baseContext,
        rootState: 1,
        rootGetters: 2,
        rootDispatch: 3,
      }
      expect(mappingContext(testCase)).toEqual(expectResult)
    })
    it('target is getters', () => {
      const testCase = {
        target: 'getters',
        baseContext,
        injectContext,
      }
      const expectResult = {
        ...baseContext,
        rootState: 1,
        rootGetters: 2,
      }
      expect(mappingContext(testCase)).toEqual(expectResult)
    })
  })
})

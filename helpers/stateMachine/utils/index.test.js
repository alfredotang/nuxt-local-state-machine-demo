import {
  omit,
  isEmptyObject,
  isGlobalStoreMethod,
  mappingVuexContext,
  mappingInjectContext,
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

  describe('mappingVuexContext', () => {
    let defaultReturnValue = { actions: {}, getters: {} }
    describe('injectContext is empty or not exist object', () => {
      it('injectContext is empty', () => {
        const testCase = {}
        expect(mappingVuexContext(testCase)).toEqual(defaultReturnValue)
      })

      it('injectContext is null', () => {
        const testCase = null
        expect(mappingVuexContext(testCase)).toEqual(defaultReturnValue)
      })

      it('injectContext is undefined', () => {
        const testCase = undefined
        expect(mappingVuexContext(testCase)).toEqual(defaultReturnValue)
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
      expect(mappingVuexContext(testCase)).toEqual(expectResult)
    })
  })
  describe('mappingInjectContext', () => {
    describe('injectContext is empty or not exist object', () => {
      it('injectContext is empty', () => {
        const testCase = {
          contextFrom: 'vuex',
          injectContext: {},
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })

      it('injectContext is null', () => {
        const testCase = {
          contextFrom: 'vuex',
          injectContext: null,
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })

      it('injectContext is undefined', () => {
        const testCase = {
          contextFrom: 'vuex',
          injectContext: undefined,
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })
    })
    describe('contextFrom is not correct', () => {
      it('contextFrom is empty string', () => {
        const testCase = {
          contextFrom: '',
          injectContext: {
            a: 1,
            b: 2,
          },
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })
      it('corresponding method has not been defined', () => {
        const testCase = {
          contextFrom: 'hello',
          injectContext: {
            a: 1,
            b: 2,
          },
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })

      it('injectContext is null', () => {
        const testCase = {
          contextFrom: null,
          injectContext: {
            a: 1,
            b: 2,
          },
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })

      it('injectContext is undefined', () => {
        const testCase = {
          contextFrom: undefined,
          injectContext: {
            a: 1,
            b: 2,
          },
        }
        expect(mappingInjectContext(testCase)).toEqual({})
      })
    })

    it('context from vuex', () => {
      const testCase = {
        contextFrom: 'vuex',
        injectContext: {
          rootState: 1,
          rootGetters: 2,
          rootDispatch: 3,
        },
      }
      expect(mappingInjectContext(testCase)).toEqual({
        actions: {
          rootState: 1,
          rootGetters: 2,
          rootDispatch: 3,
        },
        getters: {
          rootState: 1,
          rootGetters: 2,
        },
      })
    })
  })
  describe('mappingContext', () => {
    describe('injectOptions is empty or not exist object', () => {
      const expectInjectContextIsEmptyOrNotExistResult = {
        state: 1,
      }
      it('injectOptions is empty', () => {
        const testCase = {
          target: 'actions',
          baseContext: { state: 1 },
          injectOptions: {},
        }
        expect(mappingContext(testCase)).toEqual(expectInjectContextIsEmptyOrNotExistResult)
      })

      it('injectOptions is null', () => {
        const testCase = {
          target: 'actions',
          baseContext: { state: 1 },
          injectOptions: null,
        }
        expect(mappingContext(testCase)).toEqual(expectInjectContextIsEmptyOrNotExistResult)
      })

      it('injectOptions is undefined', () => {
        const testCase = {
          target: 'actions',
          baseContext: { state: 1 },
          injectOptions: undefined,
        }
        expect(mappingContext(testCase)).toEqual(expectInjectContextIsEmptyOrNotExistResult)
      })
    })
    describe('injectOptions is exist', () => {
      const injectOptions = {
        contextFrom: 'vuex',
        injectContext: {
          rootState: 1,
          rootGetters: 2,
          rootDispatch: 3,
        },
      }

      const baseContext = {
        state: 1,
      }

      it('target is actions', () => {
        const testCase = {
          target: 'actions',
          baseContext,
          injectOptions,
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
          injectOptions,
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
})

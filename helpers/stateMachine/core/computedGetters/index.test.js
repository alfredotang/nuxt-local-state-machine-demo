import { ComputedGetters } from '~/helpers/stateMachine/core/computedGetters'

it('computedGetters', () => {
  const LOCALE_MOCK = 'LOCALE_MOCK'
  const initialGetters = {
    locale: ({ state }) => state.locale,
    localeX: ({ getters }) => `${getters.locale}X`,
  }

  const context = {
    state: {
      locale: LOCALE_MOCK,
    },
  }

  const { locale, localeX } = new ComputedGetters(initialGetters, context)

  const testCase = [locale(), localeX()]
  const expectResult = [LOCALE_MOCK, `${LOCALE_MOCK}X`]

  expect(testCase).toEqual(expectResult)
})

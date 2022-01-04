import { ref, reactive, readonly, provide, useStore, onMounted } from '@nuxtjs/composition-api'
import { useProvider } from '~/composable'
import faker from '~/fakers/faker2'

// const { dispatch: globalDispatch } = useStore()

const state = {
  data: reactive(faker.data),
  pageName: ref('hello'),
}

const actions = {
  updatedPageName(pageName) {
    state.pageName.value = pageName
  },
}

export const scope = {
  name: 'pages/hello',
  values: {
    state,
    actions,
  },
}

export default function useInit() {
  useProvider(scope)

  return { state, actions }
}

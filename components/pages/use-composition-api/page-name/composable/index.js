import { computed, reactive } from '@nuxtjs/composition-api'
import { useScope } from '~/composable'
import { scope } from '~/components/pages/use-composition-api/composable'

const useInit = () => {
  const { state } = useScope(scope)
  const pageName = computed(() => mappingPageNameWithDateTime(state.pageName))
  return { pageName }
}

const mappingPageNameWithDateTime = pageName => {
  const now = new Date()
  return `${pageName.value} - ${now.getHours()} - ${now.getMinutes()} - ${now.getSeconds()}`
}

export default useInit

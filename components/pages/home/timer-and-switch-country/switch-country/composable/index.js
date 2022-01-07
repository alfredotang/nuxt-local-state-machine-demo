import { scope } from '~/components/pages/home/composable'
import { useScope } from '~/composable'

const useInit = () => {
  const pagesHomeScopeValues = useScope(scope)

  return { ...pagesHomeScopeValues }
}

export default useInit

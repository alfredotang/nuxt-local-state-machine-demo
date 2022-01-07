import { scope } from '~/components/pages/home/composable'
import { useScope } from '~/composable'

const useInit = () => {
  const pageHomeScopeValues = useScope(scope)

  return { ...pageHomeScopeValues }
}

export default useInit

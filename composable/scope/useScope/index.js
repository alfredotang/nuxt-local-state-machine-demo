import { inject } from '@nuxtjs/composition-api'
import { scopeException } from '~/composable/scope/utils'

export default function useScope(scope) {
  scopeException(scope)
  return inject(scope.name)
}

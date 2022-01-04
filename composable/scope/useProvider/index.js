import { provide } from '@nuxtjs/composition-api'
import { scopeException } from '~/composable/scope/utils'

export default function useProvider(scope) {
  scopeException(scope)
  provide(scope.name, scope.values)
}

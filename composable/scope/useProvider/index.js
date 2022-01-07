import { provide } from '@nuxtjs/composition-api'
import { scopeException } from '~/composable/scope/utils'

export default function useProvider(scope, values) {
  scopeException(scope)
  provide(scope, values)
}

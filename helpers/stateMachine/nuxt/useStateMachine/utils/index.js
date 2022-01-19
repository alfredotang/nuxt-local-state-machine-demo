import { isEmptyObject } from '~/helpers/stateMachine/utils'

export const connectContext = (method, context) => {
  if (isEmptyObject(method)) return {}
  const result = {}
  const keys = Object.keys(method)
  keys.forEach(key => {
    if (typeof method[key] !== 'function') return
    result[key] = method[key].bind(context)
  })

  return result
}

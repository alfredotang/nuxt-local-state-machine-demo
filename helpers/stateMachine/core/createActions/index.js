import { isEmptyObject, mappingContext } from '~/helpers/stateMachine/utils'

const createActionsDispatch = (actions, context) => {
  return (name, payload) => {
    if (!actions[name])
      throw new Error(`ActionsError: '${name}' is not defined on actions, maybe you can use 'rootDispatch'`)

    return actions[name](context, payload)
  }
}

const createActions = ({ initialActions, baseContext, injectOptions }) => {
  if (isEmptyObject(initialActions)) {
    return { actions: null }
  }

  const context = mappingContext({
    target: 'actions',
    baseContext,
    injectOptions,
  })

  const actions = {}
  const actionNames = Object.keys(initialActions)
  const dispatch = (name, payload) => createActionsDispatch(initialActions, context)(name, payload)
  actionNames.forEach(action => {
    actions[action] = payload => createActionsDispatch(initialActions, { ...context, dispatch })(action, payload)
  })

  return { actions }
}

export { createActionsDispatch, createActions }
export default createActions

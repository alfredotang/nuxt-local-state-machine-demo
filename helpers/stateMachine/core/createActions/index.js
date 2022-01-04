import { isGlobalStoreMethod, isEmptyObject, omit } from '~/helpers/stateMachine/utils'

function createActionsDispatch(actions, context) {
  const { rootDispatch } = context

  return (name, payload) => {
    if (isGlobalStoreMethod(name) && !isEmptyObject(context?.rootDispatch)) {
      return rootDispatch(name, payload)
    }

    return actions[name](context, payload)
  }
}

/**
 * @param context { state, commit } || { state, commit, rootState, rootGetters, rootDispatch }
 */
function createActions(initialActions, context) {
  if (!initialActions) {
    return { actions: null }
  }

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

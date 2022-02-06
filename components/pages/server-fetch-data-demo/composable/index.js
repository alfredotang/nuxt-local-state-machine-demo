import axios from 'axios'
import { useFetch } from '@nuxtjs/composition-api'
import { api } from '~/services'
import { useStateMachine } from '~/helpers/stateMachine/nuxt'
import { useProvider } from '~/composable'

// https://fakestoreapi.com/docs
export const state = () => ({
  products: [],
})

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload
  },
}

export const actions = {
  async fetchProducts({ commit }) {
    const { data } = await axios.get(api.getProducts)
    commit('SET_PRODUCTS', data)
  },
}

export const getters = {
  products: ({ state }) => state.products,
}

export const scope = 'pages/sfd'

const useInit = () => {
  const machine = useStateMachine({
    state,
    mutations,
    getters,
    actions,
  })

  // 註冊 scope 讓 child 都可以用到
  useProvider(scope, machine)

  useFetch(async () => {
    try {
      await machine.actions.fetchProducts()
    } catch (error) {
      console.error(error)
    }
  })

  return machine
}

export default useInit

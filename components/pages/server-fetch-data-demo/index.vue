<template>
  <server-fetch-data-demo :products="products" />
</template>
<script>
  import { computed } from '@nuxtjs/composition-api'
  import useInit from './composable'
  import ServerFetchDataDemo from './pure-component'
    export default {
      components: {
        ServerFetchDataDemo
      },
      setup() {
        const { getters } = useInit()
        const products = computed(getters.products)
        return { products }
      }
    }
</script>

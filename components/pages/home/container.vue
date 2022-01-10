<template>
  <home :pageName="pageName" :countryData="countryData" />
</template>
<script>
  import { computed } from '@nuxtjs/composition-api'
  import Home from '~/components/pages/home'
  import useInit from './composable'

  export default {
    components: {
      Home
    },
    setup() {
      const { getters } = useInit()
      const pageName = computed(getters.pageName)
      const countryData = computed(getters.countryData)
      const timer = computed(getters.timer)

      return { pageName, countryData, timer }
    }
  }
</script>

<template>
  <div>
    <div>
      <timer-and-switch-country />
    </div>
    <page-block :pageName="pageName" :data="countryData" />
  </div>
</template>
<script>
  import { computed } from '@nuxtjs/composition-api'
  import useInit from './composable'
  import PageBlock from '~/components/common/page-block'
  import TimerAndSwitchCountry from '~/components/pages/home/timer-and-switch-country'

  export default {
    components: {
      PageBlock,
      TimerAndSwitchCountry,
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

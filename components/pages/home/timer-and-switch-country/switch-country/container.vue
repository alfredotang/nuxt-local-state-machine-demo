<template>
  <switch-country :country="country" @onSwitchCountry="switchCountry" />
</template>

<script>
  import { computed } from '@nuxtjs/composition-api'
  import SwitchCountry from '~/components/pages/home/timer-and-switch-country/switch-country'
  import useInit from './composable'

  export default {
    components: {
      SwitchCountry
    },
    setup() {
      const { actions, getters } = useInit()
      const country = computed(getters.country)
      const { switchCountry } = actions
      return { switchCountry, country }
    }
  }
</script>

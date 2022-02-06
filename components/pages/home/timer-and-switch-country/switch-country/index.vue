<template>
  <switch-country :country="country" @onSwitchCountry="onSwitchCountry" />
</template>

<script>
  import { computed } from '@nuxtjs/composition-api'
  import SwitchCountry from '~/components/pages/home/timer-and-switch-country/switch-country/pure-component'
  import useInit from './composable'

  export default {
    components: {
      SwitchCountry
    },
    setup() {
      const { actions, getters } = useInit()
      const country = computed(getters.country)
      const { switchCountry, stepFinal } = actions
      const onSwitchCountry = () => {
        // switchCountry('en')
        stepFinal()
      }
      return { onSwitchCountry, country }
    }
  }
</script>

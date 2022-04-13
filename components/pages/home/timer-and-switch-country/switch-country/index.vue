<template>
  <div>
    <p>country: {{ country }}</p>
    <button @click="onSwitchCountry">switchCountry</button>
  </div>
</template>

<script>
  import { computed } from '@nuxtjs/composition-api'
  import useInit from './composable'

  export default {
    setup() {
      const { actions, getters } = useInit()
      const country = computed(getters.country)
      const { stepFinal } = actions
      const onSwitchCountry = () => {
        stepFinal()
      }
      return { onSwitchCountry, country }
    }
  }
</script>

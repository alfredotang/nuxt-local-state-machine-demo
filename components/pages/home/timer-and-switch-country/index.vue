<template>
  <div>
    <div>timer: {{ timer }}</div>
    <div>
      <switch-country />
    </div>
  </div>
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
        const { getters } = useInit()
        const timer = computed(() => getters.timer)
        return { timer }
      }
    }
</script>

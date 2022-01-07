<template>
  <div>
    <div>
      <timer-and-switch-country :timer="timer" />
    </div>
  </div>
</template>

<script>
  import { computed } from '@nuxtjs/composition-api'
  import TimerAndSwitchCountry from '~/components/pages/home/timer-and-switch-country'
  import useInit from './composable'

    export default {
      components: {
        TimerAndSwitchCountry
      },
      setup() {
        const { getters } = useInit()
        const timer = computed(() => getters.timer())
        return { timer }
      }
    }
</script>

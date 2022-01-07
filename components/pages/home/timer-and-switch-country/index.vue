<template>
  <div>
    <div>timer: {{ timer }}</div>
    <div>
      <switch-country />
    </div>
  </div>
</template>

<script>
  import props from './prop-types'
  import SwitchCountry from '~/components/pages/home/timer-and-switch-country/switch-country/container'


    export default {
      components: {
        SwitchCountry
      },
      props: {
        timer: props.timer,
      }
    }
</script>

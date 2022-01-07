<template>
  <div>
    <p>country: {{ country }}</p>
    <button @click="onSwitchCountry">switchCountry</button>
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
        country: props.country,
      },
      setup(p, { emit }) {
        const onSwitchCountry = () => {
          emit('onSwitchCountry', 'en')
        }
        return { onSwitchCountry }
      }
    }
</script>

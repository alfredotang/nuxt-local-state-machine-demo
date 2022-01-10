<template>
  <div>
    <p>country: {{ country }}</p>
    <button @click="onSwitchCountry">switchCountry</button>
  </div>
</template>

<script>
  import props from './prop-types'

  export default {
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

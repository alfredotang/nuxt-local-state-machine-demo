<template>
  <div>
    <p>country: {{ country }}</p>
    <button @click="onChangeCountry">switchCountry</button>
  </div>
</template>

<script>
  import props from './prop-types'

  export default {
    props: {
      country: props.country,
      onSwitchCountry: props.onSwitchCountry
    },
    setup(p, { emit }) {
      const onChangeCountry = () => {
        emit('onSwitchCountry')
      }
      return { onChangeCountry }
    }
  }
</script>

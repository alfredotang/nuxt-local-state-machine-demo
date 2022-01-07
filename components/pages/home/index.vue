<template>
  <div>
    <div>
      <timer-and-switch-country />
    </div>
    <page-block :pageName="pageName" :data="countryData" />
  </div>
</template>

<script>
  import props from './prop-types'
  import PageBlock from '~/components/common/page-block'
  import TimerAndSwitchCountry from '~/components/pages/home/timer-and-switch-country/container'


    export default {
      components: {
        PageBlock,
        TimerAndSwitchCountry
      },
      props: {
        pageName: props.pageName,
        countryData: props.countryData,
        timer: props.timer,
      }
    }
</script>

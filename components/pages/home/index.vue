<template>
  <div>
    <div>
      <div>from vuex: {{ settingVuex }}</div>
      <div>
        <button @click="switchCountryX">switchCountryX</button>
      </div>
      <timer-and-switch-country />
    </div>
    <page-block :pageName="pageName" :data="countryData" />
  </div>
</template>
<script>
  import { computed } from '@nuxtjs/composition-api'
  import useInit from './composable'
  import PageBlock from '~/components/common/page-block'
  import TimerAndSwitchCountry from '~/components/pages/home/timer-and-switch-country'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      PageBlock,
      TimerAndSwitchCountry,
    },
    setup() {
      const { getters } = useInit()
      const pageName = computed(() => getters.pageName)
      const countryData = computed(() => getters.countryData)
      const timer = computed(() => getters.timer)

      const switchCountryX = () => {
        console.log(this)
        // this.switchCountry('en')
      }

      return { pageName, countryData, timer, switchCountryX }
    },
    computed: {
      ...mapGetters({
        settingVuex: 'setting/settingVuex'
      })
    },
    methods: {
      ...mapActions({
        switchCountry: 'setting/switchCountry'
      })
    }
  }
</script>

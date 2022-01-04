<template>
  <div>
    <button @click="changePageName('afu')">changePageName</button>
    <page-block :pageName="pageName" :data="data" />
  </div>
</template>

<script>
  import PageBlock from '~/components/common/page-block'
  import useInit from '~/components/pages/use-local-state-machine/composable'

  export default {
    components: {
      PageBlock
    },
    setup() {
      const { state, getters, actions } = useInit()

      const { data } = getters
      const { pageName } = state
      const { changePageName } = actions

      return { data, pageName, changePageName }
    }
  }
</script>

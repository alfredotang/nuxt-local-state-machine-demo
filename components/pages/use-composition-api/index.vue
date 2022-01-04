<template>
  <div>
    <div>
      <button @click="onChangePageName">Changing</button>
    </div>
    <page-name />
    <page-block :pageName="pageName" :data="data" />
  </div>
</template>

<script>
  import useInit  from '~/components/pages/use-composition-api/composable'
  import PageBlock from '~/components/common/page-block'
  import { ref } from '@nuxtjs/composition-api'
  import PageName from '~/components/pages/use-composition-api/page-name'

    export default {
      components: {
        PageBlock,
        PageName,
      },
      setup() {
        const { state, actions } = useInit()
        const { data, pageName } = state
        const { updatedPageName } = actions

        const onChangePageName = () => {
          updatedPageName(new Date().toString())
        }

        const aaa = ref('a')


        return { data, pageName, onChangePageName }
      }
    }
</script>

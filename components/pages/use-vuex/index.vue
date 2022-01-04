<template>
  <div>
    <page-block :pageName="pageName" :data="data" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PageBlock from '~/components/common/page-block'

  export default {
    components: {
      PageBlock
    },
    computed: {
      ...mapGetters({
        data: 'data',
        pageName: 'pageName'
      }),
    },
  }
</script>

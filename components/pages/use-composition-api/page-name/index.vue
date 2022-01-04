<template>
  <div class="page-name">pages name: {{ pageName }}</div>
</template>

<script>
  import useInit from '~/components/pages/use-composition-api/page-name/composable'


    export default {
      setup() {

        const { pageName } = useInit()

        return { pageName }
      }
    }
</script>

<style scoped>
  .page-name {
      border: 1px solid grey;
      border-radius: 10px;
      padding: 1rem;
      margin: 1rem 0;
  }
  .page-name:hover, .page-name:focus {
    border-color: black
  }
</style>

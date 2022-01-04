<template>
  <div>
    <div>{{ pageName }}</div>
    <ul class="list" v-for="item in data" :key="item.uid">
      <li class="list-item">{{ item.city}}</li>
      <li class="list-item">{{ item.community}}</li>
      <li class="list-item">{{ item.zip}}</li>
      <li class="list-item">{{ item.zip_code}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['data', 'pageName']
  }
</script>

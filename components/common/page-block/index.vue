<template>
  <div class="bg-gray-100">
    <div class="">{{ pageName }}</div>
    <div class="flex flex-wrap">
      <ul
        class="mb-5 bg-gray-200 p-5 cursor-pointer shadow-lg hover:shadow-xl basis-1/4"
        v-for="item in data"
        :key="item.uid"
      >
        <li class="list-item">{{ item.city}}</li>
        <li class="list-item">{{ item.community}}</li>
        <li class="list-item">{{ item.zip}}</li>
        <li class="list-item">{{ item.zip_code}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data', 'pageName']
  }
</script>

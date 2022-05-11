<template>
  <div>
    <ul class="product-list">
      <li v-for="(item) in products" :key="item.id" class="product-items">
        <img :src="item.image" alt="product_img" class="product-img" />
        <div>{{ item.title}}</div>
        <div>{{ item.price }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { computed } from '@nuxtjs/composition-api'
  import useInit from './composable'
  export default {
    setup() {
      const { getters } = useInit()
      const products = computed(() => getters.products)
      return { products }
    }
  }
</script>
<style scoped>
  .product-list {
    display: flex;
  }

  .product-items {
    text-decoration: none;
    margin: var(--space-2);
    list-style: none;
    border: 1px solid grey;
  }

  .product-items:hover {
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  }

  .product-img {
    width: 100px;
    height: 50px;
  }
</style>

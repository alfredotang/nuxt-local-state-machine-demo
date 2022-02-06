import { string, object, shape, arrayOf, number } from 'vue-types'

export default {
  products: arrayOf(
    shape({
      id: number(),
      title: string(),
      price: number(),
      description: string(),
      category: string(),
      image: string(),
      rating: shape({
        rate: number(),
        count: number(),
      }),
    })
  ).def([]),
}

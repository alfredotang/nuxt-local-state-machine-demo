import { string, object } from 'vue-types'

export default {
  pageName: string().isRequired,
  timer: string().isRequired,
  // 拍謝借我偷懶一下用 object 定義
  countryData: object().isRequired,
}

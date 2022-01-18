import { string, func } from 'vue-types'

export default {
  country: string().isRequired,
  onSwitchCountry: func(),
}

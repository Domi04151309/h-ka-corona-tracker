import PageTabBar from '../../components/page-tab-bar.js'

import HirstoryHelper from '../../helpers/history.js'

export default {
  name: 'history',
  data() {
    return {
        history: HirstoryHelper.get(),
        options: { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short', year: '2-digit' }
    }
  },
  template:
  `<page-tab-bar>
    <h2>History</h2>
    <p class="mb-32">See where you have been.</p>
    <ul class="compact link-list ignore-page-padding">
      <li v-for="(item, i) in history" :key="i">
          <span class="room">
            <span class="material-icons-round">history</span>
            <div>
              Room {{ item.room }}<br>
              <span class="p">{{ (new Date(item.time)).toLocaleDateString(undefined, options) }}</span>
            </div>
          </span>
      </li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}

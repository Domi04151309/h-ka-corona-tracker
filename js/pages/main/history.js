import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'history',
  data() {
    return {
        history: [
          'Not Yet Implemented'
        ]
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
              {{ item }}<br>
              <span class="p">{{ item }}</span>
            </div>
          </span>
      </li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}

import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'check-in',
  data() {
    return {
        rooms: [
          'Test',
          'E102',
          'E103',
          'E104'
        ]
    }
  },
  template:
  `<page-tab-bar>
    <h2>Check-In</h2>
    <p class="mb-32">Choose an item from the list below.</p>
    <ul class="compact link-list ignore-page-padding">
      <li v-for="(item, i) in rooms" :key="i">
          <span class="room">
            <span class="material-icons-round">room</span>
            <div>
              Room {{ item }}<br>
              <span class="p">Click to check in</span>
            </div>
          </span>
      </li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}

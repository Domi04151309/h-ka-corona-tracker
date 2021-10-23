/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ModalInput from '../../components/modal-input.js'

import JsonHelper from '../../helpers/json.js'
import HirstoryHelper from '../../helpers/history.js'
import Rooms from '../../data/rooms.js'

export default {
  name: 'check-in',
  data() {
    return {
        rooms: Rooms
    }
  },
  template:
  `<page-tab-bar>
    <h2>Check-In</h2>
    <p class="mb-32">Choose an item from the list below.</p>
    <ul class="compact link-list ignore-page-padding">
      <li v-for="(item, i) in rooms" :key="i">
          <span class="room" v-on:click="onItemClicked(item)">
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
  },
  methods: {
    onItemClicked(room) {
      const ComponentClass = Vue.extend(ModalInput)
      const instance = new ComponentClass({
        propsData: {
          title: 'Check In At ' + room,
          inputType: 'text',
          initialValue: JsonHelper.get('lastUser', ()  => ''),
          positiveFunction: () => {
            //TODO: Validate inputs
            //TODO: Send actual request
            //TODO: Display request result
            JsonHelper.set('lastUser', instance.$refs.input.value)
            HirstoryHelper.add(room)
            console.log('https://idp.hs-karlsruhe.de/corona/coronatracker-extro.html?username=' + instance.$refs.input.value + '&location=' + room)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}

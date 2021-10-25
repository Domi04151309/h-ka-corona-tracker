/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import Modal from '../../components/modal.js'
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
          text: 'Please enter your iz username below.',
          inputType: 'text',
          initialValue: JsonHelper.get('lastUser', ()  => ''),
          positiveText: 'Check-In',
          positiveFunction: () => {
            if (instance.$refs.input.value.length == 8 && instance.$refs.input.value.match(/([a-z]){4}([0-9]){4}/g)) {
              JsonHelper.set('lastUser', instance.$refs.input.value)

              //TODO: Make sure this actually works
              const controller = new AbortController()
              setTimeout(() => controller.abort(), 3000)
              fetch(
                'https://idp.hs-karlsruhe.de/corona/coronatracker-extro.html?username=' + instance.$refs.input.value + '&location=' + room,
                { signal: controller.signal, mode: 'no-cors'}
              ).then(response => {
                console.log(response)
                if (response.ok || response.status == 0) {
                  HirstoryHelper.add(room)
                  const ComponentClass2 = Vue.extend(Modal)
                  const instance2 = new ComponentClass2({
                    propsData: {
                      title: 'Checked In Successfully',
                      message: 'You are now checked in at ' + room + '.',
                      negativeButton: false
                    }
                  })
                  instance2.$mount()
                  this.$root.$el.appendChild(instance2.$el)
                } else {
                  throw Error()
                }
              }).catch(e => {
                console.warn(e);
                const ComponentClass3 = Vue.extend(Modal)
                const instance3 = new ComponentClass3({
                  propsData: {
                    title: 'Failed Checking In',
                    message: 'It was not possible to send the request. Please try again.',
                    negativeButton: false
                  }
                })
                instance3.$mount()
                this.$root.$el.appendChild(instance3.$el)
              })
            } else {
              setTimeout(() => {
                const ComponentClass2 = Vue.extend(Modal)
                const instance2 = new ComponentClass2({
                  propsData: {
                    title: 'Invalid Username',
                    message: 'Your input was not a valid username.',
                    negativeButton: false
                  }
                })
                instance2.$mount()
                this.$root.$el.appendChild(instance2.$el)
              }, 1000)
            }
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}

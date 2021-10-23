/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import Modal from '../../components/modal.js'
import ModalTheme from '../../components/modal-theme.js'

export default {
  name: 'info',
  template:
  `<page-tab-bar>
    <div class="flex mb-32 space">
      <span id="profile-icon" class="material-icons-round accent">info</span>
    </div>
    <ul class="link-list card">
      <li v-on:click="changeTheme()"><span><span class="material-icons-round">palette</span>Change theme</span></li>
      <li v-on:click="clearCache()"><span><span class="material-icons-round">cached</span>Clear cache</span></li>
      <li><router-link to="/info/log"><span class="material-icons-round">report</span>View error log</router-link></li>
      <li v-on:click="deleteData()"><span><span class="material-icons-round">delete</span>Delete data</span></li>
      <li><router-link to="/info/about"><span class="material-icons-round">info</span>About</router-link></li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  },
  methods: {
    changeTheme() {
      const ComponentClass = Vue.extend(ModalTheme)
      const instance = new ComponentClass()
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    clearCache() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Clear Cache',
          message: 'Are you sure you want to clear your cache? This cannot be undone.',
          positiveText: 'Clear',
          positiveFunction: () => {
            caches.keys().then(names => {
              for (const name of names) caches.delete(name)
              location.reload()
            })
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    deleteData() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Data',
          message: 'Are you sure you want to delete your data? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            localStorage.clear()
            location.reload()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}

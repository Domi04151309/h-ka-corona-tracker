import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'info',
  template:
  `<page-tab-bar>
    <div class="flex mb-32 space">
      <span id="profile-icon" class="material-icons-round accent">info</span>
    </div>
    <ul class="link-list card">
      <li><router-link to="/info/app"><span class="material-icons-round">settings</span>App Settings</router-link></li>
      <li><router-link to="/info/help"><span class="material-icons-round">help</span>Help</router-link></li>
      <li><router-link to="/info/about"><span class="material-icons-round">info</span>About</router-link></li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}

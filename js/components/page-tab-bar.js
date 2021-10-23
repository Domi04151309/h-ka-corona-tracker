export default {
  name: 'page-tab-bar',
  data() {
    return {
      tabs: [
        {
          icon: 'login',
          title: 'Check-In',
          url: '/check-in'
        },
        {
          icon: 'history',
          title: 'History',
          url: '/history'
        },
        {
          icon: 'info',
          title: 'Info',
          url: '/info'
        }
      ]
    }
  },
  template:
  `<div>
    <header>
      <h1>H-KA Corona</h1>
    </header>
    <main class="with app-bar tab-bar fade-in-animation">
      <slot></slot>
    </main>
    <footer>
      <router-link class="tab" v-for="tab in tabs" :key="tab.url" :to="tab.url">
        <span class="material-icons-round" :aria-label="tab.title">{{ tab.icon }}</span>
      </router-link>
    </footer>
  </div>`
}

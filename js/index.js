/*global Vue, VueRouter*/

import JsonHelper from './helpers/json.js'

const Unknown = () => import('./pages/unknown.js')

const CheckIn = () => import('./pages/main/check-in.js')
const History = () => import('./pages/main/history.js')
const Info = () => import('./pages/main/info.js')

const ErrorLog = () => import('./pages/log.js')
const About = () => import('./pages/about.js')

if (/iPhone/.test(navigator.platform)) {
  const link = document.createElement('link')
  link.href = './css/ios.min.css'
  link.type = 'text/css'
  link.rel = 'stylesheet'
  document.getElementsByTagName('head')[0].appendChild(link)
}

const routes = [
  { path: '/', redirect: '/check-in' },
  { path: '*', component: Unknown },
  { path: '/check-in', component: CheckIn },
  { path: '/history', component: History },
  { path: '/info', component: Info },
  { path: '/info/log', component: ErrorLog },
  { path: '/info/about', component: About }
]

function logError(e, pos) {
  const errors = JsonHelper.get('errors', () => [])
  errors.push(e.message + ' at ' + pos)
  JsonHelper.set('errors', errors)
}
window.addEventListener('error', e => {
  logError(e, e.filename?.replace(/.*\/\/[^/]*/, '') + ':' + e.lineno)
})
Vue.config.errorHandler = (e, vm, info) => {
  console.error(e)
  logError(e, vm.$vnode.tag + ':' + info)
}

var headers, i
document.addEventListener('scroll', () => {
  headers = document.getElementsByTagName('HEADER')
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
  }
})

let modal
window.activityStack = ['/check-in']
window.backButtonPress = false
window.addEventListener('popstate', () => {
  window.backButtonPress = true
})

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  modal = document.querySelector('.modal-container')
  if (modal != null) {
    modal.parentNode.removeChild(modal)
    next(false)
    return
  }

  if (window.backButtonPress) {
    window.backButtonPress = false
    if (window.activityStack.length > 1) window.activityStack.pop()
    next(window.activityStack[window.activityStack.length - 1])
  } else {
    const index = window.activityStack.indexOf(to.fullPath)
    if (index == -1) window.activityStack.push(to.fullPath)
    else window.activityStack.length = index + 1
    next()
  }
})

const app = new Vue({
  router,
  el: '#app',
  mounted() {
    const loadingScreen = document.getElementById('loading_screen')
    loadingScreen.parentNode.removeChild(loadingScreen)

    let darkTheme = null
    switch (localStorage.getItem('theme')) {
      case 'light':
        darkTheme = false
        break
      case 'dark':
        darkTheme = true
        break
      default:
        darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        break
    }
    document.documentElement.classList.toggle('dark-theme', darkTheme)

    const metaColor = document.querySelector('meta[name=theme-color]')
    if (darkTheme) metaColor.setAttribute('content', '#1e1e1e')
    else metaColor.setAttribute('content', '#fff')
  }
})

//NotificationHelper.updatePendingNotifications()

if (location.hostname == 'localhost') {
  Vue.config.devtools = true
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
}

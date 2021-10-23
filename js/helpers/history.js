import JsonHelper from './json.js'

const KEY = 'location_history'

export default {
  get() {
    return JsonHelper.get(KEY, () => [])
  },
  add(room) {
    const data  = this.get()
    data.unshift({
      time: (new Date()).getTime(),
      room: room
    })
    JsonHelper.set(KEY, data)
  }
}

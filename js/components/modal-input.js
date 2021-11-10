export default {
  name: 'modal-input',
  props: {
    title: String,
    inputType: String,
    initialValue: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    positiveText: {
      type: String,
      default: 'Ok'
    },
    negativeText: {
      type: String,
      default: 'Cancel'
    },
    neutralText: {
      type: String,
      default: 'Neutral'
    },
    positiveFunction: {
      type: Function,
      default: () => {}
    },
    negativeFunction: {
      type: Function,
      default: () => {}
    },
    neutralFunction: {
      type: Function,
      default: () => {}
    },
    neutralButton: {
      type: Boolean,
      default: false
    }
  },
  template:
  `<div class="modal-container">
    <div class="modal-background" v-on:click="negative()"></div>
    <div class="modal-content card">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <input ref="input" :type="inputType" :value="initialValue" autocomplete="off" v-on:keyup.enter="positive()"></input>
      <div class="button-bar s">
        <button v-if="neutralButton" v-on:click="neutral()" type="button">{{ neutralText }}</button>
        <button class="ml-a" v-on:click="negative()" type="button">{{ negativeText }}</button>
        <button v-on:click="positive()" type="button">{{ positiveText }}</button>
      </div>
    </div>
  </div>`,
  methods: {
    positive() {
      this.positiveFunction()
      this.$el.parentNode.removeChild(this.$el)
    },
    negative() {
      this.negativeFunction()
      this.$el.parentNode.removeChild(this.$el)
    },
    neutral() {
      this.neutralFunction()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}

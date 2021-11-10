/*global QRCode*/

import Page from '../components/page.js'

export default {
  name: 'qr',
  data() {
    return {
      room: ''
    }
  },
  template:
  `<page title="QR Code" class="text-center">
    <h2>QR Code For {{ room }}</h2>
    <p class="mb-16">Use the QR code below to access the form for this room.</p>
    <div class="qr-container">
      <div id="qrcode"></div>
    </div>
    <button type="button" v-on:click="onVisitClicked()">Open The Page</button>
  </page>`,
  components: {
    Page
  },
  methods: {
    onVisitClicked() {
      window.open('https://idp.hs-karlsruhe.de/corona/?' + this.room, '_blank').focus()
    }
  },
  created() {
    this.room = this.$route.params.room
  },
  mounted() {
    new QRCode(document.getElementById('qrcode'), {
      text: 'https://idp.hs-karlsruhe.de/corona/?' + this.room,
      width: 256,
      height: 256,
      colorDark : '#000',
      colorLight : '#fff',
      correctLevel : QRCode.CorrectLevel.H
    })
  }
}

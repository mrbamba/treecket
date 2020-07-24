import './filters.js'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { eventBus } from './services/event-bus.service'
import store from './store'
// const cloneDeep = require('lodash/cloneDeep');
import _ from 'lodash';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueDragscroll from 'vue-dragscroll'
import VueConfetti from 'vue-confetti'
// import { DateTimePicker } from 'components'

Vue.use(VueConfetti);
// Vue.use(DateTimePicker)

// STYLES
import "./styles/main.scss";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

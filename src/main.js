import './filters.js'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { eventBus } from './services/event-bus.service'
import store from './store'
// const cloneDeep = require('lodash/cloneDeep');
import _ from 'lodash';    
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueDragscroll from 'vue-dragscroll'
import VueConfetti from 'vue-confetti'


Vue.use(VueConfetti);
library.add(fas)
// library.add(fab)

// STYLES
import "./styles/main.scss";

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

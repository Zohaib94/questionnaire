import Vue from 'vue'
import App from './App.vue'
window._ = require('lodash');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

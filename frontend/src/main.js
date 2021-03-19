import Vue from 'vue';
import app from './app.vue';
import { router } from './router';
import { store } from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import './scss/main.scss';
import vClickOutside from 'v-click-outside'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Avatar from 'vue-avatar'


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(vClickOutside)
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Avatar,
  render: h => h(app)
}).$mount('#app');

import Vue from 'vue';
import app from './app.vue';
import { router } from './router';
import { store } from './store/store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import './scss/main.scss';
import vClickOutside from 'v-click-outside'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Avatar from 'vue-avatar';


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(vClickOutside)
Vue.use(ElementUI, { locale });
// Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

const clone = require('rfdc')({ proto: true });
new Vue({
  router,
  store,
  Avatar,
  clone,
  render: h => h(app)
}).$mount('#app');

import Vue from 'vue';
import app from './app.vue';
import { router } from './router';
import { store } from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import './scss/main.scss';
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');

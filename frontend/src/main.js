import Vue from 'vue';
import app from './app.vue';
import { router } from './router';
import { store } from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/styles/main.scss'
import './registerServiceWorker';
import './scss/main.scss';


Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');

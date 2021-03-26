import Vue from 'vue';
import app from './app.vue';
import { router } from './router';
import { store } from './store/store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import './scss/main.scss';
import vClickOutside from 'v-click-outside';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Avatar from 'vue-avatar';
import VueCharts from 'vue-chartjs'

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(require('vue-moment'));
Vue.use(vClickOutside);
Vue.use(ElementUI, { locale });

const debug = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = debug;

Vue.mixin({
  methods: {
    $clone: require('rfdc')({ proto: true }),
    $dayjs: require('dayjs')
  }
});

new Vue({
  router,
  store,
  Avatar,
  VueCharts,
  render: h => h(app)
}).$mount('#app');

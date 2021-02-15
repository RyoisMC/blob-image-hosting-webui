import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import router from './router'
import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import VueSweetalert2 from 'vue-sweetalert2';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import VueToast from 'vue-toast-notification';
import moment from 'moment';

Vue.prototype.moment = moment;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-toast-notification/dist/theme-default.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
Vue.use(VueSweetalert2);
Vue.use(vueFilterPrettyBytes)
Vue.use(VueToast);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

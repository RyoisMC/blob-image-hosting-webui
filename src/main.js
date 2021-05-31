import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import router from './router'
import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin, getInstance } from "./auth";
import VueSweetalert2 from 'vue-sweetalert2';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import VueToast from 'vue-toast-notification';
import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';
Vue.prototype.moment = moment;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-toast-notification/dist/theme-default.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
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
Vue.use(InfiniteLoading);
const instance = getInstance();
instance.$watch("loading", async loading => {
  if (!loading && instance.isAuthenticated) {
    const token = await instance.getTokenSilently();
    const data = {
      token: token,
    }
    new Vue({
      router,
      data: data,
      render: h => h(App),
    }).$mount('#app')
  } else {
    instance.loginWithRedirect({connection: 'discord'});
  }
});



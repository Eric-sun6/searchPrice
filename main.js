import Vue from 'vue';
import App from './App';
import './static/css/reset.css';
import store from './store';
import request from './api/request.js';
import loading from './components/com-loading.vue';
import tabBar from './components/com-tabBar.vue';
import comWXLogin from './components/com-wxLogin.vue';
import comErrorTip from './components/com-errorTip.vue';
import comToast from './components/com-toast.vue';
import plugins from './plugins/index.js'
Vue.use(plugins)
Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.prototype.$store = store;
Vue.component('tabBar', tabBar);
Vue.component('loading', loading);
Vue.component('comWXLogin', comWXLogin);
Vue.component('comErrorTip', comErrorTip);
Vue.component('toast',comToast)
App.mpType = 'app';

const app = new Vue({
    ...App
});

app.$mount();

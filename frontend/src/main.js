import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './app.vue';

const http = axios.create({
    baseURL:  'http://localhost:4000'
});

Vue.prototype.$http = http;


Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');
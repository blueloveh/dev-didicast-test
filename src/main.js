import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import AWS from 'aws-sdk'
// import VueCarousel from 'vue-carousel';

// import BootstrapVue3 from 'bootstrap-vue-3'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'


createApp(App).mount('#app')
// createApp(App).use(VueCarousel)
createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.$axios = axios;
// app.use(ElementPlus)
// app.use(BootstrapVue3)
// app.use(chime)
// app.use(UUID)
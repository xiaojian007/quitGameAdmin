import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// login背景粒子
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

//  reset CSS
import "normalize.css/normalize.css"

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import '@/styles/index.scss' // global css
// icon
import '@/icons/index'
import '@/permission' // permission control

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")

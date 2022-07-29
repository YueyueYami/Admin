import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'default-passive-events'
//引入面包屑
import MBX from '../src/components/MianBao.vue'
//引入时间过滤器
import moment from 'moment'
//全局时间过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.component('MBX', MBX)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
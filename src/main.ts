import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import '@/common/ts/interface'
Vue.config.productionTip = false
// new App().$mount()
const app = new Vue({
	render: h => h(App),
	//挂载
	store
})
app.$mount()
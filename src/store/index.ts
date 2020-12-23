import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		token: ""
	},
	mutations: {
		setToken(state, setValue) {
			// console.log(state);
			state.token = setValue
		}
	},
	actions: {
		setToken(state,value) {
			console.log(`action value`, value);
			this.commit('setToken', value)
		}
	}
});

export default store;
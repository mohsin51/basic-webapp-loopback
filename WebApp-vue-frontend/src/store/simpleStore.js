import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
       accessToken: null,
       user: null
    },
    mutations: { // must be synch // state is changing 
      setToken:(state, token) => {state.accessToken = token}, //store.commit('setToken', token)
      removeToken :(state) =>{state.accessToken = null},
      setUser:(state, user) => {state.user = user}, 
      removeUser :(state) =>{state.user = null}
    },
    getters:{ // state is not changing just applyinig filter and getting modified
   
    },
    actions: {  // async operations are done here 
   
    }
});

// export default store;
import * as types from './mutation-types'

const mutations =  { // must be synch // state is changing 
    [types.SET_TOKEN](state, token){
        state.accessToken = token
    },

    [types.REMOVE_TOKEN] (state){
        state.accessToken = null
    },

    [types.SET_USER](state, user){
        state.user = user
    }, 
    [types.REMOVE_USER](state){
        state.user = null
    },
    [types.UPDATE_USER](state,user){
        state.user = user
    }
}

export default mutations;
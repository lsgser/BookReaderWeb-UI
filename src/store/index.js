import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import {apiUrl} from '../variables';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	books:[],
  	isLogged:false,
  	user:{},
  	isError:false,
  	errMsg:"",
  },
  mutations: {
  	SET_LOGIN(state,data){
  		if(localStorage.getItem("token")){
  			localStorage.removeItem("token")
  		}
  		localStorage.setItem("token",data.data.token)
  		state.isLogged=true
  	},
  	SET_USER(state,data){
  		state.user = data.data
  	},
  	SET_BOOKS(state,data){

  	},
  	SET_LOGOUT(state){
  		if(localStorage.getItem("token")){
  			localStorage.removeItem("token")	
  		}
  		state.isLogged = false
  	},
  	SET_ACTIVE(state){
  		state.isLogged = true
  	},
  	SET_ERROR(state){
  		state.isError = true
  	},
  	SET_ERROR_MSG(state,errorTxt){
  		state.errMsg = errorTxt
  	},
  	SET_CLEAR_ERROR(state){
  		state.isError = false
  	},
  	SET_CLEAR_ERROR_MSG(state){
  		state.errMsg = ""
  	}
  },
  getters: {
  	getIsLogged:state => { return state.isLogged },
  	getBooks:state =>{return state.books},
  	getModules:state => {return state.modules},
  	getCourses:state => {return state.courses},
  	getUser:state => {return state.user},
  	getErrorMsg:state => {return state.errMsg},
  	getIsError:state => {return state.isError},
  },
  actions: {
  	async login({commit},data){
  		data = JSON.parse(data)
  		commit('SET_CLEAR_ERROR')
  		commit('SET_CLEAR_ERROR_MSG')

  		try{
  			const resp = await axios.post(apiUrl+'user_login',{
  				user:data.user,
  				password:data.password
  			})
  			console.log(resp.data)
  			commit('SET_LOGIN',resp)
  			return resp
  		}catch(err){
  			console.error(err)
  			if(err.response.data.status){
  				commit('SET_ERROR_MSG',err.response.data.status)	
  			}else{
  				commit('SET_ERROR_MSG','Something went wrong')
  			}
  			
  			commit('SET_ERROR')
  		}
  	},
  	async checkActive({commit}){
  		try{
  			const resp = await axios.get(apiUrl+"user_logged/"+localStorage.getItem("token"))
  			commit('SET_ACTIVE')
  			return resp
  		}catch(err){
  			commit('SET_LOGOUT')
  		}
  	},
  	async loadUser({commit}){
  		try{
  			const resp = await axios.get(apiUrl+"user_t/"+localStorage.getItem("token"))
  			commit('SET_USER',resp)
  			return resp
  		}catch(err){
  			console.log(err.response.data.status)
  		}
  	},
  	async loadBooks({commit},data){
  		
  	}
  },
  modules: {
  }
})

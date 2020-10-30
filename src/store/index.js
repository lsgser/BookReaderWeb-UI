import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import {apiUrl} from '../variables';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	books:[],
  	bookLoader:false,
  	isLogged:false,
  	user:{},
  	isError:false,
  	emptyQuery:true,
  	errMsg:"",
  	readMode:false
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
  		state.user.picture = apiUrl.slice(0,-1)+data.data.picture
  	},
  	SET_BOOKS(state,data){
  		state.books = []
  		data.data.forEach((book,index)=>{
  			book.cover_page = apiUrl.slice(0,-1)+book.cover_page
  			book.book = apiUrl.slice(0,-1)+book.book
  			state.books.push(book)
  		})

  		if (state.books.length === 0){
  			state.emptyQuery = false
  		}else{
  			state.emptyQuery = true
  		}
  	},
  	CLEAR_BOOKS(state){
  		state.books = []
  	},
  	SET_LOGOUT(state){
  		if(localStorage.getItem("token")){
  			localStorage.removeItem("token")	
  		}

  		state.isLogged = false
  		state.books=[]
	  	state.bookLoader=false
	  	state.user={}
	  	state.isError=false
	  	state.emptyQuery=true
	  	state.errMsg=""
	  	state.readMode=false
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
  	},
  	SET_BOOK_LOADER(state){
  		state.bookLoader = true
  	},
  	CLEAR_BOOK_LOADER(state){
  		state.bookLoader = false
  	},
  	SET_EMPTY_QUERY(state){
  		state.emptyQuery = true
  	},
  	SET_READ_MODE(state){
  		state.readMode = true
  	},
  	DISABLE_READ_MODE(state){
  		state.readMode = false
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
  	getBookLoader:state => {return state.bookLoader},
  	getEmptyQuery:state => {return state.emptyQuery},
  	getReadMode:state=>{return state.readMode}
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
  			commit('SET_LOGIN',resp)
  			return resp
  		}catch(err){
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
  		commit('CLEAR_BOOKS')
  		try{
  			const res = await axios.get(apiUrl+"book_q/"+data.q)
  			commit('SET_BOOKS',res)
  			return res
  		}catch(err){
  			console.error(err)
  		}
  	},
  	async logout({commit}){
  		try{
  			const res = await axios.delete(apiUrl+"user_logout/"+localStorage.getItem("token"))
  			commit('SET_LOGOUT')
  			return res
  		}catch(err){
  			console.log(err)
  		}
  	}
  },
  modules: {
  }
})

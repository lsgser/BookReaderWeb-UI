<template>
	<v-card
		max-width="400"
		class="mx-auto"	
	>
		<v-app-bar
	      dark
	      color="black"
	    >
	      <v-toolbar-title>Login</v-toolbar-title>

	      <v-spacer></v-spacer>
	    </v-app-bar>
	    <v-container>
	    	<center>
	    		<v-img alt="Vue logo" src="../../assets/logo.png" width="20%" height="20%" class="justify-center mb-3"></v-img>
	    	</center>
	    	<v-alert
				color="red darken-1"
				dark
				class="mb-3 text-center"
				v-if="getIsError"
			>
				{{getErrorMsg}}
			</v-alert>
			<div class="text-center mb-3" v-if="loader">
				<v-progress-circular
					indeterminate
					color="primary"
				>
				</v-progress-circular>
			</div>
			<v-row>
	    		<v-text-field
		            solo
		            rounded
		            label="email or student number"
		            append-icon="mdi-account"
		            v-model="user"
		        >
		        </v-text-field>
		    </v-row>   
	    	<v-row>
	    		<v-text-field
		            solo
		            rounded
		            label="password"
		            append-icon="mdi-lock"
		            type="password"
		            v-model="password"
		        >
		        </v-text-field>
		    </v-row>  
	    </v-container>
	    <v-btn
            color="black"
          	large
          	tile
          	dark
          	width="100%"
          	@click="Login"
        >
            Log in
        </v-btn>
	</v-card>
</template>
<script>
	export default{
		name:'Login',
		computed:{
			getisLogged()
		    {
		        return this.$store.getters.getIsLogged;
		    },
		    getErrorMsg(){
		    	return this.$store.getters.getErrorMsg;
		    },
		    getIsError(){
		    	return this.$store.getters.getIsError;
		    }
		},
		methods:{
			Login(){
				let self = this;
		        if(this.user && this.password){
		          this.loader = true
		          this.$store.dispatch('login',JSON.stringify({user:self.user.trim(),password:self.password})).then(res => {
		          	if(res){//Success
		          		self.name = ""
			          	self.password = ""
			            this.$router.replace("/home")	
		          	}
		          	self.loader=false
		          }).catch(err => {
		            self.loader = false;
		          })
		        }else{
		        	this.$store.commit('SET_ERROR_MSG','Fill in all fields')
		        	this.$store.commit('SET_ERROR')
		        }
			}
		},
		data:()=>({
			user:"",
			password:"",
			loader:false
		})
	}
</script>
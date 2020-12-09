<template>
	<div>
	<v-toolbar 
  		color="red" 
  		class="mb-5"
  		dark 
  	>
  	  <v-toolbar-title>Pride Books</v-toolbar-title>
  	  <v-spacer></v-spacer>
  	  <v-btn color="black" @click="logout">Logout</v-btn>
  	</v-toolbar>
  </div>
</template>

<script>
  export default{
    name:'Logout',
    methods:{
      logout(){
        this.$store.dispatch('logout').then(res=>{
          if(res){
            this.$router.replace("/")  
          }
        }).catch(err=>{
          console.error(err)
        })
      }
    }
  }
</script>
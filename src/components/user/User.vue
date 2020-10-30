<template>
	<div>
		<v-row class="space-around mb-3 centered" v-if="loaded">
			<v-spacer></v-spacer>
			<v-avatar
				size="80"
				centered
			>
			  <img :src="getUser.picture" alt="user">
			</v-avatar>
			<v-spacer></v-spacer>
		</v-row>
		<center class="mb-3">
			<h4 class="font-weight-light">Name: {{getUser.name}}</h4>
			<h4 class="font-weight-light">Surname: {{getUser.surname}}</h4>
			<h4 class="font-weight-light">Email: {{getUser.email}}</h4>
		</center>
	</div>
</template>

<script>
	export default{
		name:'User',
		computed:{
			getUser(){
				return this.$store.getters.getUser
			}
		},
		beforeMount(){
			this.$store.dispatch('loadUser').then(res =>{
				this.loaded = true
			})
		},
		data:()=>({
			loaded:false
		})
	}
</script>
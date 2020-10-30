<template>
	<div v-if="getIsLogged" class="container">
		<User v-show="!getReadMode"/>
		<BookInput v-show="!getReadMode"/>
		<Book/>
	</div>
</template>

<script>
	import User from '@/components/user/User.vue'
	import BookInput from '@/components/input/BookInput.vue'
	import Book from '@/components/book/Book.vue'

	export default{
		name:'Main',
		components:{
			User,
			BookInput,
			Book
		},
		computed:{
			getIsLogged(){
				return this.$store.getters.getIsLogged
			},
			getReadMode(){
				return this.$store.getters.getReadMode
			}
		}
	}
</script>
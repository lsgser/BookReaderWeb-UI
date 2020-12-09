<template>
    <div>
    	<v-text-field
            solo
            rounded
            label="Search for a book"
            append-icon="mdi-magnify"
            class="mb-3"
            v-model="query"
            @keyup="searchBook($event)"
        >
        </v-text-field>
        <div class="text-center mb-3" v-if="getBookLoader">
            <v-progress-circular
                indeterminate
                color="primary"
            >
            </v-progress-circular>
        </div>
    </div>
</template>

<script>
export default{
	name:'BookInput',
    computed:{
        getBookLoader(){
            return this.$store.getters.getBookLoader
        }
    },
    methods:{
        searchBook(e){
            let self = this
            /*
                For recommended books,if the query is empty 
                display the recommended list
            */
            this.$store.commit('IS_TYPED',{q:this.query.trim()})
            
            if(this.query.trim())
            {
                if(!(e.keyCode > 36 && e.keyCode < 41))
                {
                    this.$store.commit('SET_BOOK_LOADER')
                    this.userExistsLoader = true
                    this.$store.dispatch('loadBooks',{q:this.query}).then(res=>{      
                        this.$store.commit('CLEAR_BOOK_LOADER')
                    })
                }
            }
            else
            {
                this.$store.commit('CLEAR_BOOKS')   
                this.$store.commit('SET_EMPTY_QUERY')
                this.$store.commit('CLEAR_BOOK_LOADER')
            }
        }
    },
	data:() => ({
		query:""
	})
}
</script>
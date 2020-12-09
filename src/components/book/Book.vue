<template>
	<v-container grid-list-md text-xs-center>
	  	<v-alert dark color="primary" v-show="getBooks.length === 0 && !getBookLoader && !getEmptyQuery && !getReadMode">
	  		Book not found
	  	</v-alert>
	  	<!--
      	<v-layout row wrap v-show="!getReadMode">
	        <v-flex xs12 sm6 md4 lg3 v-for="book in getBooks" :key="book.isbn">
	          	<v-card tile max-width="60%">
				    <img
		          	  :src="book.cover_page"
				      height="100%"
				      width="100%"
				     />
				     
				    <v-card-title>
				      {{book.title}}
				    </v-card-title>
					
				    <v-card-subtitle>
				      {{book.author}}
				    </v-card-subtitle>
				    
				    <v-card-subtitle>
				      ISBN: {{book.isbn}}
				    </v-card-subtitle>

				    <v-card-subtitle>
				      {{book.publish_date}}
				    </v-card-subtitle>

				    
				    <v-btn
				       color="success"
				       @click="readBook(book.book)"
				       width="100%"
				       tile
				    >
				       Read
				     </v-btn>
				   
	          	</v-card>
	        </v-flex>
      	</v-layout>
		-->
		<v-list three-line v-if="!getIsTyped && !getReadMode">
		 	<div v-if="getRecommended.length">
				<h3 class="font-weight-light mb-3">Recommended books by modules</h3>
			</div>
		    <div v-for="(recommend, index) in getRecommended" :key="recommend.isbn+index">
		      	<v-divider
		        ></v-divider>
		        <v-subheader
		          v-text="recommend.module"
		        ></v-subheader>
		        <v-list-item
		        	@click="readBook(recommend.book)"
		        >
			        <v-list-item-avatar
			        	tile
		        		size="70"
			        >
			          <v-img :src="recommend.cover_page"></v-img>
			        </v-list-item-avatar>

			        <v-list-item-content>
			            <v-list-item-title>{{recommend.title}}</v-list-item-title>
			            <v-list-item-subtitle>{{recommend.author}}</v-list-item-subtitle>
			            <v-list-item-subtitle>ISBN: {{recommend.isbn}}</v-list-item-subtitle>
				        <v-list-item-subtitle>{{recommend.publish_date}}</v-list-item-subtitle>
			        </v-list-item-content>
		        </v-list-item>
		        <v-divider
		        ></v-divider>
		    </div>
	    </v-list>
		<v-list three-line v-if="!getReadMode">
		    <div v-for="book in getBooks" :key="book.isbn">
		    	<v-divider
		        ></v-divider>
			        <v-list-item
			          v-if="book.cover_page"
			          @click="readBook(book.book)"
			        >
				        <v-list-item-avatar
				        	tile
			        		size="70"
				        >
				          <v-img :src="book.cover_page"></v-img>
				        </v-list-item-avatar>

				        <v-list-item-content>
				            <v-list-item-title >{{book.title}}</v-list-item-title>
				            <v-list-item-subtitle >{{book.author}}</v-list-item-subtitle>
				            <v-list-item-subtitle >ISBN: {{book.isbn}}</v-list-item-subtitle>
				            <v-list-item-subtitle >{{book.publish_date}}</v-list-item-subtitle>
				        </v-list-item-content>
			        </v-list-item>
		        <v-divider
		        ></v-divider>
		    </div>
	    </v-list>
      	<div style="width: 55%" v-if="getReadMode" class="mx-auto">
      			<center class="mb-3">
      				<v-btn color="primary" @click="readModeOff" dark>Search for another book</v-btn>
      				<h5>Total pages {{numPages}}</h5>
      				<v-text-field  
      				 v-model.number="page" label="Enter page number" @change="selectPage($event)">
      				</v-text-field>
      				<v-btn @click="rotate -= 90" color="success" class="mr-2 mb-3">&#x27F2;</v-btn>
					<v-btn @click="rotate += 90" color="success" class="mb-3">&#x27F3;</v-btn>
					<!--
					<br>
						<v-btn @click="$refs.pdf.print()" class="success mb-3"><v-icon>mdi-printer</v-icon></v-btn>
					-->
      			</center>
				<div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
				<pdf v-if="getReadMode" ref="pdf" style="border: 1px solid red" :src="src" :page="page" :rotate="rotate" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
				<center>
					<br>
					<v-btn class="primary mr-2 mb-3" @click="previousPage"><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
					<v-btn class="primary mb-3" @click="nextPage"><v-icon>mdi-arrow-right-bold</v-icon></v-btn>
				</center>
		</div>
    </v-container>
</template>

<script>
	import pdf from 'vue-pdf'
	export default{
		name:'Book',
		components:{
			pdf:pdf
		},
		computed:{
			getBooks(){
				return this.$store.getters.getBooks
			},
			getBookLoader(){
				return this.$store.getters.getBookLoader
			},
			getEmptyQuery(){
				return this.$store.getters.getEmptyQuery

			},
			getReadMode(){
				return this.$store.getters.getReadMode
			},
			getUser(){
				return this.$store.getters.getUser
			},
			getRecommended(){
				return this.$store.getters.getRecommended
			},
			getIsTyped(){
				return this.$store.getters.getIsTyped
			}
		},
		methods:{
			readBook(book){
				this.src=book
				this.$store.commit('SET_READ_MODE')
			},
			nextPage(){
				if ((parseInt(this.page)+1)<=0 || (parseInt(this.page)+1)>this.numPages){
					this.page=1
				}else{
					this.page = parseInt(this.page) + 1 
				}
			},
			previousPage(){
				if(this.page===NaN || this.page ===undefined || this.page ===""){
					this.page=1
				}

				if ((parseInt(this.page)-1)<=0 || (parseInt(this.page)-1)>this.numPages){
					this.page=1
				}else{
					this.page = parseInt(this.page)-1
				}
			},
			selectPage(e){
				if (parseInt(this.page)<=0 || parseInt(this.page)>this.numPages){
					this.page=1
				}else{
					this.page = parseInt(this.page)
				}
			},
			readModeOff(){
				this.$store.commit('DISABLE_READ_MODE')
			},
			error: function(err) {
				console.log(err);
			}
		},
		data:()=>({
			read_mode:false,
			src:'',
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate:0
		})
	}
</script>
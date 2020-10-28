<template>
	<v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <!--
        <v-flex style="width: 1000px;">
          <v-card>
            <v-card-text>First Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Second Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Third Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex style="width: 500px;">
          <v-card>
            <v-card-text>Fourth Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Fifth Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Sixth Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Seventh Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex style="width: 400px;">
          <v-card>
            <v-card-text>Eighth Card</v-card-text>
          </v-card>
        </v-flex>
        -->
        <v-flex width="25%">
          <v-card tile>
		    <img
          	  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
		      height="200px"
		      width="100%"
		     />
		    <v-card-title>
		      Top western road trips
		    </v-card-title>

		    <v-card-subtitle>
		      1,000 miles of wonder
		    </v-card-subtitle>
		    <v-card-actions>
		      <v-btn
		        color="orange lighten-2"
		        text
		      >
		        Explore
		      </v-btn>

		      <v-spacer></v-spacer>
		    </v-card-actions>
          </v-card>
        </v-flex>
        
        <v-flex width="25%">
          <v-card tile>
		    <img
          	  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
		      height="200px"
		      width="100%"
		     />

		    <v-card-title>
		      Top western road trips
		    </v-card-title>

		    <v-card-subtitle>
		      1,000 miles of wonder
		    </v-card-subtitle>
		    
		    <v-card-actions>
		      <v-btn
		        color="orange lighten-2"
		        text
		      >
		        Explore
		      </v-btn>
		    </v-card-actions>

		   
          </v-card>
        </v-flex>
        
        <v-flex width="25%">
          <v-card tile>
		   <img
          	  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
		      height="200px"
		      width="100%"
		     />

		    <v-card-title>
		      Top western road trips
		    </v-card-title>

		    <v-card-subtitle>
		      1,000 miles of wonder
		    </v-card-subtitle>
		    
		    <v-card-actions>
		      <v-btn
		        color="orange lighten-2"
		        text
		      >
		        Explore
		      </v-btn>

		      <v-spacer></v-spacer>
		    </v-card-actions>
           </v-card>
        </v-flex>
        
        <v-flex>
          <v-card tile>
          	<img
          	  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
		      height="200px"
		      width="100%"
		     />
            <v-card-text>Fourth Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Fifth Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Sixth Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Seventh Card</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
          <v-card>
            <v-card-text>Eighth Card</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
	export default{
		name:'User',
		computed:{
			getUser(){
				return this.$store.getters.getUser
			},
			getBooks(){
				return this.$store.getters.getBooks
			}
		},
		data:()=>({
			show:false
		})
	}
</script>
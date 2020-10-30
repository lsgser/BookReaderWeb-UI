<template>
  <v-app>
    <Offline v-if="!getIsLogged && loaded"/>
    <Online v-if="getIsLogged && loaded"/>
    <div v-if="loaded">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Offline from './components/navigation/Offline.vue';
import Online from './components/navigation/Online.vue';

export default {
  name: 'App',
  components: {
    Offline,
    Online
  },
  computed:{
    getIsLogged(){
      return this.$store.getters.getIsLogged;
    }
  },
  beforeCreate(){
    this.$store.dispatch('checkActive').then(res=>{
      if (res){
        if (this.$route.fullPath !== "/home"){
          this.$router.replace("/home")
        }
      }else{
        if (this.$route.fullPath === "/home"){
          this.$router.replace("/")
        }
      }
      this.loaded = true
    })
  },
  data: () => ({
    loaded:false
  }),
};
</script>
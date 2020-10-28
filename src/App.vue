<template>
  <v-app>
    <Offline v-if="!getIsLogged && loaded"/>
    <Online v-if="getIsLogged && loaded"/>
    <router-view/>
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
      this.loaded = true
    }).catch(err => {
      this.loaded = true
    })
  },
  data: () => ({
    loaded:false
  }),
};
</script>
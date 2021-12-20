<template>
  <div class="bg-purple text-white sm:bg-green md:bg-blue md:text-yellow lg:bg-red xl:bg-orange ...">
    Test Tailwind
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'App',
  components: {},
  methods: {
    // loadCount:  async function () {      
    //   let result= await axios.get(`${process.env.VUE_APP_APIURL}`);      
    //   this.count=result.data.changed;     
    //   setTimeout(this.loadCount,3000);    
    // }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

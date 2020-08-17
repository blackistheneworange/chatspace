<template>
  <div id="app">
    <Header :header="header"/>
    <router-view :info="info" v-on:login="login" v-on:logout="logout" v-on:setHeaderDisplay="setHeaderDisplay"></router-view>
    <Footer/>
  </div>
 </div>
</template>

<script>

  import Header from './components/common/Header';
  import Footer from './components/common/Footer';

  export default{
    name:'app',
    components:{Header,Footer},
    data(){
      return{
        info:{
	  name:'',
	  spaceID:'',
	},
	header:true
      }
    },
    methods:{
      login({name,spaceID}){
        
	this.info={...this.info,name:name,spaceID:spaceID}
      },

      logout(){
        this.info={...this.info,name:'',spaceID:''}
      },

      setHeaderDisplay(condition){
        this.header=condition;
      }
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
}
</style>

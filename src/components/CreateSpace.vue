<template>
  <router-view :isDual='isDual' :isTemp='isTemp' v-on:chatType='chatType'></router-view>
</template>

<script>
  export default{
    name:"create space",
    data(){
      return{
        isDual:false,
	isTemp:true
      }
    },

    created(){
      this.$router.replace('/space/create/1')
    },
    

    methods:{
      chatType(option){
        option==='dual'?this.isDual=true:this.isDual=false;
      }
    }
  }
</script>

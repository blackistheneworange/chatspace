<template>
<div class="container">
<div class="row">
  <div class="col-12 col-md-8 offset-md-2 d-flex flex-column justify-content-center">
    <main>
    <h3 class='text-center'>JOIN A SPACE</h3>
    <form @submit='handleSubmit' class='d-flex flex-column justify-content-center'>
      <div class="input-field" v-if="input1">
        <label for="spaceID">Enter Space ID</label>
        <input type="text" class="form-control" placeholder="Enter Space ID here..." id="spaceID" v-model="spaceID"/>
      </div>
      <div class="input-field" v-if="!input1">
        <label for="name">Enter your name</label>
        <input type="text" class="form-control" placeholder="Your display name goes here..." id="name" v-model="name"/>
      </div>

      <div class='form-footer'>
        <div class="info-box" v-bind:class="{'error':!isError}">{{info}}</div>
        <button type="submit" id="submit">Next</button>
      </div>
    </form>
    </main>
  </div>
</div>
</div>
</template>

<script>
  import axios from 'axios';
  import {serverSite} from '../config';

  export default{
    name:"Space Login",
    data(){
      return{
        name:'',
	spaceID:'',
	isError:false,
	info:'',
	input1:true
      }
    },
    mounted(){
    
      if(this.$route.query &&this.$route.query.spaceID){
        this.spaceID=this.$route.query.spaceID;
        this.postToServer();
      }
    },
    
    methods:{
      handleSubmit(e){
        e.preventDefault()
	this.isError=false;
	
	if(!this.input1 && this.name===''){
	  this.isError=true;
	  this.info='Enter Your Name';
	  return;
	}
	this.postToServer();
      },

      postToServer(){

	const btn=document.querySelector("#submit");
	const type=this.input1?'spaceID':'name';
	
	btn.style.opacity="0.5";
	btn.textContent=this.input1?"Loading...":"Joining...";
	btn.disabled=true;
	axios.post(`${serverSite}join`,{name:this.name,spaceID:this.spaceID,type:type})
	.then(res=>{
	  
	  this.$emit('login',{name:this.name,spaceID:this.spaceID})

	  if(type==='name'){
	    this.$router.push('/space');
	  }
	  else{
	    btn.textContent='Join';
	    this.input1=false;
	  }

	})
	.catch(err=>{
	  this.isError=true;
	  this.info=err.response && err.response.data?err.response.data:err;
	})
	.finally(()=>{
	  btn.style.opacity="1";
	  btn.textContent="Join";
	  btn.disabled=false;
	})
	
      }
    }
  }
</script>

<style scoped>

*{
  text-align:left;
}
div.row{
  margin-top:80px;
  margin-bottom:80px;
}
main{
  color:#000;
  background:#fdfdfd;
  padding:16px;
  border-radius:6px;
  box-shadow:0 0 3px 1px #aaaaaa;
}
main>*{
  margin:30px 0;
}

h3{
  
  padding:10px;
  background:#2e9cb8;
  border-radius:24px;
  color:#fff;
  letter-spacing:3px;
  box-shadow:5px 5px 3px 1px #bbbbbb;
}
form>*{
  margin:16px 0;
}

label{
  font-weight:400;
  margin:0 0 3px 4px;
  font-size:1.4rem;
}

div.form-footer{
  margin-top:20px;
}
div.info-box{
  color:#fff;
  font-weight:bold;
  background:#d67b6b;
  text-align:center;
  padding:6px;
  border-radius:6px;
}

input{
  padding:20px 6px;
  font-size:1.1rem;
}

form button{
  width:100%;
  outline:none;
  border:none;
  background-color:#349dc7;
  padding:6px;
  border-radius:6px;
  margin-top:4px;
  color:#fff;
  font-size:1.2rem;
  font-weight:bold;
  box-shadow:0 0 3px 0 #000;
  transition:opacity 0.4s ease;
  text-align:center;
}
.error{
  display:none;
}


</style>

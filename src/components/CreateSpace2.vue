<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Choose A Space Type</h1>
	<div class="options space-type">
	  <button>
	    <div class="unselectable">
	      <h5>Temporary</h5>
	      <ul>
	      <li>No messages are stored</li>
	      <li>Space is automatically destroyed when everyone leaves</li>
	      </ul>
	      <div v-if="isTemp" class="selected">SELECTED</div>
	    </div>
	  </button>
	</div>
      </div>

      <div class="col-12">
        <button id="process" @click='process'>CREATE</button>
      </div>
    </div>

  </div>
</template>

<script>
    
  import axios from 'axios';
  import {serverSite} from '../config';

  export default{

    name:'create space',
    props:['isDual','isTemp'],
    data(){
      return{
	isTemp:true
      }
    },
    methods:{
      process(){
        const btn=document.querySelector("button#process");
	btn.style.opacity="0.6";
	btn.textContent="Creating...";
	btn.disabled=true;


	axios.post(`${serverSite}create`,{type:"temp",chat:this.isDual?"dual":"multiple"})
	.then(res=>{
	  this.$router.push('/space/join?spaceID='+res.data)
	})
	.catch(err=>{
	  alert(err)
	})
	.finally(()=>{
	  btn.style.opacity="1";
	  btn.textContent="Create";
	  btn.disabled=false;
	})
      },

      
    }
  }
</script>

<style scoped>
h1{
  font-size:1.4rem;
  text-transform:uppercase;
  letter-spacing:1px;
}
div.options{
  display:flex;
  justify-content:space-around;
  margin:10px;
}
div.options>*{
  padding:20px 20px 40px 20px;
  margin:20px;
  background:#f3f3f3;
  border-radius:8px;
  box-shadow:2px 2px 1px 0 #555;
  position:relative;
  cursor:pointer;
}
button{
  outline:none;
  letter-spacing:1px;
}

ul li{
  text-align:left;
  
}
button#process{
  width:90%;
  border:none;
  padding:12px;
  margin:20px auto;
  background:#e6bc4c;
  box-shadow:2px 2px 1px 0px #000;
  font-weight:600;
  transition:opacity 0.4s ease;
  text-transform:uppercase;
}

div.selected{
  position:absolute;
  bottom:0;left:0;
  width:100%;
  padding:6px;
  background:#00aa00;
  color:#fff;
  border-radius:0 0 8px 8px;
}
.unselectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
}
@media (max-width:660px){
  div.options{
    flex-direction:column;
  }
}
</style>

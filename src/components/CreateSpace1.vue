<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Choose A Chat Type</h1>
	<div class="options chat-type">
	  <button @click="changeOption('dual')">
	    <div class="unselectable">
	    <h5>Dual</h5>
	    <p>Only two persons can chat at a time</p>
	    <div v-if="isDual" class="selected">SELECTED</div>
	    </div>
	  </button>
	  <button @click="changeOption('multiple')">
	    <div class="unselectable">
	    <h5>Multiple</h5>
	    <p>Multiple persons can chat at a time</p>
	    <div v-if="!isDual" class="selected">SELECTED</div>
	    </div>
	  </button>
	</div>
      </div>

      <div class="col-12">
        <button id="process" @click='process'>NEXT</button>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    name:'create space 1',
    props:['isDual'],
    data(){
      return{
	
      }
    },
    methods:{
      process(){
        this.$router.push('2')
      },

      changeOption(x){
        this.$emit('chatType',x)
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

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Create Private Chat Spaces To Talk With Your Friends, Colleagues, Family And Everyone You Love Around The World.</h1>
	<div class="action-buttons">
	  <router-link to="/space/create"><button id="create">Create</button></router-link>
	  <router-link to="/space/join"><button id="join">Join</button></router-link>
	</div>
      </div>
      <h3>WHY CHAT SPACE?</h3>
      <p>This is a secure system with an auto destroy feature. Also,</p>
      <ul>
        <li>Every space is destroyed automatically once everyone in that space leaves.</li>
	<li>Messages in a space are not stored anywhere.</li>
	<li>No account creation needed to create/join a space.</li>
	<li>Spaces have infinite lifetime until the last active user leaves. It can remain as long as you want it to be.</li>
      </ul>
      <h3>That sums up the whole features of Chat Space. Create a space and start chatting now...</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>


<style scoped>

div.container{
  margin-top:90px;
  margin-bottom:60px;
}
h1,h3{
  font-size:1.7rem;
  letter-spacing:2px;
  line-height:32px;
  text-align:left;
  text-transform:uppercase;
}
h3{
  margin:24px 16px 2px 16px;
}
p{
  margin:8px 16px;
  letter-spacing:2px;
  text-align:left;
  line-height:20px;
}
.action-buttons{
  display:flex;
}
button{
  border:none;
  outline:none;
  padding:8px 20px;
  font-size:1.5rem;
  margin:16px 16px 16px 0;
  background:#50bbcc;
  color:#fff;
  border-radius:4px;
  box-shadow:4px 4px 3px 1px #aaaaaa;
  letter-spacing:2px;
  text-transform:uppercase;
}
ul{
  margin:10px;
}
ul li{
  text-align:left;
  margin-top:6px;
  letter-spacing:2px;
  line-height:20px;
}

</style>

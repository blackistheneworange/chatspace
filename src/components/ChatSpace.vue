<template>
<div class="container main">
 <div class="row">
  <div class="col-12 p-0">
    <header>
      <h3>Chat Space</h3>
      <button @click='forceDisconnect'>Leave</button>
    </header>
  </div>

  <div class="col-12 col-md-3 p-0">
    <aside>
    <div class="space-id">
      <h6>Space ID <button id="invite" @click="toggleInviteBox">Invite</button></h6>
      <h5>{{info.spaceID}}</h5>
    </div>

    <div class="active-users">
    <h6>Active Users</h6>
    <ul>
      <li v-for="user in users" :key="user">{{user}}</li>
    </ul>
    
    </div>
    </aside>
  </div>
  <div class="col-12 col-md-9 p-0">	
    <div id="chat-box">
      <p></p>
    </div>
  </div>

  <div class="col-12 p-0">
    <form @submit='sendMessage'>
      <input type="text" id="msg" placeholder="Enter your message..." v-model="message"/>
      <button id="send-message" type="submit">Send</button>
    </form>
  </div>
 </div>

 <div class="invite-menu">
   <h3>Invite Link</h3>
   <p>{{url}}/join?spaceID={{info.spaceID}}</p>
 </div>
</div>

</template>

<script>
  import io from 'socket.io-client';
  import {serverSite} from '../config';
  import {formatTime} from '../server/utils';

  export default{
    name:"chat-space",
    props:{
      info:Object
    },
    data(){
      return{
       state:false,
       message:'',
       users:[],
       socket:null,
       inviteBox:false,
       url:window.location.href
      }  
      
    },

    mounted(){
      this.$emit('setHeaderDisplay',false)
    },
    created(){

      if(this.info.name===''||this.info.spaceID===''){
        return this.$router.push('/space/join')
      }
      this.socket=io.connect(serverSite);

      this.socket.emit('join-room',{name:this.info.name,spaceID:this.info.spaceID})

      this.socket.on('info',(info)=>{
        this.users=info.users;
	this.insertInfo(info)
      })

      this.socket.on('message',({message,name,time})=>{

        this.insertMessage(message,name,time)
      })
    },
    methods:{

      insertMessage(message,name,time,own=false){

        const align=own?'left':'right';
	const margin=own?'12px auto 12px 12px':'12px 12px 12px auto';
	const float=own?'left':'right';

	const chatBox=document.querySelector("#chat-box");
	const clearFloat=document.createElement('div');
	const msgOuter=document.createElement('div')
	const msg=document.createElement('p');
	const nameDate=document.createElement('p');

	clearFloat.style.cssText='clear:both;';

	msgOuter.style.cssText='display:inline-block;max-width:80%;background-color:#e8eaed;margin:9px 12px;padding:4px 12px;float:'+float+';border-radius:8px;box-shadow:0 0 3px 1px #f3f3f3;text-align:'+align;

	nameDate.style.cssText='font-size:0.7rem;padding:0;margin:0;font-weight:bold;text-align:left;';
	msg.style.cssText='font-size:1rem;padding:0;margin:0;text-align:left;line-height:22px;';

	msg.textContent=message;
	document.querySelector("input[type=text]").value="";
	nameDate.textContent=`${name}, ${time}`;
	this.message="";

	msgOuter.appendChild(nameDate);
	msgOuter.appendChild(msg)

	chatBox.appendChild(clearFloat);
	chatBox.appendChild(msgOuter);
	chatBox.scrollTop=chatBox.scrollHeight;

      },

      insertInfo(i){

        const chatBox=document.querySelector("#chat-box");
	const clearFloat=document.createElement('div');

        const info=document.createElement('center');
	info.textContent=i.msg;

	
	info.style.cssText='clear:both;padding:8px;background:#5694d6;font-weight:bold;width:80%;margin:10px auto;border-radius:14px;font-size:0.8rem;color:#fff;';
	
	chatBox.appendChild(info);
	chatBox.scrollTop=chatBox.scrollHeight;
      },

      sendMessage(e){
        e.preventDefault();

	if(e.target.elements.msg.value===""){
	  e.target.elements.msg.focus();
	  return;
	}
        this.socket.emit('message',this.message)
	this.insertMessage(this.message,this.info.name,formatTime(),true);
	e.target.elements.msg.focus();
      },

      forceDisconnect(){
        this.socket.emit('forceDisconnect');
	this.$emit('logout');
	this.$router.push('/space/join')
      },

      toggleInviteBox(){
        const box=document.querySelector(".invite-menu")
        if(this.inviteBox===false){
	 // box.style.display="block";
	  box.style.transform="translateY(0)"
	  this.inviteBox=true;
	}
	else{
	 // box.style.display="none";
	  box.style.transform="translateY(500px)";
	  this.inviteBox=false;
	}
      }
    },

    beforeDestroy(){
      this.socket.emit('forceDisconnect');
      this.$emit('setHeaderDisplay',true)
    }
  }

</script>

<style scoped>

div.container.main{
  width:90%;
  margin:0 auto;
  border-radius:8px;
  box-shadow:0 0 4px 1px #aaaaaa;
  margin-top:70px;
  margin-bottom:90px;
}

#chat-box{
  height:260px;
  overflow-y:scroll;
  text-align:right;
}

header{
  color:#fff;
  background:#5d8bd4;
  display:flex;
  justify-content:space-between;
  border-radius:8px 8px 0 0;
}
header>*{
  margin:10px 7px;
}
header button{
  background:#fff;
  outline:none;
  border:none;
  border-radius:4px;
  box-shadow:0 0 2px 1px #5d8bd4;
  font-weight:bold;
  font-size:0.8rem;
  color:#5687d6;
  padding:10px;
}

aside{
  color:#fff;
  background:#4d7ac4;
  display:flex;
  flex-direction:column;
  height:100%;
}
aside>*{
  text-align:left;
  margin:12px;
}
aside>div.space-id{
  text-align:left;
  width:86%;
}
aside>div.space-id>h5{
  background:#2f5182;
  border-radius:6px;
  padding:5px;
  width:100%;
  overflow-x:scroll;
}

aside>div.active-users>ul{
  height:100px;
  overflow-y:scroll;
  background-color:#2f5182;
  border-radius:5px;
  list-style-type:none;
  text-align:left;
  margin:0 0 0 4px;
  padding:2px;
}
aside>div.active-users>ul>li{
  padding:0 4px;
}
aside>div.active-users{
  width:86%;
}
button#invite{
  border:2px solid #ac34c3;
  outline:none;
  color:#fff;
  background:none;
  border-radius:4px;
}

input{
  width:80%;
  padding:8px;
  border-radius:0 0 0 8px;
  outline:none;
}
button[type="submit"]{
  width:20%;
  outline:none;
  border:2px solid #416fb0;
  padding:8px 2px;
  border-radius:0 0 8px 0;
  background:#416fb0;
  color:#fff;
}

.invite-menu{
  position:fixed;
  width:100%;
  background:#96c4d6;
  bottom:0;left:0;
  padding:20px;
  transform:translateY(500px);
  transition:transform 0.6s ease;
  box-shadow:-12px 1 2px 0 #000;
}
.invite-menu>p{
  background:#343434;
  padding:6px;
  color:#fff;
  border-radius:6px;
}
@media (max-width:660px){
  aside{
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
  }

  aside>div.active-users{
    width:46%;
  }
  aside>div.space-id{
    width:40%;
  }

  aside>div.active-users>ul{
    height:50px;
  }
}

</style>

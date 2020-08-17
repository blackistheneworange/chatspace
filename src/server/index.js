const express=require('express');
const bp=require('body-parser')
const cors=require('cors')
const http=require('http')
const socketio=require('socket.io')

const {getUser,insertUser,getUsers,deleteUser,formatMessage,getSpace,insertSpace,alterUserCount} =require('./utils');
const chatRouter=require('./routes/chatRouter');

const app=express();
const server=http.createServer(app)
const io=socketio(server)

const port=process.env.PORT||3000;

app.use(bp.urlencoded({extended:true}),bp.json())
app.use(cors())

app.use('/',chatRouter)

io.on('connection',socket=>{
	
	socket.on('join-room',(user)=>{
		

		socket.join(user.spaceID)

		insertUser(socket.id,user.name,user.spaceID)
		alterUserCount(user.spaceID,"increment");

		const users=getUsers(user.spaceID).map(user=>(user.name))

                socket.emit('info',{msg:'Welcome To Chat Space',users:users});
	        socket.to(user.spaceID).broadcast.emit('info',{msg:`${user.name} has joined the chat`,users:users});

	})
	socket.on('message',(msg)=>{

		const {name,spaceID}=getUser(socket.id)
		socket.to(spaceID).broadcast.emit('message',formatMessage(name,msg))
	})

	socket.on('forceDisconnect',()=>{
		socket.disconnect()
	})

	socket.on('disconnect',()=>{
		
		const user=getUser(socket.id);

		if(user){
		  const users=getUsers(user.spaceID).map(u=>(u.name)).filter(name=>name!==user.name)
		  deleteUser(socket.id);

		  alterUserCount(user.spaceID,"decrement")

		  io.to(user.spaceID).emit('info',{msg:`${user.name} has left the chat`,users:users})
		}
	})
})



server.listen(port,()=>{
	console.log(`Listening on port ${port}`)
})


const router=require('express').Router();

const {getSpace,getUsers,insertSpace} =require('../utils');


router.post('/join',(req,res)=>{

	const {spaceID,name,type}=req.body;

	const space=getSpace(spaceID);

	if(space && space.chat==="dual" && space.users>=2){
		return res.status(403).send("Space Is Full")
	}

	if(type==='spaceID' && !getSpace(spaceID)){
		return res.status(403).send("Invalid Space ID")
	}
	if(type==='name' && getUsers(spaceID).map(user=>user.name).includes(name)){
		return res.status(403).send("Name Already In Use")
	}
	res.send();
})

router.post('/create',(req,res)=>{

	const {type,chat}=req.body;

	const id=insertSpace({type:type,chat:chat}).toString();
	res.send(id)

})

module.exports=router;

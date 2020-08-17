
const spaces=[];
const oldIDs=[];

let ids=10234;

const getSpace=(sId)=>{
	return spaces.find(space=>space.id===sId)
}

const insertSpace=({type,chat})=>{

	let id;
	if(oldIDs.length>0){
		id=oldIDs[0];
		oldIDs.splice(0,1)
	}
	else{
		id=ids++;
	}

	const space={id:id.toString(),type:type,chat:chat,users:0}
	spaces.push(space)

	return space.id;
}

const alterUserCount=(id,method)=>{
	const index=spaces.findIndex(space=>space.id===id)

	if(!spaces[index])return;

	if(method==="increment"){
		spaces[index].users++;
	}
	else{
		spaces[index].users--;
		if(spaces[index].users===0){
			oldIDs.push(parseInt(spaces[index].id));
			spaces.splice(index,1)
		}
	}
	return;
}


module.exports={
	getSpace,
	insertSpace,
	alterUserCount
}

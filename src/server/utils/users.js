
const users=[];

const getUser=(id)=>{
	const user=users.find(user=>user.id===id)

	if(user){
		return user;
	}
}

const insertUser=(id,name,spaceID)=>{

	const user={id,name,spaceID}

	users.push(user)
}

const getUsers=(spaceID)=>{
	return users.filter(user=>user.spaceID===spaceID);
}

const deleteUser=(id)=>{
	const index=users.findIndex(user=>user.id===id)
	return users.splice(index,1)[0]
}

module.exports={
	getUser,
	getUsers,
	insertUser,
	deleteUser
}


const {getUser,insertUser,getUsers,deleteUser}=require('./users');
const {getSpace,insertSpace,alterUserCount}=require('./spaces');
const formatMessage=require('./formatMessage');
const formatTime=require('./formatTime');

module.exports={
	getUser,
	insertUser,
	getUsers,
	deleteUser,
	getSpace,
	insertSpace,
	alterUserCount,
	formatMessage,
	formatTime
}

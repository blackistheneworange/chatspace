
module.exports=(date=new Date())=>{

	const amORpm=date.getHours()<12?'AM':'PM';
	const hours=date.getHours()<=12?date.getHours():date.getHours()-12;
	const minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
	const time=hours+':'+minutes+' '+amORpm;

	return time;

}

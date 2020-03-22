function isValidDate2(y, m, d){
	var dt = new Date(y, m-1, d);
	var check = ((y == dt.getFullYear()) && ((m-1) == dt.getMonth()) && (d == dt.getDate()));
	return check && (dt >= new Date());
}

function getDate(date){
	var day = date[0]+date[1];
	var mount = date[3]+date[4];
	var year = date[6]+date[7]+date[8]+date[9];
	var dt = new Date(year, mount-1, day);
	return dt;
}

function getDateString(dt){
	var day = dt.getDate();
	day = (day<10)? '0'+day: day;
	var month = dt.getMonth()+1;
	month = (month<10)? '0'+month: month;
	return day+'.'+month+'.'+dt.getFullYear();
}
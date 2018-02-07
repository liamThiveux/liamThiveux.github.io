function createCookie(name, value, days) {
	var expires = "";
	if (days) {
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	var cookie = name + "=" + value + expires + "; path=" + "/";
	document.cookie = cookie;
}

function getCookie(cname) {
	 var name = cname + "=";
	 var decodedCookie = decodeURIComponent(document.cookie);
	 var ca = decodedCookie.split(';');
	 for(var i = 0; i <ca.length; i++) {
			 var c = ca[i];
			 while (c.charAt(0) == ' ') {
					 c = c.substring(1);
			 }
			 if (c.indexOf(name) == 0) {
					 return c.substring(name.length, c.length);
			 }
	 }
	 return "";
}
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

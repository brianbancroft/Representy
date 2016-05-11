function langEn(){
	document.getElementsByTagName("html")[0].setAttribute("lang", "en-CA");
	document.getElementsByTagName("html")[0].setAttribute("xml:lang", "en-CA");	
}
function langFr(){
	document.getElementsByTagName("html")[0].setAttribute("lang", "fr-CA");
	document.getElementsByTagName("html")[0].setAttribute("xml:lang", "fr-CA");	
}
var a= document.location.href;	
var b= document.location.href.length;	
var x= a.substr(b-6);
if (x.substr(1,1)=='e') langEn();
   else if (x.substr(1,1)=='f') langFr(); 
   else if (x.substr(0,1)=='f') langFr(); 
   else if (x.substr(0,1)=='e') langEn(); 
   else if (x.substr(5,1)=='F') langFr();
   else if (x.substr(5,1)=='E') langEn(); 
   else if (x.substr(1,1)=='F') langFr();
   else if (x.substr(1,1)=='E') langEn();
 if ((a.indexOf('?Language=F') != -1) || (a.indexOf('&Language=F') != -1)) {
	langFr();
} else if ((a.indexOf('?Language=E') != -1) || (a.indexOf('&Language=E') != -1)) {
    langEn();
} else if (a.indexOf('/fr/') != -1) {
	 langFr();
} else if (a.indexOf('/en/') != -1) {
    langEn();
} else if (a.indexOf('e.') != -1) {
    langEn();
} else if (a.indexOf('f.') != -1) {
    langFr();
}
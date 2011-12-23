// JavaScript Document
window.onload=initForms;

function initForm() {
	for(var i=0;i<document.forms.length;++i) {
		document.forms[i].onsubmit=function() {
			return validForm();	
		}	
	}
}

function validForm() {
	var allGood=true;
	var allTags = document.getElementsByTagName("*");
	for(var i=0;i<allTags.length;++i) {
		if(!validTag(allTags[i])) {
			allGood=false;	
		}	
	}
	return allGood;
}


function validTag(thisTag) {
	var outClass="";
	var allClasses=thisTag.className.split(" ");
	for(var i=0;i<allClasses.length;++i) {
		outClass+=validBasedOnClass(allClasses[i],thisTag)+" ";	
	}
	thisTag.className=outClass;
	
	if(outClass.indexOf("invalid")!=-1) {
		invalidLabel(thisTag.parentNode);
		thisTag.focus();
		if(thisTag.nodeName=="INPUT") {
			thisTag.select();	
		}
		return false;
	}
	return true;
}

function validBasedOnClass(thisClass,thisTag) {
	var classBack="";
	switch(thisClass) {
		case "":
		case "invalid":
			break;
		case "reqd":
			if(allGood&&thisTag.value=="") {
				classBack="invalid";
			}
			classBack+=thisClass;
			break;
		default:
			classBack+=thisClass;
		
	}
	return classBack;
}
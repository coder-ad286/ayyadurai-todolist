let inputEl = document.querySelector('input');
let buttonEl = document.querySelector('button');
let ulEl = document.querySelector('ul');
let iEl = document.querySelector("i");
let noTask = document.querySelector("h4");
let contentEl = document.querySelector(".content");

document.addEventListener("DOMContentLoaded",()=>{
	let obj =[...JSON.parse(localStorage.getItem("ul"))];
    obj.forEach(value=>{
    	let newLiEl = document.createElement("li");
	let newDivEl = document.createElement("div");
	let newIEl = document.createElement("i");


	newDivEl.innerHTML=value.li;
	newIEl.setAttribute("class","fa fa-xmark");
	newIEl.setAttribute("onclick","remove(event)");

	newLiEl.append(newDivEl,newIEl);
	ulEl.appendChild(newLiEl);
    
	
	checkChildren();
    })
});
checkChildren();

function checkChildren() {
	if(ulEl.children.length>0){
	ulEl.hidden=false;
	noTask.hidden=true;
    }
 else{
 	ulEl.hidden=true;
 	noTask.hidden=false;
 }
}

inputEl.addEventListener("keyup",(event)=>{
   if(event.code=="Enter")
   	  buttonEl.click();
});
function remove(event){
	let removeEl = event.target.parentNode;
	removeEl.remove();
	let objRemove =[... JSON.parse(localStorage.getItem("ul"))];
	objRemove.forEach(value=>{
		if(value.li===removeEl.innerText){
			objRemove.splice(objRemove.indexOf(value),1);
		}
	});
	localStorage.setItem("ul",JSON.stringify(objRemove));
	checkChildren();
}

buttonEl.addEventListener("click",display);


function display(event) {
	if(inputEl.value.length<4){
		return;
	}
	event.preventDefault();
	let newLiEl = document.createElement("li");
	let newDivEl = document.createElement("div");
	let newIEl = document.createElement("i");


	newDivEl.innerHTML=inputEl.value;
	newIEl.setAttribute("class","fa fa-xmark");
	newIEl.setAttribute("onclick","remove(event)");

	newLiEl.append(newDivEl,newIEl);
	ulEl.appendChild(newLiEl);
    
	
	checkChildren();

 
	localStorage.setItem("ul",JSON.stringify([...JSON.parse(localStorage.getItem("ul")|| "[]"),{li : inputEl.value}]));
   inputEl.value="";    
}
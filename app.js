let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

console.log(itemsArray);
let addItems = document.querySelector("#enter");

addItems.addEventListener("click", ()=>{
	let item = document.querySelector("#task");

	createItem(item);
})

function createItem(item){

	if (item.value == ""){
		alert("invalid task")
	}else{
		itemsArray.push(item.value)
	}
	localStorage.setItem("items", JSON.stringify(itemsArray))
	location.reload();
}

function displayTask(){
	let taskItem = ""

	for (let i = 0; i < itemsArray.length; i++) {
		taskItem += `
		<div class="item">
				<div class="input-controller">
					<textarea disabled class="input">${itemsArray[i]}</textarea>
					<div class="edit-controller">
						<button class="delBtn"><i class="fa-solid fa-check"></i></button>
						<button class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button>
					</div>
				</div>
				<div class="update-controller">
					<button class="saveBtn">save</button>
					<button class="cancelBtn">cancel</button>
				</div>
		</div>
		`
	}
	document.querySelector(".todo-list").innerHTML = taskItem;
	activateDeleteFunction();
	activateEditFunction();
	activateCancelFunction();
	activateSaveFunction();
}

function activateDeleteFunction(){
	let deleteItem = document.querySelectorAll(".delBtn");

	deleteItem.forEach((del, i)=>{
		del.addEventListener("click",()=>{
			deleteTask(i)
		})
	})
}

function deleteTask(i){
	itemsArray.splice(i, 1);
	localStorage.setItem("items", JSON.stringify(itemsArray));
	location.reload();
}

function activateEditFunction(){
	let editItem = document.querySelectorAll(".editBtn");
	let updateController = document.querySelectorAll(".update-controller");
	let input = document.querySelectorAll(".input")

	editItem.forEach((editB, i)=>{
		editB.addEventListener("click", ()=>{
			updateController[i].style.display = "block";
			input[i].disabled = false;
		})
	})
}

function activateCancelFunction(){
let cancel = document.querySelectorAll(".cancelBtn");
let updateController = document.querySelectorAll(".update-controller");
let input = document.querySelectorAll(".input")
cancel.forEach((cb,i)=>{
	cb.addEventListener("click", ()=>{
		updateController[i].style.display = "none"
		input[i].disabled = true
	})
})
}

function activateSaveFunction(){
	let save = document.querySelectorAll(".saveBtn");
	let saveItem = document.querySelectorAll(".input")
	save.forEach((sb, i)=>{
		sb.addEventListener("click",()=>{
			saveFunction(i, saveItem);
		})
	})
}

function saveFunction(i, saveItem){
	itemsArray[i] = saveItem[i].value;
	localStorage.setItem("items", JSON.stringify(itemsArray));
	location.reload();
}


function displayDate(){
	let dateToday = document.querySelector("#dateToday")
	let date = new Date();
	date = date.toString().split(" ");
	dateToday.innerHTML = date[0] + " " + date[1] + " " + date[2] + " " + date[3]
}


window.onload = function(){
	displayDate();
	displayTask();
}
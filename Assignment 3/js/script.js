
function addNewItem(){
	var list = document.getElementById("tasks");
	var li = document.createElement("li");
	list.appendChild(li);
}

function openSublist(elementName){
	var sl = document.getElementById(elementName);
	if (sl.style.display == "block"){
		sl.style.display = "none";
	} else {
		sl.style.display = "block";
	}
}

function submitData(taskListName){
	var taskList = document.getElementById(taskListName);
	var newTaskText = document.getElementById("taskInput").value;
	if (newTaskText != ""){
		document.getElementById("taskInput").value = "";
		var newItem = document.createElement("li");
		var link = document.createElement("a");
		var subtaskdiv = document.createElement("div");
		subtaskdiv.id = "sub".concat(newTaskText);
		//expand and contract task windows
		link.onclick = function (){
			openSublist(subtaskdiv.id);
		}
		newItem.id = newTaskText;
		var newCheckbox = document.createElement("input");
		var addSubtaskButton = document.createElement("button");
		var deleteButton = document.createElement("button");
		var listHeader = document.createElement("ul");
		listHeader.id = "listheader";
		var buttonText = document.createTextNode("Add new subtask");
		addSubtaskButton.appendChild(buttonText);
		addSubtaskButton.id = "addSubtask";
		addSubtaskButton.className = "col-xs-9 btn btn-primary";
		addSubtaskButton.setAttribute("style", "margin-top: 10px");
		deleteButton.id = "deleteTask";
		deleteButton.className = "col-xs-2 btn btn-danger";
		deleteButton.setAttribute("style", "margin-left: 15px; margin-top: 10px;");
		deleteButton.onclick = function(){
			confirmModal(newTaskText);
		} 
		var icon = document.createElement("span");
		icon.className = "glyphicon glyphicon-trash";
		deleteButton.appendChild(icon)
		newCheckbox.type = "checkbox";
		newCheckbox.className = "pull-left";
		newItem.className = "row task"
		//when user clicks add subtask button
		addSubtaskButton.onclick = function () {
			addNewSubtask(subtaskdiv.id, addSubtaskButton.id,deleteButton.id);
		}

		var textNode = document.createTextNode(newTaskText);
		var text_span = document.createElement("span");
		text_span.setAttribute("style", "margin-left: 25px");
		textNode.className = "tasktext";
		text_span.appendChild(textNode);
		//make sure we got rid of the "no tasks" message
		if ($("#no-tasks").css("display") == "block"){
			$("#no-tasks").css("display", "none");
		}
		//put everything together in the new container
		link.appendChild(text_span);
		newItem.appendChild(link);
		newItem.appendChild(newCheckbox);
		newItem.appendChild(listHeader);
		subtaskdiv.appendChild(addSubtaskButton);
		subtaskdiv.appendChild(deleteButton);
		newItem.appendChild(subtaskdiv);
		taskList.appendChild(newItem);
	}
}

function confirmModal(taskName){
	document.getElementById("deleteModal").style.display = "block";
	document.getElementById("yesModal").onclick = function(){
		deleteTask(taskName);
		document.getElementById("deleteModal").style.display = "none";
	} 
}

function deleteTask(taskName){
	var task = document.getElementById(taskName);
	var taskparent = task.parentNode;
	task.parentNode.removeChild(task);
	//if we don't have any tasks left
	if (taskparent.childNodes.length == 5){
		//show the "no tasks" message
		$("#no-tasks").css("display","block");
	}
}

function incrementCounter(checkboxName, counterName){
	var counterText = document.getElementById(counterName).innerHTML;
	var checkbox = document.getElementById(checkboxName);
	var newFirstInt = parseInt(counterText.charAt(0));
	var upperBound = parseInt(counterText.charAt(2));
	if (checkbox.checked == true){
		newFirstInt += 1;
	} else {
		if (newFirstInt > 0) newFirstInt -= 1;
	}
	document.getElementById(counterName).innerHTML = newFirstInt.toString().concat(counterText.substring(1,3));
}

function checkAll(sublistName){
	$("#sublistName + li").each(function(){
		console.log("we're here");
		$("input:checkbox").prop("checked", $(this).prop("checked"));
	});
}

function addNewSubtask(newItemName,addSubtaskButtonName,deleteButtonName){
	var newItem = document.getElementById(newItemName);
	var addSubtaskButton = document.getElementById(addSubtaskButtonName);
	var deleteButton = document.getElementById(deleteButtonName);
	//get rid of buttons for a second 
	addSubtaskButton.style.display = "none";
	deleteButton.style.display = "none";
	//set up inputs for user
	var newInput = document.createElement("input");
	newInput.className = "col-xs-6";
	var newSubmit = document.createElement("button");
	newSubmit.className = "glyphicon glyphicon-ok";
	newInput.style.marginLeft = "40px";
	//what to do when the user hits submit
	newSubmit.onclick = function(){
		var subtaskText = newInput.value;
		var newCheckbox = document.createElement("input");
		var sublistItem = document.createElement("li");
		var textNode = document.createTextNode(subtaskText);
		sublistItem.style.marginTop = "10px";
		sublistItem.style.marginLeft = "40px";
		newCheckbox.type = "checkbox";
		newCheckbox.className = "pull-left";
		sublistItem.appendChild(newCheckbox);
		sublistItem.appendChild(textNode);
		$("#addSubtask").before(sublistItem);
		newInput.parentNode.removeChild(newInput);
		newSubmit.parentNode.removeChild(newSubmit);
		//bring back buttons for future use
		addSubtaskButton.style.display = "block";
		deleteButton.style.display = "block";
	}
	newInput.type = "text";
	newItem.appendChild(newInput)
	newItem.appendChild(newSubmit);
}
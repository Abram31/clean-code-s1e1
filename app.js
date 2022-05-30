//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incompleted-task");//ul of #block-form__block-incomplete-task
var completedTasksHolder=document.getElementById("completed-task");//completed-task


//New task list item
var createNewTaskElement=function(taskString){

    var blockItem=document.createElement("aside");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    blockItem.className = "block-task__list"
    
    label.innerText=taskString;
    label.className="block-task__input";

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.classList = "block-task__checkbox"
    editInput.type="text";
    editInput.className="block-form__input-text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className ="block-task__edit";

    deleteButton.className="block-task__delete";
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.className = "block-task__delete__img"
    deleteButtonImg.alt = "Delete"
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    blockItem.appendChild(checkBox);
    blockItem.appendChild(label);
    blockItem.appendChild(editInput);
    blockItem.appendChild(editButton);
    blockItem.appendChild(deleteButton);
    return blockItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var blockItem=createNewTaskElement(taskInput.value);

    //Append blockItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(blockItem);
    bindTaskEvents(blockItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var blockItem=this.parentNode;

    var editInput=blockItem.querySelector("input[type=text]");
    var label=blockItem.querySelector("label");
    var editBtn=blockItem.querySelector(".block-task__edit");
    var containsClass=blockItem.classList.contains("block-task__block-edit");
    //If class of the parent is .block-task__block-edit
    if(containsClass){

        //switch to .block-task__block-edit
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .block-task__block-edit on the parent.
    blockItem.classList.toggle("block-task__block-edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var blockItem=this.parentNode;
    var ul=blockItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(blockItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-task
    var blockItem=this.parentNode;
    completedTasksHolder.appendChild(blockItem);
    bindTaskEvents(blockItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleted-task.
    var blockItem=this.parentNode;
    incompleteTaskHolder.appendChild(blockItem);
    bindTaskEvents(blockItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.block-task__edit");
    var deleteButton=taskListItem.querySelector("button.block-task__delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
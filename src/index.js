import "./styles.css";
import displayAllTasks from "./all-tasks";
import { createList,deleteList, createListPage } from "./manageLists";
import { addTask, findTask, editTask, deleteTask, changeCompletion, changePriority } from "./manageTasks";

let currentTab='mytasks', selectedListRef=0, editingTask=false, editTaskElem;
let maindiv;
const listStorage=[];

function resetInputs(form){
    form.querySelectorAll('input').forEach((inputelem)=>{
        inputelem.value='';
    })
    let textarea=form.querySelector('textarea');
    if(textarea) textarea.value='';
}

const content=document.querySelector('.content');
const createListDialog = document.querySelector('dialog#createlist');
const addTaskDialog =document.querySelector('dialog#addTask');
const createListForm=document.querySelector('#createlist form');
const addTaskForm= document.querySelector('#addTask form');
const cancelbtns=document.querySelectorAll('dialog .cancelbtn');

cancelbtns.forEach((btn)=>{
    btn.addEventListener('click',(event)=>{
        resetInputs(event.target.parentNode.parentNode);
        btn.parentNode.parentNode.close();
    })
})
createListDialog.addEventListener('cancel',(event)=>{
    event.preventDefault();
    resetInputs(createListForm);
    createListDialog.close();
})
createListForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let title=document.querySelector('#createlist .titleinput').value;
    createList(title,listStorage);
    resetInputs(createListForm);
    createListDialog.close();
})
addTaskDialog.addEventListener('cancel',(event)=>{
    event.preventDefault();
    resetInputs(addTaskForm);
    addTaskDialog.close();
})
addTaskForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let title=document.querySelector('#addTask .titleinput').value;
    let desc=document.querySelector('#addTask .descinput').value;
    let priority=document.querySelector('#addTask .priorityinput').checked;
    let date=new Date(document.querySelector('#addTask .dateinput').value);
    if(editingTask){
        editTask(title,date,priority,desc,editTaskElem,listStorage)
    }
    else{
        addTask(title,date,priority,desc,listStorage,selectedListRef);
    }
    resetInputs(addTaskForm);
    editingTask=false;
    editTaskElem=undefined;
    addTaskDialog.close();
})

function changeSelected(classname,listElem){
    let currentSelected=document.querySelector('.selected');
    if(currentSelected) currentSelected.classList.remove('selected');
    if(classname=='lists'){
        //console.log(listElem);
        selectedListRef=listElem.dataset.listRef;
        maindiv=createListPage(listElem,listStorage,maindiv);
        listElem.classList.add('selected');
    }
    else{
        document.querySelector('.'+'org'+classname).classList.add('selected');
        selectedListRef=-1;
    } 
    currentTab=classname;
}

document.addEventListener('click',(event)=>{
    let target=event.target;
    if(target.classList.contains('orgAll') || target.parentNode.classList.contains('orgAll') && currentTab!="All"){
        changeSelected('All');
    }
    else if(target.classList.contains('orgToday') || target.parentNode.classList.contains('orgToday') && currentTab!="Today"){
        changeSelected('Today');
    }
    else if(target.classList.contains('orgWeek') || target.parentNode.classList.contains('orgWeek') && currentTab!="Week"){
        changeSelected('Week');
    }
    else if(target.classList.contains('orgImportant') || target.parentNode.classList.contains('orgImportant') && currentTab!="Important"){
        changeSelected('Important');
    }
    else if(target.classList.contains('orgCompleted') || target.parentNode.classList.contains('orgCompleted') && currentTab!="Completed"){
        changeSelected('Completed');
    }
    else if(target.classList.contains('addlistbtn')){
        createListDialog.showModal();
    }
    else if(target.classList.contains('deletelistbtn')){
        //console.log('hi')
        let listRef=target.parentNode.dataset.listRef;
        let status=deleteList(target,listStorage);
        if(listRef==selectedListRef && status==true){
            changeSelected('lists',document.querySelectorAll('.list')[0]);
        }
    }
    else if(target.classList.contains('list') || target.parentNode.classList.contains('list')){
        let listRef;
        if(!target.hasAttribute('data-list-ref')) target=target.parentNode;
        listRef=target.dataset.listRef;
        if(selectedListRef!=listRef){
            selectedListRef=listRef;
            changeSelected('lists',target);
        }
    }
    else if(target.classList.contains('more')){
        let morebtn=target;
        target=target.parentNode.parentNode;
        let taskref=target.dataset.taskRef;
        let desc=findTask(listStorage[selectedListRef],taskref).description;
        if(desc!=''){
            morebtn.classList.toggle('more');
            morebtn.classList.toggle('less');
            const descDiv=document.createElement('div');
            descDiv.textContent=desc;
            descDiv.classList.add('desc');
            target.appendChild(descDiv);
        }
    }
    else if(target.classList.contains('less')){
        let lessbtn=target;
        target=target.parentNode.parentNode;
        const descDiv=target.querySelector('.desc');
        target.removeChild(descDiv);
        lessbtn.classList.toggle('less');
        lessbtn.classList.toggle('more');
    }
    else if(target.classList.contains('completion') || target.classList.contains('primary') || target.classList.contains('title') || target.classList.contains('task')){
        if(target.classList.contains('title')) target=target.parentNode;
        if(!target.classList.contains('completion')) target=target.querySelector('.completion');
        changeCompletion(target,listStorage);
    }
    else if(target.classList.contains('priority')){
        changePriority(target,listStorage);
    }
    else if(target.classList.contains('editTask')){
        editingTask=true;
        editTaskElem=target;
        document.querySelector('#addTask .heading h2').textContent='Edit Task';
        let taskref=target.parentNode.parentNode.dataset.taskRef;
        let task=findTask(listStorage[selectedListRef],taskref);
        addTaskDialog.querySelector('.titleinput').value=task.title;
        addTaskDialog.querySelector('.dateinput').value=task.date.getFullYear()+'-'+task.date.getMonth()+'-'+task.date.getDate();
        addTaskDialog.querySelector('.descinput').value=task.description;
        addTaskDialog.querySelector('.priorityinput').checked=task.priority;
        addTaskDialog.showModal();
    }
    else if(target.classList.contains('deleteTask')){
        deleteTask(target,listStorage);
    }

    else if(target.classList.contains('addTaskbtn') || target.parentNode.classList.contains('addTaskbtn')){
        document.querySelector('#addTask .heading h2').textContent='Add Task';
        addTaskDialog.showModal();
    }
    //console.log(target);
    //console.log(listStorage);
})

//STARTUP
createList("My Tasks",listStorage);
changeSelected('lists',document.querySelectorAll('.list')[0]);
const today = (new Date()).toISOString().split('T')[0];
document.querySelector('#addTask .dateinput').min=today;
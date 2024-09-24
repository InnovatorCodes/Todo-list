import "./styles.css";
import displayAllTasks from "./all-tasks";
import { createList } from "./manageLists";
import { ta } from "date-fns/locale";

let currentTab='mytasks', selectedIndex=0;
const listStorage=[];

function resetInputs(form){
    form.querySelectorAll('input').forEach((inputelem)=>{
        inputelem.value='';
    })
}

const content=document.querySelector('.content');
const createListDialog = document.querySelector('dialog#createlist');
const addTaskDialog =document.querySelector('dialog#addTask');
const createListForm=document.querySelector('#createlist form');
const addTaskForm= document.querySelector('#addTask form');
const cancelbtns=document.querySelectorAll('dialog .cancelbtn');
const titleinput=document.querySelector('dialog .title');
const lists=document.querySelector('.lists');

cancelbtns.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        resetInputs(createListForm);
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
    let title=titleinput.value;
    createList(title);
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
    let title=titleinput.value;
    console.log(title);
    //createList(title);
    resetInputs(addTaskForm);
    addTaskDialog.close();
})


function changeSelected(classname,index){
    let currentSelected=document.querySelector('.selected');
    if(currentSelected) currentSelected.classList.remove('selected');
    if(classname=='lists'){
        document.querySelectorAll('.list')[index].classList.add('selected');
    }
    else{
        document.querySelector('.'+classname).classList.add('selected');
        selectedIndex=-1;
    } 
    currentTab=classname;
}

document.addEventListener('click',(event)=>{
    let target=event.target;
    if(target.classList.contains('all') || target.parentNode.classList.contains('all') && currentTab!="all"){
        changeSelected('all');
    }
    if(target.classList.contains('today') || target.parentNode.classList.contains('today') && currentTab!="today"){
        changeSelected('today');
    }
    if(target.classList.contains('week') || target.parentNode.classList.contains('week') && currentTab!="week"){
        changeSelected('week');
    }
    if(target.classList.contains('important') || target.parentNode.classList.contains('important') && currentTab!="important"){
        changeSelected('important');
    }
    if(target.classList.contains('completed') || target.parentNode.classList.contains('completed') && currentTab!="completed"){
        changeSelected('completed');
    }
    if(target.classList.contains('addlistbtn')){
        createListDialog.showModal();
    }
    if(target.classList.contains('deletebtn')){
        
    }
    if(target.classList.contains('list') || target.parentNode.classList.contains('list')){
        let index;
        if(target.hasAttribute('data-listnum')) index=target.dataset.listnum;
        else index=target.parentNode.dataset.listnum;
        if(selectedIndex!=index){
            selectedIndex=index;
            changeSelected('lists',index);
        }
    }
    if(target.classList.contains('primary') || target.classList.contains('title') || target.classList.contains('task')){
        if(target.classList.contains('primary')) target=target.parentNode;
        if(target.classList.contains('title')) target=target.parentNode.parentNode;
        target.classList.toggle('expand');
    }
    if(target.classList.contains('addTask') || target.parentNode.classList.contains('addTask')){
        addTaskDialog.showModal();
    }

})

//STARTUP
createList("My Tasks",listStorage,lists);
changeSelected('lists',0);
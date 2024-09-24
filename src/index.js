import "./styles.css";
import displayAllTasks from "./all-tasks";
import { createList } from "./manageLists";
import { addTask, findTask, changeCompletion, changePriority } from "./manageTasks";

let currentTab='mytasks', selectedIndex=0;
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
const lists=document.querySelector('.lists');

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
    let title=document.querySelector('#createlist .title');
    createList(title,listStorage,lists);
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
    let title=document.querySelector('#addTask .title').value;
    let desc=document.querySelector('#addTask .desc').value;
    let priority=document.querySelector('#addTask .priority').checked;
    let date=new Date(document.querySelector('#addTask .date').value);
    addTask(title,date,priority,desc,listStorage,selectedIndex);
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
    else if(target.classList.contains('today') || target.parentNode.classList.contains('today') && currentTab!="today"){
        changeSelected('today');
    }
    else if(target.classList.contains('week') || target.parentNode.classList.contains('week') && currentTab!="week"){
        changeSelected('week');
    }
    else if(target.classList.contains('important') || target.parentNode.classList.contains('important') && currentTab!="important"){
        changeSelected('important');
    }
    else if(target.classList.contains('completed') || target.parentNode.classList.contains('completed') && currentTab!="completed"){
        changeSelected('completed');
    }
    else if(target.classList.contains('addlistbtn')){
        createListDialog.showModal();
    }
    else if(target.classList.contains('deletebtn')){
        
    }
    else if(target.classList.contains('list') || target.parentNode.classList.contains('list')){
        let index;
        if(target.hasAttribute('data-listnum')) index=target.dataset.listnum;
        else index=target.parentNode.dataset.listnum;
        if(selectedIndex!=index){
            selectedIndex=index;
            changeSelected('lists',index);
        }
    }
    else if(target.classList.contains('more')){
        let morebtn=target;
        target=target.parentNode.parentNode;
        let taskref=target.dataset.taskRef;
        let desc=findTask(listStorage[selectedIndex],taskref).description;
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
        changeCompletion(target,listStorage,selectedIndex);
    }

    else if(target.classList.contains('priority')){
        changePriority(target,listStorage,selectedIndex);
    }

    else if(target.classList.contains('addTaskbtn') || target.parentNode.classList.contains('addTaskbtn')){
        addTaskDialog.showModal();
    }

})

//STARTUP
createList("My Tasks",listStorage,lists);
changeSelected('lists',0);
const today = (new Date()).toISOString().split('T')[0];
document.querySelector('#addTask .date').min=today;
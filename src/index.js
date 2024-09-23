import "./styles.css";
import listsvg from './images/list.svg';
import displayAllTasks from "./all-tasks";

let currentTab='mytasks', selectedIndex=0, listCount=0;
const storage={
    "lists": []
};

function resetInputs(form){
    form.querySelectorAll('input').forEach((inputelem)=>{
        inputelem.value='';
    })
}

const content=document.querySelector('.content');
const createListDialog = document.querySelector('dialog#createlist');
const createListForm=document.querySelector('#createlist form');
const cancelbtn=document.querySelector('#createlist .cancelbtn');
const titleinput=document.querySelector('#createlist #title');
const lists=document.querySelector('.lists');
cancelbtn.addEventListener('click',()=>{
    resetInputs(createListForm);
    createListDialog.close()
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
    //addListToUI(list);
    resetInputs(createListForm);
    createListDialog.close();
})

function createList(title){
    let list = {
        listTitle: title,
        listTasks: []
    }
    storage.lists.push(list);
    const newlist=document.createElement('div');
    newlist.dataset.listnum=listCount;
    listCount++;
    newlist.classList.add('list');
    const listimg=document.createElement('img');
    const div=document.createElement('div');
    div.textContent=list.listTitle;
    listimg.src=listsvg;
    newlist.append(listimg,div);
    lists.appendChild(newlist);
}

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
    if(target.classList.contains('list') || target.parentNode.classList.contains('list')){
        let index;
        if(target.hasAttribute('data-listnum')) index=target.dataset.listnum;
        else index=target.parentNode.dataset.listnum;
        if(selectedIndex!=index){
            selectedIndex=index;
            changeSelected('lists',index);
        }
    }
})

//STARTUP
createList("My Tasks");
changeSelected('lists',0);
import listsvg from './images/list.svg';
import deletesvg from './images/delete.svg';
import addsvg from "./images/add.svg";
import editsvg from "./images/edit.svg";

import { addTaskToPage } from './manageTasks';
export { createList, editList, deleteList, createListPage, findList, addListToPage, setlistRefCount };

let listCount=0;
let listRef=0;

function createList(title,lists){
    let list = {
        listTitle: title,
        listTasks: [],
        taskRefCounter:0
    }
    lists.push(list);
    list.listRef=listRef;
    addListToPage(list);
}

function addListToPage(list){
    const newlist=document.createElement('div');
    newlist.dataset.listRef=listRef;
    newlist.classList.add('list');
    const listimg=document.createElement('img');
    const div=document.createElement('div');
    div.textContent=list.listTitle;
    div.classList.add('listTitle');
    listimg.src=listsvg;
    const editbtn=document.createElement('img');
    editbtn.src=editsvg;
    editbtn.classList.add('editlistbtn');
    const deletebtn=document.createElement('img');
    deletebtn.src=deletesvg;
    deletebtn.classList.add('deletelistbtn');
    newlist.append(listimg,div,editbtn,deletebtn);
    document.querySelector('.lists').appendChild(newlist);
    listCount++;
    listRef++;
}

function findList(lists,listref){
    //console.log(lists,listref);
    return (lists.filter((list)=>listref==list.listRef))[0];
}

function editList(title,editListDiv,listSelected,lists){
    let listRef=editListDiv.dataset.listRef;
    let list=findList(lists,listRef);
    list.listTitle=title;
    editListOnPage(title,editListDiv,listSelected);
}

function editListOnPage(title,editListDiv,listSelected){
    editListDiv.querySelector('.listTitle').textContent=title;
    if(listSelected) document.querySelector('.maindiv .heading div').textContent=title;
}

function deleteList(deleteListElem,lists){
    let listRef=deleteListElem.parentNode.dataset.listRef;
    //console.log(listCount);
    if(listCount>1){
        deleteListElem.classList.add('fadeOut');
        let listIndex=lists.indexOf(findList(lists,listRef));
        lists.splice(listIndex,1);
        deleteListFromPage(deleteListElem);
        listCount--;
        //console.log(lists);
        return true;
    }
    document.querySelector('dialog#deleteinvalid').showModal();
}

function deleteListFromPage(deleteListElem){
    document.querySelector('.lists').removeChild(deleteListElem.parentNode);
}

function createListPage(listElem,lists,prevmaindiv){
    //console.log(arguments);
    let listRef=listElem.dataset.listRef;
    let list=findList(lists,listRef);
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    listImg.src=listsvg;
    const title=document.createElement('div');
    console.log(listElem,lists,list,listRef);
    title.textContent=list.listTitle;
    heading.append(listImg,title);
    const addTaskBtn=document.createElement('div');
    addTaskBtn.classList.add('addTaskbtn');
    const addTaskImg=document.createElement('img');
    addTaskImg.src=addsvg;
    const addtasktext=document.createElement('div');
    addtasktext.textContent="Add Task";
    addTaskBtn.append(addTaskImg,addtasktext);
    const hr=document.createElement('hr');
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,addTaskBtn,hr,tasks);
    if(prevmaindiv) document.querySelector('.content').removeChild(prevmaindiv);
    document.querySelector('.content').appendChild(maindiv);
    list.listTasks.forEach((task,taskIndex)=>{
        addTaskToPage(task.title,task.date,task.priority,task.completion,task.taskRef,taskIndex,listRef);
    })
    return maindiv;
}

function setlistRefCount(count,ref){
    listRef=ref;
    listCount=count;
}
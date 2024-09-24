import listsvg from './images/list.svg';
import deletesvg from './images/delete.svg';
import addsvg from "./images/add.svg";

import { addTaskToPage } from './manageTasks';
export { createList, deleteList, createListPage };

let listCount=0;

function createList(title,lists){
    let list = {
        listTitle: title,
        listTasks: []
    }
    lists.push(list);
    const newlist=document.createElement('div');
    newlist.dataset.listIndex=listCount;
    listCount++;
    newlist.classList.add('list');
    const listimg=document.createElement('img');
    const div=document.createElement('div');
    div.textContent=list.listTitle;
    listimg.src=listsvg;
    const deletebtn=document.createElement('img');
    deletebtn.src=deletesvg;
    deletebtn.classList.add('deletelistbtn');
    newlist.append(listimg,div,deletebtn);
    document.querySelector('.lists').appendChild(newlist);
    return newlist;
}

function deleteList(deleteListElem,lists){
    let listIndex=deleteListElem.parentNode.dataset.listIndex;
    if(listCount>1){
        lists.splice(listIndex,1);
        deleteListFromPage(deleteListElem);
        listCount--;
    }
    console.log(lists);
}

function deleteListFromPage(deleteListElem){
    document.querySelector('.lists').removeChild(deleteListElem.parentNode);
}

function createListPage(listElem,lists){
    let listIndex=listElem.dataset.listIndex;
    let list=lists[listIndex];
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    listImg.src=listsvg;
    const title=document.createElement('div');
    title.textContent=list.listTitle;
    heading.append(listImg,title);
    const addTaskBtn=document.createElement('div');
    addTaskBtn.classList.add('addTaskbtn');
    const addTaskImg=document.createElement('div');
    addTaskImg.src=addsvg;
    const addtasktext=document.createElement('div');
    addtasktext.textContent="Add Task";
    addTaskBtn.append(addTaskImg,addtasktext);
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,addTaskBtn,tasks);
    document.querySelector('.content').appendChild(maindiv);
    list.listTasks.forEach((task)=>{
        addTaskToPage(task.title,task.date,task.priority,task.taskRef,listIndex);
    })
    return maindiv;
}

/*
<div class="heading"><img src="./images/list.svg" alt="list-icon"><div>My Tasks</div></div>
            <div class="addTaskbtn"><img src="./images/add.svg" alt="add-task"><div>Add Task</div></div>
            <hr>
            <div class="tasks">
            </div>*/
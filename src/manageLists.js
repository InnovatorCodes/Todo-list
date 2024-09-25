import listsvg from './images/list.svg';
import deletesvg from './images/delete.svg';
import addsvg from "./images/add.svg";

import { addTaskToPage } from './manageTasks';
export { createList, deleteList, createListPage, findList };

let listCount=0;
let listRef=0;

function createList(title,lists){
    let list = {
        listTitle: title,
        listTasks: []
    }
    lists.push(list);
    const newlist=document.createElement('div');
    list.listRef=listRef;
    newlist.dataset.listRef=listRef;
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
    listCount++;
    listRef++;
    return newlist;
}

function findList(lists,listref){
    return (lists.filter((list)=>listref==list.listRef))[0];
}
function deleteList(deleteListElem,lists){
    let listRef=deleteListElem.parentNode.dataset.listRef;
    if(listCount>1){
        deleteListElem.classList.add('fadeOut');
        let listIndex=lists.indexOf(findList(lists,listRef));
        lists.splice(listIndex,1);
        deleteListFromPage(deleteListElem);
        listCount--;
        //console.log(lists);
        return true;
    }
}

function deleteListFromPage(deleteListElem){
    document.querySelector('.lists').removeChild(deleteListElem.parentNode);
}

function createListPage(listElem,lists,prevmaindiv){
    let listRef=listElem.dataset.listRef;
    let list=findList(lists,listRef);
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    listImg.src=listsvg;
    const title=document.createElement('div');
    //console.log(listElem,lists,list,listRef);
    title.textContent=list.listTitle;
    heading.append(listImg,title);
    const addTaskBtn=document.createElement('div');
    addTaskBtn.classList.add('addTaskbtn');
    const addTaskImg=document.createElement('img');
    addTaskImg.src=addsvg;
    const addtasktext=document.createElement('div');
    addtasktext.textContent="Add Task";
    addTaskBtn.append(addTaskImg,addtasktext);
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,addTaskBtn,tasks);
    if(prevmaindiv) document.querySelector('.content').removeChild(prevmaindiv);
    document.querySelector('.content').appendChild(maindiv);
    list.listTasks.forEach((task,taskIndex)=>{
        addTaskToPage(task.title,task.date,task.priority,task.taskRef,taskIndex,listRef);
    })
    return maindiv;
}

/*
<div class="heading"><img src="./images/list.svg" alt="list-icon"><div>My Tasks</div></div>
            <div class="addTaskbtn"><img src="./images/add.svg" alt="add-task"><div>Add Task</div></div>
            <hr>
            <div class="tasks">
            </div>*/
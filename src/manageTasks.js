import incompletesvg from  "./images/incomplete.svg"
import completesvg from "./images/completed.svg";
import unimportantsvg from "./images/unimportant.svg";
import importantsvg from "./images/important.svg";
import editsvg  from "./images/edit.svg";
import deletesvg from "./images/delete.svg";
import moresvg from "./images/more.svg";

import { format } from 'date-fns';
import { findList } from "./manageLists";

export { addTask, editTask, findTask, deleteTask, changeCompletion, changePriority, addTaskToPage };

function addTask(title,date,priority,description,lists,listRef){
    let task={
        "title": title,
        "date": date,
        "priority": priority,
        "description":description,
        "completion": false
    };
    task.taskRef=findList(lists,listRef).listTasks.length;
    let taskRef=task.taskRef;
    findList(lists,listRef).listTasks.push(task);
    findList(lists,listRef).listTasks.sort(function(task1,task2){
        return task1.date-task2.date;
    })
    let taskIndex=findList(lists,listRef).listTasks.indexOf(task);
    addTaskToPage(title,date,priority,taskRef,taskIndex,listRef);
    //console.log(listIndex)
}

function addTaskToPage(title,date,priority,taskRef,taskIndex,listRef){
    const newtask=document.createElement('div');
    newtask.classList.add('task');
    newtask.dataset.taskRef=taskRef;
    newtask.dataset.listRef=listRef;
    const primary=document.createElement('primary');
    primary.classList.add('primary');
    const completion= document.createElement('img');
    completion.src=incompletesvg;
    completion.classList.add('completion');
    completion.dataset.status=0;
    const taskTitle=document.createElement('div');
    taskTitle.textContent=title;
    taskTitle.classList.add('title')
    const dueDate=document.createElement('div');
    dueDate.textContent=format(date , 'dd/MM/yyyy');
    dueDate.classList.add('date');
    const priorityImg=document.createElement('img');
    if(priority) priorityImg.src=importantsvg;
    else priorityImg.src=unimportantsvg;
    priorityImg.dataset.status=priority == true ? 1 :0;
    priorityImg.classList.add('priority');
    const editImg=document.createElement('img');
    editImg.src=editsvg;
    editImg.classList.add('editTask');
    const deleteImg=document.createElement('img');
    deleteImg.src=deletesvg;
    deleteImg.classList.add('deleteTask');
    const moreImg=document.createElement('img');
    moreImg.src=moresvg;
    moreImg.classList.add('more');
    primary.append(completion,taskTitle,dueDate,priorityImg,editImg,deleteImg,moreImg);
    newtask.appendChild(primary);
    const tasks= document.querySelector('.tasks');
    tasks.insertBefore(newtask,tasks.childNodes[taskIndex]);
}

function findTask(list,taskref){
    //console.log(list);
    return (list.listTasks.filter((task)=>taskref==task.taskRef))[0];
}

function changeCompletion(completion,lists){
    changeCompletionOnPage(completion);
    let taskref=completion.parentNode.parentNode.dataset.taskRef;
    let listRef=completion.parentNode.parentNode.dataset.listRef;
    let task=findTask(findList(lists,listRef),taskref);
    task.completion=!task.completion;
    //console.log(completion,taskref,listIndex);
}

function changeCompletionOnPage(completion){
    let target=completion.parentNode;
    completion.classList.add('remove');
    const newCompletion=document.createElement('img');
    newCompletion.classList.add('completion');
    target.querySelector('.title').classList.toggle('completed');
    setTimeout(()=>{
        if(completion.dataset.status==1){
            target.removeChild(completion);
            newCompletion.src=incompletesvg;
            newCompletion.dataset.status=0;
            target.insertBefore(newCompletion,target.childNodes[0]);
        } 
        else{
            target.removeChild(completion);
            newCompletion.src=completesvg;
            newCompletion.dataset.status=1;
            target.insertBefore(newCompletion,target.childNodes[0]);
        }
    },100);
}

function changePriority(priority,lists){
    changePriorityOnPage(priority);
    let taskref=priority.parentNode.parentNode.dataset.taskRef;
    let listRef=priority.parentNode.parentNode.dataset.listRef;
    let task=findTask(findList(lists,listRef),taskref);
    task.priority=!task.priority;
}

function changePriorityOnPage(priority){
    let target=priority.parentNode;
    priority.classList.add('remove');
    const newPriority=document.createElement('img');
    newPriority.classList.add('priority');
    setTimeout(()=>{
        if(priority.dataset.status==1){
            target.removeChild(priority);
            newPriority.src=unimportantsvg;
            newPriority.dataset.status=0;
            target.insertBefore(newPriority,target.childNodes[target.childNodes.length-3]);
        } 
        else{
            target.removeChild(priority);
            newPriority.src=importantsvg;
            newPriority.dataset.status=1;
            target.insertBefore(newPriority,target.childNodes[target.childNodes.length-3]);
        }
    },100);
}

function editTask(title,date,priority,description,editTaskElem,lists){
    let listRef=editTaskElem.parentNode.parentNode.dataset.listRef;
    let taskref=editTaskElem.parentNode.parentNode.dataset.taskRef;
    let task=findTask(findList(lists,listRef),taskref);
    task.title=title;
    task.date=date;
    task.priority=priority;
    task.description=description;
    editTaskOnPage(title,date,priority,editTaskElem);
}

function editTaskOnPage(title,date,priority,editTaskElem){
    let primary=editTaskElem.parentNode;
    primary.querySelector('.title').textContent=title;
    primary.querySelector('.date').textContent=format(date,'dd/MM/yyyy');
    let priorityelem=primary.querySelector('.priority');
    if(priority) priorityelem.src=importantsvg;
    else priorityelem.src=unimportantsvg;
}

function deleteTask(deleteElem,lists){
    let taskref=deleteElem.parentNode.parentNode.dataset.taskRef;
    let listRef=deleteElem.parentNode.parentNode.dataset.listRef;
    //console.log(lists[listIndex],listIndex);
    let taskIndex=findList(lists,listRef).listTasks.indexOf(findTask(findList(lists,listRef),taskref));
    findList(lists,listRef).listTasks.splice(taskIndex,1);
    deleteTaskfromPage(deleteElem);
}

function deleteTaskfromPage(deleteElem){
    let task=deleteElem.parentNode.parentNode;
    task.classList.add('fadeOut');
    setTimeout(()=>{
        document.querySelector('.tasks').removeChild(task);
    },300);
}
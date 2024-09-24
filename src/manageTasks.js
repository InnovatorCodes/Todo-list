import incompletesvg from  "./images/incomplete.svg"
import completesvg from "./images/completed.svg";
import unimportantsvg from "./images/unimportant.svg";
import importantsvg from "./images/important.svg";
import editsvg  from "./images/edit.svg";
import moresvg from "./images/more.svg";

import { format } from 'date-fns';
import { se } from "date-fns/locale";

export { addTask, findTask, changeCompletion, changePriority };

function addTask(title,date,priority,description,lists,listIndex){
    let task={
        "title": title,
        "date": date,
        "priority": priority,
        "description":description,
        "completion": false
    };
    task.taskRef=lists[listIndex].listTasks.length;
    let taskRef=task.taskRef;
    lists[listIndex].listTasks.push(task);
    lists[listIndex].listTasks.sort(function(task1,task2){
        return task1.date-task2.date;
    })
    let taskIndex=lists[listIndex].listTasks.indexOf(task);
    addTaskToPage(title,date,priority,taskRef,taskIndex);
}

function addTaskToPage(title,date,priority,taskRef,taskIndex){
    const newtask=document.createElement('div');
    newtask.classList.add('task');
    newtask.dataset.taskRef=taskRef;
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
    editImg.classList.add('edit');
    const moreImg=document.createElement('img');
    moreImg.src=moresvg;
    moreImg.classList.add('more');
    primary.append(completion,taskTitle,dueDate,priorityImg,editImg,moreImg);
    newtask.appendChild(primary);
    const tasks= document.querySelector('.tasks');
    tasks.insertBefore(newtask,tasks.childNodes[taskIndex]);
}

function findTask(list,taskref){
    return (list.listTasks.filter((task)=>taskref==task.taskRef))[0];
}

function changeCompletion(completion,lists,listIndex){
    changeCompletionOnPage(completion);
    let taskref=completion.parentNode.parentNode.dataset.taskRef;
    let task=findTask(lists[listIndex],taskref);
    task.completion=!task.completion;
    //console.log(task);
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

function changePriority(priority,lists,listIndex){
    changePriorityOnPage(priority);
    let taskref=priority.parentNode.parentNode.dataset.taskRef;
    let task=findTask(lists[listIndex],taskref);
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
            target.insertBefore(newPriority,target.childNodes[target.childNodes.length-2]);
        } 
        else{
            target.removeChild(priority);
            newPriority.src=importantsvg;
            newPriority.dataset.status=1;
            target.insertBefore(newPriority,target.childNodes[target.childNodes.length-2]);
        }
    },100);
}
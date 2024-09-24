import incompletesvg from  "./images/incomplete.svg"
import unimportantsvg from "./images/unimportant.svg";
import importantsvg from "./images/important.svg";
import editsvg  from "./images/edit.svg";
import moresvg from "./images/more.svg";

import { format } from 'date-fns';

export { addTask, findTask };

function addTask(title,date,priority,description,lists,listIndex){
    let task={
        "title": title,
        "date": date,
        "priority": priority,
        "description":description,
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
    const taskTitle=document.createElement('div');
    taskTitle.textContent=title;
    taskTitle.classList.add('title')
    const dueDate=document.createElement('div');
    dueDate.textContent=format(date , 'dd/MM/yyyy');
    dueDate.classList.add('date');
    const priorityImg=document.createElement('img');
    if(priority) priorityImg.src=importantsvg;
    else priorityImg.src=unimportantsvg;
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
    return list.listTasks.filter((task)=>taskref==task.taskRef)
}
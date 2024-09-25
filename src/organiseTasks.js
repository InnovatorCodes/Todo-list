import calendarallsvg from "./images/calendar-all.svg";
import calendartodaysvg from "./images/calendar-today.svg";
import { addTaskToPage } from "./manageTasks";
export { createAllPage, createTodayPage };

function createAllPage(lists,prevmaindiv){
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    listImg.src=calendarallsvg;
    const title=document.createElement('div');
    //console.log(lists,list,listRef);
    title.textContent='All';
    heading.append(listImg,title);
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,tasks);
    if(prevmaindiv) document.querySelector('.content').removeChild(prevmaindiv);
    document.querySelector('.content').appendChild(maindiv);
    let allTasks=[];
    lists.forEach((list)=>{
        list.listTasks.forEach((task)=>{
            let newtask=task;
            newtask.listRef=list.listRef;
            allTasks.push(newtask);
        })
    })
    allTasks.forEach((task)=>{
        addTaskToPage(task.title,task.date,task.priority,task.completion,task.taskRef,null,task.listRef);
    })
    return maindiv;
}

function createTodayPage(lists,prevmaindiv){
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    listImg.src=calendartodaysvg;
    const title=document.createElement('div');
    //console.log(lists,list,listRef);
    title.textContent='Today';
    heading.append(listImg,title);
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,tasks);
    if(prevmaindiv) document.querySelector('.content').removeChild(prevmaindiv);
    document.querySelector('.content').appendChild(maindiv);
    let allTasks=[];
    lists.forEach((list)=>{
        list.listTasks.forEach((task)=>{
            let today=(new Date()).toISOString().split('T')[0];
            console.log(today,task.date.toISOString().split('T')[0])
            if(today==task.date.toISOString().split('T')[0]){
                let newtask=task;
                newtask.listRef=list.listRef;
                allTasks.push(newtask);
            }
            
        })
    })
    allTasks.forEach((task)=>{
        addTaskToPage(task.title,task.date,task.priority,task.completion,task.taskRef,null,task.listRef);
    })
    return maindiv;
}
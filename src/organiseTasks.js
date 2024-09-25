import calendarallsvg from "./images/calendar-all.svg";
import { addTaskToPage } from "./manageTasks";
export { createAllPage };

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
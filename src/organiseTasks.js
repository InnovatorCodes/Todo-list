import calendarallsvg from "./images/calendar-all.svg";
import calendartodaysvg from "./images/calendar-today.svg";
import calendarweeksvg from "./images/calendar-week.svg";
import calendarimportantsvg from "./images/calendar-important.svg";
import calendarcompletedsvg from "./images/calendar-completed.svg";
import { addTaskToPage } from "./manageTasks";
import { gl } from "date-fns/locale";
export { createOrganisePage };

let allTasks=[];
let globalList;

function createOrganisePage(lists,prevmaindiv,type){
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    switch (type) {
        case 'All':
            listImg.src=calendarallsvg;
            break;
        case 'Today':
            listImg.src=calendartodaysvg;
            break;
        case 'Week':
            listImg.src=calendarweeksvg;
            break;
        case 'Important':
            listImg.src=calendarimportantsvg;
            break;
        case 'Completed':
            listImg.src=calendarcompletedsvg;
            break;
        default:
            break;
    }
    const title=document.createElement('div');
    //console.log(lists,list,listRef);
    title.textContent=type;
    if(type=='Week') title.textContent='This Week';
    heading.append(listImg,title);
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,tasks);
    if(prevmaindiv) document.querySelector('.content').removeChild(prevmaindiv);
    document.querySelector('.content').appendChild(maindiv);
    lists.forEach((list)=>{
        globalList=list;
        globalList.listTasks.forEach((task)=>{
            switch (type) {
                case 'All':
                    allFilterFn(task);
                    break;
                case 'Today':
                    todayFilterFn(task);
                    break;
                case 'Week':
                    weekFilterFn(task);
                    break;
                case 'Important':
                    importantFilterFn(task);
                    break;
                case 'Completed':
                    completedFilterFn(task);
                    break;
                default:
                    break;
            }
        });
    });
    allTasks.forEach((task)=>{
        addTaskToPage(task.title,task.date,task.priority,task.completion,task.taskRef,null,task.listRef);
    })
    allTasks=[];
    return maindiv;
}

function allFilterFn(task){
    let newtask=task;
    newtask.listRef=globalList.listRef;
    allTasks.push(newtask);
}

function  todayFilterFn(task){
    let today=(new Date()).toISOString().split('T')[0];
    //console.log(today,task.date.toISOString().split('T')[0])
    if(today==task.date.toISOString().split('T')[0]){
        let newtask=task;
        newtask.listRef=globalList.listRef;
        allTasks.push(newtask);
    }
}

function weekFilterFn(task){
    let today=new Date();
    if(((task.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))<=7){
        let newtask=task;
        newtask.listRef=globalList.listRef;
        allTasks.push(newtask);
    }
}

function importantFilterFn(task){
    if(task.priority){
        let newtask=task;
        newtask.listRef=globalList.listRef;
        allTasks.push(newtask);
    }
}

function completedFilterFn(task){
    if(task.completion){
        let newtask=task;
        newtask.listRef=globalList.listRef;
        allTasks.push(newtask);
    }
}
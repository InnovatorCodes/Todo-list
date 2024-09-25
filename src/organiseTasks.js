import calendarallsvg from "./images/calendar-all.svg";

function createAllPage(lists,prevmaindiv){
    const maindiv=document.createElement('div');
    maindiv.classList.add('maindiv');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const listImg=document.createElement('img');
    listImg.src=calendarallsvg;
    const title=document.createElement('div');
    //console.log(lists,list,listRef);
    title.textContent=list.listTitle;
    heading.append(listImg,title);
    const tasks=document.createElement('div');
    tasks.classList.add('tasks');
    maindiv.append(heading,addTaskBtn,tasks);
    if(prevmaindiv) document.querySelector('.content').removeChild(prevmaindiv);
    document.querySelector('.content').appendChild(maindiv);
    lists.forEach()
}
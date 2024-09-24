import listsvg from './images/list.svg';
import deletesvg from './images/delete.svg';

export { createList };

let listCount=0;

function createList(title,lists,listsDiv){
    let list = {
        listTitle: title,
        listTasks: []
    }
    lists.push(list);
    const newlist=document.createElement('div');
    newlist.dataset.listnum=listCount;
    listCount++;
    newlist.classList.add('list');
    const listimg=document.createElement('img');
    const div=document.createElement('div');
    div.textContent=list.listTitle;
    listimg.src=listsvg;
    const deletebtn=document.createElement('img');
    deletebtn.src=deletesvg;
    deletebtn.classList.add('deletebtn');
    newlist.append(listimg,div,deletebtn);
    listsDiv.appendChild(newlist);
}
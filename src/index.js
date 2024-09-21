import "./styles.css";
import displayAllTasks from "./all-tasks";

let currentTab='mytasks';
let listCount=1;
const content=document.querySelector('.content');
const createListDialog = document.querySelector('dialog#createlist');

function createList(){
    createListDialog.showModal();
    const createListForm=document.querySelector('#createlist form');
    const cancelbtn=document.querySelector('#createlist .cancelbtn');
    cancelbtn.add
    createListForm.addEventListener('submit',(event)=>{
        event.preventDefault();
    })    
    /*let title=document.querySelector('dialog.createlist #title');
    let index=listCount;

    listCount++;
    let list = {
        listTitle: title,
        listIndex: index,
        listTasks: []
    }
    storage.lists.push(list);
    //addListToUI();
    createListDialog.close();*/
}

function changeSelected(classname){
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.'+classname).classList.add('selected');
    currentTab=classname;
}

const storage={
    "lists": [
        
    ]
};

document.addEventListener('click',(event)=>{
    let target=event.target;
    if(target.classList.contains('all') && currentTab!="all"){
        changeSelected('all');
    }
    if(target.classList.contains('today') && currentTab!="today"){
        changeSelected('today');
    }
    if(target.classList.contains('week') && currentTab!="week"){
        changeSelected('week');
    }
    if(target.classList.contains('important') && currentTab!="important"){
        changeSelected('important');
    }
    if(target.classList.contains('completed') && currentTab!="completed"){
        changeSelected('completed');
    }
    if(target.classList.contains('addlistbtn')){
        createList();
    }
})
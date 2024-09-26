import "./styles.css";
import { createList,deleteList, createListPage, findList, addListToPage, setlistRefCount, editList } from "./manageLists";
import { addTask, findTask, editTask, deleteTask, changeCompletion, changePriority } from "./manageTasks";
import { createOrganisePage } from "./organiseTasks";
import { findNote, newNote, editNote, deleteNote } from "./manageNotes";
import { storeData,retrieveData } from "./manageLocalStorage";

let currentTab='mytasks', selectedListRef=0, editingTask=false, editTaskElem;
let editingNote=false, editNoteElem;
let editingList=false, editListElem, listSelected=false;
let maindiv;
const listStorage=retrieveData('list');
const noteStorage=retrieveData('note');

//console.log(listStorage);

function resetInputs(form){
    form.querySelectorAll('input').forEach((inputelem)=>{
        inputelem.value='';
    })
    let textarea=form.querySelector('textarea');
    if(textarea) textarea.value='';
    let checkbox=form.querySelector('input[type=checkbox]')
    if(checkbox) checkbox.checked=false;
}

const createListDialog = document.querySelector('dialog#createlist');
const addTaskDialog =document.querySelector('dialog#addTask');
const newNoteDialog=document.querySelector('dialog#newNote');
const createListForm=document.querySelector('#createlist form');
const addTaskForm= document.querySelector('#addTask form');
const newNoteForm= document.querySelector('#newNote form');
const cancelbtns=document.querySelectorAll('dialog .cancelbtn');

document.querySelector('dialog#deleteinvalid button').addEventListener('click',()=>{
    //console.log(document.querySelector('dialog#deleteinvalid'));
    document.querySelector('dialog#deleteinvalid').close();
})
cancelbtns.forEach((btn)=>{
    btn.addEventListener('click',(event)=>{
        resetInputs(event.target.parentNode.parentNode);
        btn.parentNode.parentNode.close();
    })
})
createListDialog.addEventListener('cancel',(event)=>{
    event.preventDefault();
    resetInputs(createListForm);
    createListDialog.close();
})
createListForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let title=document.querySelector('#createlist .titleinput').value;
    if(editingList) editList(title,editListElem,listSelected,listStorage);
    else createList(title,listStorage);
    resetInputs(createListForm);
    editingList=false;
    editListElem=undefined;
    listSelected=false;
    createListDialog.close();
    storeData(listStorage,noteStorage);
})
addTaskDialog.addEventListener('cancel',(event)=>{
    event.preventDefault();
    resetInputs(addTaskForm);
    addTaskDialog.close();
})
addTaskForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let title=document.querySelector('#addTask .titleinput').value;
    let desc=document.querySelector('#addTask .descinput').value;
    let priority=document.querySelector('#addTask .priorityinput').checked;
    let date=new Date(document.querySelector('#addTask .dateinput').value);
    if(editingTask) editTask(title,date,priority,desc,editTaskElem,listStorage)
    else addTask(title,date,priority,desc,listStorage,selectedListRef);
    resetInputs(addTaskForm);
    editingTask=false;
    editTaskElem=undefined;
    addTaskDialog.close();
    storeData(listStorage,noteStorage);
})

newNoteDialog.addEventListener('cancel',(event)=>{
    event.preventDefault();
    resetInputs(newNoteForm);
    newNoteDialog.close();
})

newNoteForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let title=document.querySelector('#newNote .titleinput').value;
    let desc=document.querySelector('#newNote .descinput').value;
    if(editingNote) editNote(title,desc,editNoteElem,noteStorage);
    else newNote(title,desc,noteStorage);
    resetInputs(newNoteForm);
    newNoteDialog.close();
    storeData(listStorage,noteStorage);
    editingNote=false;
    editNoteElem=undefined;
})

function changeSelected(classname,listElem){
    let currentSelected=document.querySelector('.selected');
    if(currentSelected) currentSelected.classList.remove('selected');
    if(classname=='lists'){
        //console.log(listElem,listStorage);
        selectedListRef=listElem.dataset.listRef;
        maindiv=createListPage(listElem,listStorage,maindiv);
        //console.log(maindiv.parentNode);
        listElem.classList.add('selected');
    }
    else{
        maindiv=createOrganisePage(listStorage,maindiv,classname);
        document.querySelector('.'+'org'+classname).classList.add('selected');
        selectedListRef=-1;
    } 
    currentTab=classname;
}

document.addEventListener('click',(event)=>{
    let target=event.target;
    //console.log(listStorage[0].listTasks);
    if(target.classList.contains('orgAll') || target.parentNode.classList.contains('orgAll') && currentTab!="All"){
        changeSelected('All');
    }
    else if(target.classList.contains('orgToday') || target.parentNode.classList.contains('orgToday') && currentTab!="Today"){
        changeSelected('Today');
    }
    else if(target.classList.contains('orgWeek') || target.parentNode.classList.contains('orgWeek') && currentTab!="Week"){
        changeSelected('Week');
    }
    else if(target.classList.contains('orgImportant') || target.parentNode.classList.contains('orgImportant') && currentTab!="Important"){
        changeSelected('Important');
    }
    else if(target.classList.contains('orgCompleted') || target.parentNode.classList.contains('orgCompleted') && currentTab!="Completed"){
        changeSelected('Completed');
    }
    else if(target.classList.contains('addlistbtn')){
        document.querySelector('#createlist .heading h2').textContent='Create List';
        document.querySelector('#createlist button').textContent='Create List';
        createListDialog.showModal();
    }
    else if(target.classList.contains('editlistbtn')){
        document.querySelector('#createlist .heading h2').textContent='Edit List Name'
        document.querySelector('#createlist button').textContent='Confirm';
        let listRef=target.parentNode.dataset.listRef;
        let list=findList(listStorage,listRef);
        editingList=true;
        editListElem=target.parentNode;
        if(selectedListRef==listRef) listSelected=true;
        createListDialog.querySelector('.titleinput').value=list.listTitle;
        createListDialog.showModal();
    }
    else if(target.classList.contains('deletelistbtn')){
        let listRef=target.parentNode.dataset.listRef;
        //console.log(listRef);
        let status=deleteList(target,listStorage);
        if(listRef==selectedListRef && status==true){
            changeSelected('lists',document.querySelectorAll('.list')[0]);
        }
        storeData(listStorage,noteStorage);
    }
    else if(target.classList.contains('list') || target.parentNode.classList.contains('list')){
        let listRef;
        if(!target.hasAttribute('data-list-ref')) target=target.parentNode;
        listRef=target.dataset.listRef;
        if(selectedListRef!=listRef){
            selectedListRef=listRef;
            changeSelected('lists',target);
        }
    }
    else if(target.classList.contains('more')){
        let morebtn=target;
        target=target.parentNode.parentNode;
        let taskref=target.dataset.taskRef;
        let listRef=target.dataset.listRef;
        let desc=findTask(findList(listStorage,listRef),taskref).description;
        if(desc!=''){
            morebtn.classList.toggle('more');
            morebtn.classList.toggle('less');
            const descDiv=document.createElement('div');
            descDiv.textContent=desc;
            descDiv.classList.add('desc');
            const listName=document.createElement('div');
            listName.classList.add('listname');
            listName.textContent='List: '+findList(listStorage,listRef).listTitle;
            target.append(descDiv,listName);
        }
    }
    else if(target.classList.contains('less')){
        let lessbtn=target;
        target=target.parentNode.parentNode;
        const descDiv=target.querySelector('.desc');
        const listname=target.querySelector('.listname');
        target.removeChild(descDiv);
        target.removeChild(listname);
        lessbtn.classList.toggle('less');
        lessbtn.classList.toggle('more');
    }
    else if(target.classList.contains('completion') || target.classList.contains('primary') || target.classList.contains('title') || target.classList.contains('task')){
        if(target.classList.contains('title')) target=target.parentNode;
        if(!target.classList.contains('completion')) target=target.querySelector('.completion');
        changeCompletion(target,listStorage);
        storeData(listStorage,noteStorage);
    }
    else if(target.classList.contains('priority')){
        changePriority(target,listStorage);
        storeData(listStorage,noteStorage);
    }
    else if(target.classList.contains('editTask')){
        editingTask=true;
        editTaskElem=target.parentNode.parentNode;
        document.querySelector('#addTask .heading h2').textContent='Edit Task';
        document.querySelector('#addTask button').textContent='Confirm';
        let taskref=target.parentNode.parentNode.dataset.taskRef;
        let listRef=target.parentNode.parentNode.dataset.listRef;
        let task=findTask(findList(listStorage,listRef),taskref);
        addTaskDialog.querySelector('.titleinput').value=task.title;
        addTaskDialog.querySelector('.dateinput').valueAsDate=task.date;
        addTaskDialog.querySelector('.descinput').value=task.description;
        addTaskDialog.querySelector('.priorityinput').checked=task.priority;
        addTaskDialog.showModal();
    }
    else if(target.classList.contains('deleteTask')){
        deleteTask(target,listStorage);
        storeData(listStorage,noteStorage);
    }
    else if(target.classList.contains('addTaskbtn') || target.parentNode.classList.contains('addTaskbtn')){
        document.querySelector('#addTask .heading h2').textContent='Add Task';
        document.querySelector('#addTask button').textContent='Add Task';
        addTaskDialog.showModal();
    }
    else if(target.classList.contains('addnotebtn') || target.classList.contains('addnotebtn')){
        document.querySelector('#newNote .heading h2').textContent='New Note';
        document.querySelector('#newNote button').textContent='Add Note';
        newNoteDialog.showModal();
    }
    else if(target.classList.contains('editNote')){
        editingNote=true;
        editNoteElem=target.parentNode.parentNode;
        document.querySelector('#newNote .heading h2').textContent='Edit Note';
        document.querySelector('#newNote button').textContent='Confirm';
        let noteRef=editNoteElem.dataset.noteRef;
        let note=findNote(noteStorage,noteRef);
        newNoteDialog.querySelector('.titleinput').value=note.noteTitle;
        newNoteDialog.querySelector('.descinput').value=note.noteDescription;
        newNoteDialog.showModal();
    }
    else if(target.classList.contains('deleteNote')){
        let deleteNoteDiv=target.parentNode.parentNode;
        deleteNote(deleteNoteDiv,noteStorage);
        storeData(listStorage,noteStorage);
    }
    //console.log(target);
    //console.log(listStorage);
})

//STARTUP
//console.log(listStorage.length);
if(listStorage.length==0){
    createList("My Tasks",listStorage);
}
else{
    setlistRefCount(listStorage.length-1,listStorage[0].listRef);
    listStorage.forEach((list)=>addListToPage(list));
}
//console.log(listStorage.length);
//console.log(document.querySelector('.list'));
setTimeout(()=>{
    changeSelected('lists',(document.querySelectorAll('.list'))[0]);
},200)
const today = (new Date()).toISOString().split('T')[0];
document.querySelector('#addTask .dateinput').min=today;
setTimeout(()=>{
    document.querySelector('.loading').style.display='none';
},250);
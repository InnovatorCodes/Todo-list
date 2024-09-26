import editsvg from "./images/edit.svg";
import deletesvg from "./images/delete.svg";

export {newNote, findNote, editNote, deleteNote, addNoteToPage};

let noteRefCounter=0

function newNote(title,description,notes){
    let note={
        noteTitle: title,
        noteDescription: description,
    }
    note.noteRef=noteRefCounter;
    noteRefCounter++;
    notes.push(note);
    addNoteToPage(note);
}

function addNoteToPage(note){
    const noteDiv=document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.dataset.noteRef=note.noteRef;
    const title=document.createElement('div');
    title.classList.add('noteTitle');
    title.textContent=note.noteTitle;
    const desc=document.createElement('div');
    desc.classList.add('noteDesc');
    desc.textContent=note.noteDescription;
    const options=document.createElement('div');
    options.classList.add('options');
    const edit=document.createElement('img');
    edit.classList.add('editNote');
    edit.src=editsvg;
    const deleteImg=document.createElement('img');
    deleteImg.classList.add('deleteNote');
    deleteImg.src=deletesvg;
    options.append(edit,deleteImg);
    noteDiv.append(title,desc,options);
    document.querySelector('.notesDiv').appendChild(noteDiv);
}

function findNote(notes,noteRef){
    return (notes.filter((note)=>noteRef==note.noteRef))[0];
}

function editNote(title,description,editNoteElem,notes){
    let noteRef=editNoteElem.dataset.noteRef;
    let note=findNote(notes,noteRef);
    note.noteTitle=title;
    note.noteDescription=description;
    editNoteOnPage(title,description,editNoteElem);
    //console.log(notes)
}

function editNoteOnPage(title,description,editNoteElem){
    editNoteElem.querySelector('.noteTitle').textContent=title;
    editNoteElem.querySelector('.noteDesc').textContent=description;
}

function deleteNote(deleteNoteDiv,notes){
    let noteRef=deleteNoteDiv.dataset.noteRef;
    let noteIndex=notes.indexOf(findNote(notes,noteRef));
    notes.splice(noteIndex,1);
    deleteNoteFromPage(deleteNoteDiv);
}

function deleteNoteFromPage(deleteNoteDiv){
    deleteNoteDiv.classList.add('fadeOut');
    setTimeout(()=>{
        document.querySelector('.notesDiv').removeChild(deleteNoteDiv);
    },300);
}

/*<div class="note">
    <div class="title">Hello There</div>
    <div class="desc">This is my first task</div>
    <div class="options">
        <img src="./images/edit.svg" alt="edit-task">
        <img src="./images/delete.svg" alt="delete-task">
    </div>
</div>*/
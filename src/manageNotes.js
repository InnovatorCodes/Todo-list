import editsvg from "./images/edit.svg";
import deletesvg from "./images/deletesvg";

let noteRefCounter=0

function createNote(title,description,notes){
    let note={
        noteTitle: title,
        noteDescription: description,
        noteRef: noteRefCounter
    }
    notes.push(note);
    addNoteToPage(note);
}

function addNoteToPage(note){
    const noteDiv=document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.dataset.noteRef=note.noteRef;
    const title=document.createElement('div');
    title.classList.add('title');
    title.textContent=note.title;
    const desc=document.createElement('div');
    desc.classList.add('desc');
    desc.textContent=note.description;
    const options=document.createElement('div');
    options.classList.add('options');
    const edit=document.createElement('img');
    edit.classList.add('editNote');
    edit.src=editsvg;
    const deleteImg=document.createElement('img');
    deleteImg.classList.add('deleteNote');
    deleteImg.src=deletesvg;
    options.append(edit,deleteImg);

}

/*<div class="note">
    <div class="title">Hello There</div>
    <div class="desc">This is my first task</div>
    <div class="options">
        <img src="./images/edit.svg" alt="edit-task">
        <img src="./images/delete.svg" alt="delete-task">
    </div>
</div>*/
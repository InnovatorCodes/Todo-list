export {storeData,retrieveData};

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeData(lists,notes){
    if (storageAvailable("localStorage")) {
        let listsString=JSON.stringify(lists);
        let notesString=JSON.stringify(notes);
        localStorage.setItem('listStorage', listsString);
        localStorage.setItem('noteStorage', notesString);
    }
    else console.log("Not able to store in local storage");      
}

function retrieveData(type){
    if (!localStorage.getItem("listStorage")) {
        return [];
    } 
    else {
        if(type=='list'){
            return JSON.parse(localStorage.getItem('listStorage'),function(key,value){
                if(key=='date') return new Date(value);
                else return value;
            });
        }
        else return JSON.parse(localStorage.getItem('noteStorage'));
    }
}


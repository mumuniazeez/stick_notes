let myNotes = [];
let id = 0;


// getting note from localStorage
let notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));
if (notesFromLocalStorage) { // checking if there is any note
    myNotes = notesFromLocalStorage;
    if (myNotes.length != 0) id = myNotes[myNotes.length - 1].id + 1;
    addNote();
} else {
    notesContainer.innerHTML = "<h1>No note available, Please add a note.</h1>";
}


// when the add button ic lick it will add a note
addBtn.addEventListener("click", () => {
    if (myNotes.length != 0) id = myNotes[myNotes.length - 1].id + 1;
    const note = {
        title: "",
        content: "",
        id: id++
    };
    myNotes.push( note );
    localStorage.setItem("myNotes", JSON.stringify( myNotes ));
    addNote();
});

function addNote(id = 0) {
    let HTML_Note_String = ""
    for (let i = 0; i < myNotes.length; i++) {
        const note = myNotes[i];
        note.id = id;
        HTML_Note_String += `
            <li class="noteFromHTML" id="${note.id}">
                <div class="title">
                    <input class="${note.id}" id="titleInput" value="${note.title}" type="text" placeholder="Tittle">
                </div>
                <div class="note-txt">
                    <textarea class="${note.id}" id="noteInput" type="text" placeholder="Notes......">${note.content}</textarea>
                </div>
                <div class="delete-btn">
                <button id="deleteBtn" class="${note.id}">Delete</button>
                </div>
            </li>
        `;
        notesContainer.innerHTML = HTML_Note_String;
        id++;
    }

    let titleInputs = document.querySelectorAll("#titleInput");
    let noteInputs = document.querySelectorAll("#noteInput");
    let deleteButtons = document.querySelectorAll("#deleteBtn");

    for (let i = 0; i < titleInputs.length; i++) {
        const titleInput = titleInputs[i];
        titleInput.oninput = () => {
            const thisNote = myNotes.find(note => note.id == titleInput.className);
            thisNote.title = titleInput.value;
            localStorage.setItem("myNotes", JSON.stringify( myNotes ));
        }
    }
    for (let i = 0; i < noteInputs.length; i++) {
        const noteInput = noteInputs[i];
        noteInput.oninput = () => {
            const thisNote = myNotes.find(note => note.id == noteInput.className);
            thisNote.content = noteInput.value;
            localStorage.setItem("myNotes", JSON.stringify( myNotes ));
        };
    };
    for (let i = 0; i < deleteButtons.length; i++) {
        const deleteButton = deleteButtons[i];
        deleteButton.onclick = () => {
            myNotes = myNotes.filter(note => note.id != deleteButton.className);
            addNote();
            localStorage.setItem("myNotes", JSON.stringify( myNotes ));
            if (myNotes.length != 0) id = myNotes[myNotes.length - 1].id + 1;
            if (myNotes.length == 0) {
                localStorage.removeItem('myNotes');
                notesContainer.innerHTML = "<h1>No note available, Please add a note.</h1>";
            };
        };    
    };
};


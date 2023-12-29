let notes = [
    {
        id: new Date(),
        title: 'Sample Title',
        description: 'This is the description to the sample note.',
        bgColor: 'pink'
    }
]

const createElement = (tag, classes = []) => {
    const element = document.createElement(tag);
    classes.forEach(cl => {
        element.classList.add(cl);
    })
    return element;
}

const createNoteView = (note) => {
    const noteDiv = createElement('div', ['note']);
    noteDiv.id = note.id;
    const textDiv = createElement('div', ['text']);
    textDiv.style.background = note.bgColor;
    const titleP = createElement('b', ['title']);
    titleP.innerHTML = note.title;
    const descriptionP = createElement('p', ['description']);
    descriptionP.innerHTML = note.description;
    const editButton = createElement('button', ['edit']);
    editButton.innerHTML = 'Edit Note';
    const deleteButton = createElement('button', ['delete']);
    deleteButton.innerHTML = 'Delete Note';

    textDiv.appendChild(titleP);
    textDiv.appendChild(descriptionP);
    noteDiv.appendChild(textDiv);
    noteDiv.appendChild(editButton);
    noteDiv.appendChild(deleteButton);

    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);

    return noteDiv;
}

const deleteNote = (noteDiv) => {
    noteDiv.remove();
    notes = notes.filter(note => note.id != noteDiv.id);
}

const cancelEdit = (noteDiv) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = false;
    const descriptionP = noteDiv.querySelector('p.description');
    descriptionP.contentEditable = false;
    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Edit Note';
    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Delete Note';
    const note = notes.find(note => note.id == noteDiv.id);
    titleP.innerHTML = note.title;
    descriptionP.innerHTML = note.description;
    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);
}

const editNote = (noteDiv, editSave = false) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = true;
    titleP.focus();
    const descriptionP = noteDiv.querySelector('p.description');
    descriptionP.contentEditable = true;
    descriptionP.focus();

    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Save Note';
    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Cancel Edit';

    editButton.onclick = () => editNote(noteDiv, true);
    deleteButton.onclick = () => cancelEdit(noteDiv);

    if(editSave) {
        const note = notes.find(note => note.id == noteDiv.id);
        note.title = titleP.innerText.trim();
        note.description = descriptionP.innerText.trim();
        deleteButton.innerHTML = 'Cancel Edit';
        editButton.innerHTML = 'Edit Note';
        titleP.contentEditable = false;
        descriptionP.contentEditable = false;
        editButton.onclick = () => editNote(noteDiv);
        deleteButton.onclick = () => deleteNote(noteDiv);
    }
}

const saveNote = () => {
    const titleInput = document.querySelector('input#title'); 
    const descriptionInput = document.querySelector('input#description');
    const bgColorInput = document.querySelector('select');
    const id = new Date().getTime();
    const note = {
        id, title: titleInput.value, description: descriptionInput.value, bgColor: bgColorInput.value
    }

    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
    titleInput.value = '';
    descriptionInput.value = '';
    bgColorInput.value = '';
}

document.querySelector('button.add').onclick = () => saveNote();

const notesDiv = document.querySelector('.notesDiv');

notes.forEach(note => {
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})
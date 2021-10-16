
const addNoteBtn = document.querySelector('.add-note');

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes) {
    notes.forEach(note => {
        addNewNote(note);
    })
}

addNoteBtn.addEventListener('click', () => {
    addNewNote();
})

function addNewNote(text = '') {
    const row = document.querySelector('.container .row');
    const note = document.createElement('div');
    note.classList.add('notes', 'col', 'l-3', 'm-6', 'c-12');
    note.innerHTML = `
        <div class="tools">
            <button title="Edit/Save"  class="edit" ><i class="fas fa-edit"></i></button>
            <button title="Delete" class="delete" ><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${(text==='')?'hidden':''} ">
        </div>
        <textarea class="${(text==='')?'':'hidden'}" name="" id="" cols="30" rows="14"></textarea>
    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const mainEle = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    mainEle.innerHTML = marked(text);

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    })

    editBtn.addEventListener('click', () => {
        mainEle.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        mainEle.innerHTML = marked(value);
        updateLS();
    })

    row.appendChild(note);
}

function updateLS() {
    const notes = document.querySelectorAll('.notes textarea');
    const notesData = [];

    notes.forEach((note) => {
        if(note.value.trim()!=='')
            notesData.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notesData));
}
import UserInterface from './modules/UI.js';
import databaseHandler from './modules/dbHandler.js';

const UI = new UserInterface();
const dbHandler = new databaseHandler();

const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const editTitle = document.getElementById('edit-title');
const editContent = document.getElementById('edit-content');
const noteInput = document.querySelector('.note-input');
const noteSection = document.querySelector('.note-section');



const fetchNotes = async () => {
    const data = await dbHandler.getData();

    noteInput.reset();
    noteSection.innerHTML = '';

    if (data) {
        data.forEach(note => {
            noteSection.innerHTML += UI.createNote(note.title, note.content);
        });

        const notes = document.querySelectorAll('.note');
        notes.forEach((note, idx) => {
            note.addEventListener('click', () => {
                editNote(note, idx);
            });
        });
    }
}

const createNote = async () => {
    if (titleInput.value || contentInput.value) {
        updateData('create')
            .then(() => fetchNotes());
    }
}

const editNote = (note, idx) => {
    const exitBtn = document.querySelector('.exit-btn');
    const editBtn = document.querySelector('.edit-btn');
    const removeBtn = document.querySelector('.remove-btn')

    const [title, content] = [...note.children].map(element => element.innerHTML);

    editTitle.value = title;
    editContent.value = content;

    editBtn.addEventListener('click', (e) => {
        updateData('edit', idx)
            .then(() => reload());
        e.preventDefault();
    });

    removeBtn.addEventListener('click', (e) => {
        updateData('remove', idx)
            .then(() => reload());
        e.preventDefault();
    });

    exitBtn.addEventListener('click', (e) => {
        document.body.classList.remove('edit');
        e.preventDefault();
    });

    document.body.classList.add('edit');
}

const updateData = async (action, idx) => {
    let data = await dbHandler.getData();

    switch (action) {
        case 'create':
            if (!data) data = [];

            data.push({
                title: titleInput.value,
                content: contentInput.value
            });

            break;
        case 'edit':
            data[idx].title = editTitle.value;
            data[idx].content = editContent.value;
            break;
        case 'remove':
            data.splice(idx, 1);
            break;
        default:
            break;
    }

    return dbHandler.updateData(data);
}

const reload = () => {
    return window.location.reload();
}

window.addEventListener('load', () => fetchNotes());

noteInput.addEventListener('submit', (e) => {
    createNote();
    e.preventDefault();
});

[titleInput, contentInput].forEach(input => {
    input.addEventListener('focus', () => titleInput.parentNode.classList.add('active'));
    input.addEventListener('blur', () => titleInput.parentNode.classList.remove('active'));
});
import UserInterface from './modules/UI.js';
import databaseHandler from './modules/dbHandler.js';

const UI = new UserInterface();
const dbHandler = new databaseHandler();

const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const noteInput = document.querySelector('.note-input');
const noteSection = document.querySelector('.note-section');


const fetchNotes = () => {
    noteInput.reset();
    noteSection.innerHTML = '';

    dbHandler.getData()
        .then(res => {
            if (res) {
                return Object.values(res)
            } else { return; }
        })
        .then(data => {

            if (data) {
                data.forEach(note => {
                    noteSection.innerHTML += UI.createNote(note.title, note.content);
                });

                document.querySelectorAll('.note').forEach((note, idx) => {
                    note.addEventListener('click', () => {
                        editNote(note, idx);
                    });
                });
            }
        });
}

const createNote = async () => {
    const fetchData = await dbHandler.getData();

    if (fetchData) {
        const data = Object.values(fetchData);

        if (titleInput.value || contentInput.value) {
            data.push({
                title: titleInput.value,
                content: contentInput.value
            });
            dbHandler.updateData(data);
        }
    } else {
        db.ref('notes/' + 0).set({
            title: titleInput.value,
            content: contentInput.value
        })
    }


    fetchNotes();
}

const editNote = (note, idx) => {
    const editTitle = document.getElementById('edit-title');
    const editContent = document.getElementById('edit-content');
    const exitBtn = document.querySelector('.exit-btn');
    const editBtn = document.querySelector('.edit-btn');
    const removeBtn = document.querySelector('.remove-btn')

    const [title, content] = [...note.children].map(element => element.innerHTML);

    editTitle.value = title;
    editContent.value = content;

    editBtn.addEventListener('click', (e) => {
        dbHandler.getData()
            .then(response => Object.values(response))
            .then(data => {
                data[idx].title = editTitle.value;
                data[idx].content = editContent.value;

                dbHandler.updateData(data);
            });
    });

    removeBtn.addEventListener('click', (e) => {
        dbHandler.getData()
            .then(response => Object.values(response))
            .then(data => {
                data.splice(idx, 1);
                dbHandler.updateData(data);
            });
    });

    exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.remove('edit');
    });

    document.body.classList.add('edit');
}


window.addEventListener('load', () => fetchNotes());

noteInput.addEventListener('submit', (e) => {
    e.preventDefault(); createNote();
});

[titleInput, contentInput].forEach(input => {
    input.addEventListener('focus', () => titleInput.parentNode.classList.add('active'));
    input.addEventListener('blur', () => titleInput.parentNode.classList.remove('active'));
});
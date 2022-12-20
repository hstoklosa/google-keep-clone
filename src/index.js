const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const editTitle = document.getElementById("edit-title");
const editContent = document.getElementById("edit-content");
const noteInput = document.querySelector(".note-input");
const noteSection = document.querySelector(".note-section");

// Database Handler Functions

const reference = db.ref("notes/").once("value");

const getData = async () => {
   const database = await db.ref("notes/").once("value");
   return database.val();
};

const updateNotes = (data) => {
   db.ref("notes/").set(data, (error) => {
      if (error) return error;

      return "Data updated successfully!";
   });
};

// App Functions

const fetchNotes = async () => {
   const data = await getData();

   noteInput.reset();
   noteSection.innerHTML = "";

   if (data) {
      data.forEach((note) => {
         //  noteSection.innerHTML += createNote(note.title, note.content);

         noteSection.innerHTML += `
            <div class="note">
                <h2>${note.title}</h2>
                <p>${note.content}</p>
            </div>
        `;
      });

      const notes = document.querySelectorAll(".note");
      notes.forEach((note, idx) => {
         note.addEventListener("click", () => {
            editNote(note, idx);
         });
      });
   }
};

const editNote = (note, idx) => {
   const exitBtn = document.querySelector(".exit-btn");
   const editBtn = document.querySelector(".edit-btn");
   const removeBtn = document.querySelector(".remove-btn");

   const [title, content] = [...note.children].map((element) => element.innerHTML);

   editTitle.value = title;
   editContent.value = content;

   editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateNote(idx).then(() => fetchNotes());
      document.body.classList.remove("edit");
   });

   removeBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      removeNote(idx).then(() => fetchNotes());
      document.body.classList.remove("edit");
   });

   exitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.remove("edit");
   });

   document.body.classList.add("edit");
};

const createNote = async () => {
   const notes = (await getData()) || [];

   return updateNotes([
      ...notes,
      {
         title: titleInput.value,
         content: contentInput.value,
      },
   ]);
};

const updateNote = async (idx) => {
   const notes = await getData();

   notes[idx].title = editTitle.value;
   notes[idx].content = editContent.value;

   return updateNotes(notes);
};

const removeNote = async (idx) => {
   const notes = await getData();
   const new_notes = notes.filter((note, index) => index !== idx);

   return updateNotes(new_notes);
};

// Events Listeners

window.addEventListener("load", () => fetchNotes());

noteInput.addEventListener("submit", (e) => {
   e.preventDefault();

   if (titleInput.value || contentInput.value) {
      createNote().then(() => fetchNotes());
   }
});

[titleInput, contentInput].forEach((input) => {
   input.addEventListener("focus", () => titleInput.parentNode.classList.add("active"));
   input.addEventListener("blur", () => titleInput.parentNode.classList.remove("active"));
});

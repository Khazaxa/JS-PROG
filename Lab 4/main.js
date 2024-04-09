document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.note button');
    const titleInput = document.querySelector('.note .title');
    const textarea = document.querySelector('.note textarea');
    const notesContainer = document.getElementById('notes');

    function addNote() {
        const title = titleInput.value.trim();
        const content = textarea.value.trim();
        const id = Date.now().toString();

        if (!title && !content) return;

        const note = {
            id,
            title,
            content,
            createdAt: new Date().toISOString(),
        };
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        titleInput.value = '';
        textarea.value = '';
    }

    function deleteNote(noteId) {
        let notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes = notes.filter(note => note.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }

    function displayNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-display';

            const noteTitle = document.createElement('h3');
            noteTitle.textContent = note.title;

            const noteDate = document.createElement('small');
            noteDate.textContent = new Date(note.createdAt).toLocaleString();

            const contentDiv = document.createElement('div');
            contentDiv.style.display = 'none';
            contentDiv.innerHTML = `<p>${note.content}</p>`;

            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'More';
            toggleButton.onclick = () => {
                contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
                toggleButton.textContent = contentDiv.style.display === 'none' ? 'More' : 'Less';
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteNote(note.id);

            noteElement.appendChild(noteTitle);
            noteElement.appendChild(noteDate);
            noteElement.appendChild(toggleButton);
            noteElement.appendChild(deleteButton);
            noteElement.appendChild(contentDiv);
            notesContainer.appendChild(noteElement);
        });
    }

    addButton.addEventListener('click', addNote);
    displayNotes();
});
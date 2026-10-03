// 1. Select DOM elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const notesList = document.getElementById('notes-list');
const noteCount = document.getElementById('note-count');

// 2. Load notes from localStorage or start with empty array
let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

// 3. Save notes to localStorage
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// 4. Update the count message
function updateCount() {
    const count = notes.length;
    if (count === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (count === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${count} notes.`;
    }
}

// 5. Render the notes list
function render(notesToRender = notes) {
    notesList.innerHTML = ''; // Clear current list
    
    if (notesToRender.length === 0 && searchInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = "No notes match your search.";
        li.style.padding = "10px";
        li.style.color = "#666";
        notesList.appendChild(li);
        return;
    }

    notesToRender.forEach(note => {
        // Create list item (card)
        const li = document.createElement('li');
        li.className = `note-card category-${note.category}`;
        
        // Create text element (NEVER use innerHTML for user text)
        const pText = document.createElement('p');
        pText.className = 'note-text';
        pText.textContent = note.text;
        
        // Create meta container
        const divMeta = document.createElement('div');
        divMeta.className = 'note-meta';
        
        // Create date/category span
        const spanMeta = document.createElement('span');
        spanMeta.textContent = `${note.category.charAt(0).toUpperCase() + note.category.slice(1)} • ${note.createdAt}`;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id));
        
        // Assemble the card
        divMeta.appendChild(spanMeta);
        divMeta.appendChild(deleteBtn);
        li.appendChild(pText);
        li.appendChild(divMeta);
        notesList.appendChild(li);
    });
    
    updateCount();
}

// 6. Add a new note
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    const category = noteCategory.value;
    
    // Validation
    if (text === '') {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }
    
    // Clear error if valid
    errorMessage.textContent = '';
    
    // Create note object
    const newNote = {
        id: Date.now(), // Unique ID based on timestamp
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };
    
    notes.unshift(newNote); // Add to beginning of array
    saveNotes();
    render();
    
    // Reset form
    noteForm.reset();
});

// 7. Delete a note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render(); // Re-render will automatically respect current search
}

// 8. Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );
    render(filteredNotes);
});

// 9. Initial render on page load
render();
// Project 1 submission ready
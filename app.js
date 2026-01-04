// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    console.log('CYOA Builder initialized');
    
    // Initialize the main menu
    const mainMenu = document.getElementById('main-menu');
    const editorScreen = document.getElementById('editor-screen');
    
    // Show main menu by default
    mainMenu.classList.remove('hidden');
    
    // Set up event listeners for main menu buttons
    document.getElementById('new-project-btn').addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        editorScreen.classList.remove('hidden');
        // Initialize new project
        initNewProject();
    });
    
    document.getElementById('load-project-btn').addEventListener('click', () => {
        // TODO: Implement project loading functionality
        alert('Load project functionality coming soon!');
    });
    
    // Set up event listeners for editor screen
    document.getElementById('exit-editor-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to exit to the main menu? Any unsaved changes will be lost.')) {
            editorScreen.classList.add('hidden');
            mainMenu.classList.remove('hidden');
        }
    });
    
    // Initialize modals
    initModals();
});

// Initialize a new project
function initNewProject() {
    // Set default project name
    document.getElementById('project-name').textContent = 'Untitled Project';
    
    // Clear any existing content
    document.getElementById('scene-title').value = '';
    document.getElementById('scene-text').textContent = 'Scene text will appear here...';
    document.getElementById('choice-buttons').innerHTML = '';
    document.getElementById('characters-in-scene').innerHTML = '';
    document.getElementById('sub-background-list').innerHTML = '';
    
    // Initialize empty scene
    const currentScene = {
        id: 'scene-1',
        title: 'New Scene',
        text: 'This is the beginning of your adventure!',
        background: null,
        characters: [],
        choices: []
    };
    
    // Update UI
    updateSceneUI(currentScene);
}

// Update the scene UI based on scene data
function updateSceneUI(scene) {
    document.getElementById('scene-title').value = scene.title;
    document.getElementById('scene-text').textContent = scene.text;
    
    // Update background if exists
    const backgroundEl = document.getElementById('scene-background');
    if (scene.background) {
        backgroundEl.style.backgroundImage = `url('${scene.background}')`;
    } else {
        backgroundEl.style.backgroundImage = '';
    }
    
    // Update characters in scene
    const charactersEl = document.getElementById('characters-in-scene');
    charactersEl.innerHTML = '';
    scene.characters.forEach(char => {
        const charEl = document.createElement('div');
        charEl.className = 'character-in-scene';
        charEl.innerHTML = `
            <div class="character-portrait" style="background-image: url('${char.portrait}')"></div>
            <span>${char.name}</span>
            <button class="remove-character" data-char-id="${char.id}">×</button>
        `;
        charactersEl.appendChild(charEl);
    });
    
    // Update choices
    const choicesEl = document.getElementById('choice-buttons');
    choicesEl.innerHTML = '';
    scene.choices.forEach((choice, index) => {
        const choiceEl = document.createElement('button');
        choiceEl.className = 'choice-btn';
        choiceEl.textContent = choice.text || `Choice ${index + 1}`;
        choicesEl.appendChild(choiceEl);
    });
}

// Initialize modal dialogs
function initModals() {
    // Character modal
    const charModal = document.getElementById('character-modal');
    
    // Open character modal
    document.getElementById('create-character-btn').addEventListener('click', () => {
        charModal.style.display = 'block';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === charModal) {
            charModal.style.display = 'none';
        }
    });
    
    // Close button for character modal
    document.getElementById('cancel-character-btn').addEventListener('click', () => {
        charModal.style.display = 'none';
    });
    
    // Save character
    document.getElementById('save-character-btn').addEventListener('click', () => {
        const charName = document.getElementById('character-name').value.trim();
        if (!charName) {
            alert('Please enter a character name');
            return;
        }
        
        // TODO: Save character data
        console.log('Saving character:', charName);
        charModal.style.display = 'none';
    });
    
    // Initialize other modals similarly...
}

// Export functions that need to be accessed from other modules
window.CYOA = {
    initNewProject,
    updateSceneUI,
    initModals
};

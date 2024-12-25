//Get the sidebar buttons and sections
const manageModelsBtn = document.getElementById('manage-models-btn');
const modelRequestsBtn = document.getElementById('modelRequestsBtn');
const notificationsBtn = document.getElementById('notificationsBtn');
const logoutBtn = document.getElementById('logoutBtn');

const welcomeSection = document.getElementById('welcome-msg');
const manageModelsSection = document.getElementById('manage-models-section');
const modelRequestsSection = document.getElementById('modelRequestsSection');
const notificationsSection = document.getElementById('notificationsSection');

// const adminCardButtons=document.getElementsByClassName('admin-cards-button');
// const adminCards=document.getElementsByClassName('admin-cards');

// for (let i = 0; i < adminCardButtons.length; i++) {
//     adminCardButtons[i].addEventListener('click', function () {
//       // Hide all cards
//       for (let j = 0; j < adminCards.length; j++) {
//         adminCards[j].classList.remove('active');
//       }
//       // Show the clicked card
//       adminCards[i].classList.add('active');
//     });
//   }







// Function to show a section and hide others
function showSection(sectionId) {
    // Hide all sections
    welcomeSection.style.display = 'none';
    manageModelsSection.style.display = 'none';
    modelRequestsSection.style.display = 'none';
    notificationsSection.style.display = 'none';

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// On page load, show the welcome section by default
window.onload = function() {
    showSection('welcome-msg');  // Show welcome section on load
};

// Handle Manage Models button click to show the models section
// manageModelsBtn.addEventListener('click', function () {
//     showSection('manage-models-section');  // Show Manage Models section
//     renderModels();  // Render models on this section
// });

// Handle Model Requests button click to show the model requests section
modelRequestsBtn.addEventListener('click', function () {
    showSection('modelRequestsSection');  // Show Model Requests section
});

// Handle Notifications button click to show the notifications section
notificationsBtn.addEventListener('click', function () {
    showSection('notificationsSection');  // Show Notifications section
});

// Handle Logout button click
logoutBtn.addEventListener('click', function () {
    // You can handle the logout logic here, like redirecting to a login page or showing a message
    showSection('welcome-msg');  // Show the welcome section after logout
    alert("Logged out successfully!");  // Show a logout success message
});


// Handle Manage Models button click to show models section
manageModelsBtn.addEventListener('click', function () {
    // Show Manage Models section
    document.getElementById('right-panel').innerHTML = `
        <h2>Manage Models</h2>
        <button id="add-model-btn" class="add-model-btn">+ Add Model</button>
        <div id="models-list" class="models-list"></div>
    `;
    renderModels(); // Initial render of models
    document.getElementById('add-model-btn').addEventListener('click', openAddModelForm); // Add model button click
});

// Handle Model Requests button click to show the model requests section
modelRequestsBtn.addEventListener('click', function () {
    showSection('modelRequestsSection');  // Show Model Requests section
});

// Handle Notifications button click to show the notifications section
notificationsBtn.addEventListener('click', function () {
    showSection('notificationsSection');  // Show Notifications section
});

// Handle Logout button click
logoutBtn.addEventListener('click', function () {
    // You can handle the logout logic here, like redirecting to a login page or showing a message
    showSection('welcome-msg');  // Show the welcome section after logout
    alert("Logged out successfully!");  // Show a logout success message
});

// Model Data Array
let models = []; // Stores model objects
let editingIndex = null; // Keeps track of the model being edited

// Function to render models in the right-panel
function renderModels() {
    const modelsList = document.getElementById('models-list');
    modelsList.innerHTML = '';
    models.forEach((model, index) => {
        const modelContainer = document.createElement('div');
        modelContainer.classList.add('model-card-container');
        modelContainer.innerHTML = `
            <div class="model-card">
                <div class="model-card-header">
                    <img src="${model.img1}" alt="${model.name}" class="model-img">
                    <div class="model-card-title">${model.name}</div>
                </div>
                <div class="model-card-body">
                    <p><strong>Age:</strong> ${model.age}</p>
                    <p><strong>Email:</strong> ${model.email}</p>
                    <p><strong>Category:</strong> ${model.category}</p>
                </div>
                <div class="model-card-footer">
                    <button class="edit-btn" onclick="openEditModelForm(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteModel(${index})">Delete</button>
                </div>
            </div>
        `;
        modelsList.appendChild(modelContainer);
    });
}

// Function to display success messages
function showMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'success-message';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 3000); // Removes message after 3 seconds
}

// Open Add Model Form
function openAddModelForm() {
    editingIndex = null; // Reset editingIndex for adding a new model
    document.getElementById('right-panel').innerHTML = `
        <h2>Add New Model</h2>
        <form id="add-model-form">
            ${getModelFormFields()}
            <button type="submit">Add Model</button>
        </form>
    `;
    document.getElementById('add-model-form').addEventListener('submit', handleFormSubmit);
}

// Open Edit Model Form
function openEditModelForm(index) {
    editingIndex = index;
    const model = models[index];
    document.getElementById('right-panel').innerHTML = `
        <h2>Edit Model</h2>
        <form id="add-model-form">
            ${getModelFormFields(model)}
            <button type="submit">Save Changes</button>
        </form>
    `;
    document.getElementById('add-model-form').addEventListener('submit', handleFormSubmit);
}

// Get model form fields as a template
function getModelFormFields(model = {}) {
    return `
        <div class="form-group"><label for="model-name">Name:</label><input type="text" id="model-name" value="${model.name || ''}" required></div>
        <div class="form-group"><label for="model-email">Email:</label><input type="email" id="model-email" value="${model.email || ''}" required></div>
        <div class="form-group"><label for="model-phone">Phone:</label><input type="text" id="model-phone" value="${model.phone || ''}" required></div>
        <div class="form-group"><label for="model-location">Location:</label><input type="text" id="model-location" value="${model.location || ''}" required></div>
        <div class="form-group"><label for="model-dob">Date of Birth:</label><input type="date" id="model-dob" value="${model.dob || ''}" required></div>
        <div class="form-group"><label for="model-age">Age:</label><input type="number" id="model-age" value="${model.age || ''}" required></div>
        <div class="form-group"><label for="model-gender">Gender:</label><input type="text" id="model-gender" value="${model.gender || ''}" required></div>
        <div class="form-group"><label for="model-category">Category:</label><input type="text" id="model-category" value="${model.category || ''}" required></div>
        <div class="form-group"><label for="model-hair">Hair Color:</label><input type="text" id="model-hair" value="${model.hair || ''}" required></div>
        <div class="form-group"><label for="model-eyes">Eyes Color:</label><input type="text" id="model-eyes" value="${model.eyes || ''}" required></div>
        <div class="form-group"><label for="model-height">Height:</label><input type="text" id="model-height" value="${model.height || ''}" required></div>
        <div class="form-group"><label for="model-weight">Weight:</label><input type="text" id="model-weight" value="${model.weight || ''}" required></div>
        <div class="form-group"><label for="model-hips">Hips Size:</label><input type="text" id="model-hips" value="${model.hips || ''}" required></div>
        <div class="form-group"><label for="model-rate">Rate:</label><input type="text" id="model-rate" value="${model.rate || ''}" required></div>
        <div class="form-group"><label for="model-description">Description:</label><textarea id="model-description" required>${model.description || ''}</textarea></div>
        <div class="form-group"><label for="model-img1">Image 1 URL:</label><input type="text" id="model-img1" value="${model.img1 || ''}" required></div>
        <div class="form-group"><label for="model-img2">Image 2 URL:</label><input type="text" id="model-img2" value="${model.img2 || ''}" required></div>
        <div class="form-group"><label for="model-img3">Image 3 URL:</label><input type="text" id="model-img3" value="${model.img3 || ''}" required></div>
    `;
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    const modelData = {
        name: document.getElementById('model-name').value,
        email: document.getElementById('model-email').value,
        phone: document.getElementById('model-phone').value,
        location: document.getElementById('model-location').value,
        dob: document.getElementById('model-dob').value,
        age: parseInt(document.getElementById('model-age').value, 10),
        gender: document.getElementById('model-gender').value,
        category: document.getElementById('model-category').value,
        hair: document.getElementById('model-hair').value,
        eyes: document.getElementById('model-eyes').value,
        height: document.getElementById('model-height').value,
        weight: document.getElementById('model-weight').value,
        hips: document.getElementById('model-hips').value,
        rate: document.getElementById('model-rate').value,
        description: document.getElementById('model-description').value,
        img1: document.getElementById('model-img1').value,
        img2: document.getElementById('model-img2').value,
        img3: document.getElementById('model-img3').value,
    };

    if (editingIndex === null) {
        models.push(modelData);
        showMessage("Model added successfully!");
    } else {
        models[editingIndex] = modelData;
        showMessage("Model updated successfully!");
    }
    renderModels();
    showSection('manage-models-section');
    
}

// Delete Model
function deleteModel(index) {
    models.splice(index, 1);
    renderModels();
    showMessage("Model deleted successfully!");
}


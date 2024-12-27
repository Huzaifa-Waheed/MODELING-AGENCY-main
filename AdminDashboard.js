//Get the sidebar buttons and sections
// const manageModelsBtn = document.getElementById('manage-models-btn');
// const modelRequestsBtn = document.getElementById('modelRequestsBtn');
// const notificationsBtn = document.getElementById('notificationsBtn');
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


const adminCardButtons = document.querySelectorAll('.admin-cards-button');
const adminCards = document.querySelectorAll('.admin-cards');

    adminCardButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        document.querySelector('#welcome-msg').style.display = 'none';
        
        document.querySelector('#Add-Md-Form').style.display = 'none';
        document.querySelector('#Edit-Md-Form').style.display = 'none';
        // Hide all cards
        adminCards.forEach(card => card.style.display = 'none');
        // Show the clicked card
        adminCards[index].style.display = 'block';
        showdataFromBackend()
      });
    });

    function showdataFromBackend(){
        if(manageModelsSection.style.display == 'block'){
            $.ajax({
                url: "http://localhost:8080/model/show",
                method: "GET",
                success: function(response){
                    console.log(response);
                    renderModels(response)
                },
                error: function(xhr, status, error){
                    console.error("Error fetching models:", error);
                }
                
            })
        }
        if(modelRequestsSection.style.display == 'block'){
            $.ajax({
                url:'http://localhost:8080/admin/applications',
                method: 'GET',
                success: function(response){
                    console.log(response);
                    showAllRequests(response)
                }
            })
        }

        if(notificationsSection.style.display == 'block'){
            $.ajax({
                url:'http://localhost:8080/admin/notifications',
                method: 'GET',
                success: function(response){
                    console.log(response);
                    showAllClientNotifications(response)
                }
            })
        }

    }

    function showAllRequests(requests){
        const tbody = $('#request-tbl-body');
        tbody.empty();
        requests.forEach((request, index) => {
            const tr = `
                <tr>
                            <td>${request.applicationId}</td>
                            <td>${request.name}</td>
                            <td>${request.email}</td>
                            <td>${request.state}</td>
                            <td>
                                <button class="accept-btn" onclick="requestAction('http://localhost:8080/applications/accept/${request.applicationId}')">Accept</button>
                                <button class="reject-btn" onclick="requestAction('http://localhost:8080/applications/reject/${request.applicationId}')">Reject</button>
                            </td>
                        </tr>
            `
            tbody.append(tr)

        })
    }

    function showAllClientNotifications(notifications){
        const notifCard = $('#notificationsSection');
        notifCard.empty()
        notifCard.append('<h2>Notifications</h2>')
        $(notifications).each(function(index,not){

            const notify = `
                <div class="notification-card">
                    <div class="notification-details">
                        <p><strong>Client Email, Address:</strong> ${not.client.email}, ${not.client.address}</p>
                        <p><strong>Date of Hiring:</strong> ${not.requestedDate.split('T')[0]}</p>
                        <p><strong>Client Name:</strong> ${not.client.name}</p>
                        <p><strong>Requested Model Name:</strong> ${not.model.name}</p>
                        <p><strong>Client Description:</strong> ${not.description}</p>
                        <p><strong>Model Email, Location:</strong> ${not.model.email}, ${not.model.location}</p>
                    </div>
                    <div class="notification-actions">
                        <button class="accept-btn" onclick="requestAction('http://localhost:8080/client/accept/${not.id}')">Accept</button>
                        <button class="reject-btn" onclick="requestAction('http://localhost:8080/client/reject/${not.id}')">Reject</button>
                    </div>
                </div>
            `
            notifCard.append(notify)
            
        })
    }

    function requestAction(Url){
        $.ajax({
            url: Url,
            method: 'POST',
            success: function(response){
                toastr.success("State change successfully")
                showdataFromBackend();
            },
            error: function(error){
                toastr.error('Error in deleting:', error);
            }
          })
    }


// Function to show a section and hide others
// function showSection(sectionId) {
//     // Hide all sections
//     welcomeSection.style.display = 'none';
//     manageModelsSection.style.display = 'none';
//     modelRequestsSection.style.display = 'none';
//     notificationsSection.style.display = 'none';

//     // Show the selected section
//     document.getElementById(sectionId).style.display = 'block';
// }

// On page load, show the welcome section by default
// window.onload = function() {
//     showSection('welcome-msg');  // Show welcome section on load
// };

// Handle Manage Models button click to show the models section
// manageModelsBtn.addEventListener('click', function () {
//     showSection('manage-models-section');  // Show Manage Models section
//     renderModels();  // Render models on this section
// });

// Handle Model Requests button click to show the model requests section
// modelRequestsBtn.addEventListener('click', function () {
//     showSection('modelRequestsSection');  // Show Model Requests section
// });

// // Handle Notifications button click to show the notifications section
// notificationsBtn.addEventListener('click', function () {
//     showSection('notificationsSection');  // Show Notifications section
// });

// Handle Logout button click
// logoutBtn.addEventListener('click', function () {
//     // You can handle the logout logic here, like redirecting to a login page or showing a message
//     showSection('welcome-msg');  // Show the welcome section after logout
//     alert("Logged out successfully!");  // Show a logout success message
// });

// document.getElementById('manage-models-section').innerHTML = `
//         <h2>Manage Models</h2>
//         <button id="add-model-btn" class="add-model-btn">+ Add Model</button>
//         <div id="models-list" class="models-list"></div>
//     `;
// Handle Manage Models button click to show models section
// manageModelsBtn.addEventListener('click', function () {
//     // Show Manage Models section
    
//     renderModels(); // Initial render of models

// });
document.getElementById('add-model-btn').addEventListener('click', openAddModelForm); // Add model button click

// Handle Model Requests button click to show the model requests section
// modelRequestsBtn.addEventListener('click', function () {
//     showSection('modelRequestsSection');  // Show Model Requests section
// });

// // Handle Notifications button click to show the notifications section
// notificationsBtn.addEventListener('click', function () {
//     showSection('notificationsSection');  // Show Notifications section
// });

// // Handle Logout button click
// logoutBtn.addEventListener('click', function () {
//     // You can handle the logout logic here, like redirecting to a login page or showing a message
//     showSection('welcome-msg');  // Show the welcome section after logout
//     alert("Logged out successfully!");  // Show a logout success message
// });

// Model Data Array
let models = []; // Stores model objects
let editingIndex = null; // Keeps track of the model being edited

// Function to render models in the right-panel
function renderModels(allmodels) {
    // <img src="../../SCD Project Backend/ModelAgency_Spring/${model.imgUrl1.replace(/\\/g, '/')}" alt="${model.name}" class="model-img"></img>
    const modelsList = document.getElementById('models-list');
    modelsList.innerHTML = '';
    models = allmodels;
    allmodels.forEach((model, index) => {
        const modelContainer = document.createElement('div');
        modelContainer.classList.add('model-card-container');
        modelContainer.innerHTML = `
            <div class="model-card">
                <div class="model-card-header">
                     
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
// function showMessage(message) {
//     const messageBox = document.createElement('div');
//     messageBox.className = 'success-message';
//     messageBox.textContent = message;
//     document.body.appendChild(messageBox);

//     setTimeout(() => {
//         messageBox.remove();
//     }, 3000); // Removes message after 3 seconds
// }

// Open Add Model Form
function openAddModelForm() {
    adminCards.forEach(card => card.style.display = 'none');
    document.querySelector('#Add-Md-Form').style.display = 'block';
    editingIndex = null; // Reset editingIndex for adding a new model
    document.getElementById('Add-Md-Form').innerHTML = `
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
    adminCards.forEach(card => card.style.display = 'none');
    document.querySelector('#Edit-Md-Form').style.display = 'block';
    editingIndex = index;
    const model = models[index];
    console.log(model);
    document.getElementById('Edit-Md-Form').innerHTML = `
        <h2>Edit Model</h2>
        <form id="add-model-form">
            ${getModelEditFormFields(model)}
            <button type="submit">Save Changes</button>
        </form>
    `;
    document.getElementById('add-model-form').addEventListener('submit', handleEditFormSubmit);
}

document.querySelector("#logoutBtn").addEventListener('click',() => {
    console.log("yes i am in")
    window.location.href = "/LandingPage.htm"
})

// Get model form fields as a template
function getModelFormFields(model = {}) {
    return `
        <div class="form-group"><label for="model-name">Name:</label><input type="text" name="name" id="name" value="${model.name || ''}" required></div>
        <div class="form-group"><label for="model-email">Email:</label><input type="email" name="email" id="email" value="${model.email || ''}" required></div>
        <div class="form-group"><label for="model-phone">Phone:</label><input type="text" name="phone" id="phone" value="${model.phone || ''}" required></div>
        <div class="form-group"><label for="model-location">Location:</label><input type="text" id="location" value="${model.location || ''}" required></div>
        <div class="form-group"><label for="model-dob">Date of Birth:</label><input type="date" id="dob" value="${model.dob || ''}" required></div>
        <div class="form-group"><label for="model-gender">Gender:</label><input type="text" id="gender" value="${model.gender || ''}" required></div>
        <div class="form-group"><label for="model-category">Category:</label><input type="text" id="category" value="${model.category || ''}" required></div>
        <div class="form-group"><label for="model-hair">Hair Color:</label><input type="text" id="hair" value="${model.hair || ''}" required></div>
        <div class="form-group"><label for="model-eyes">Eyes Color:</label><input type="text" id="eyeColor" value="${model.eyeColor || ''}" required></div>
        <div class="form-group"><label for="model-height">Height:</label><input type="text" id="height" value="${model.height || ''}" required></div>
        <div class="form-group"><label for="model-weight">Weight:</label><input type="text" id="weight" value="${model.weight || ''}" required></div>
        <div class="form-group"><label for="model-hips">Hips Size:</label><input type="text" id="hips" value="${model.hips || ''}" required></div>
        <div class="form-group"><label for="model-rate">Rate:</label><input type="text" id="rate" value="${model.rate || ''}" required></div>
        <div class="form-group"><label for="model-description">Description:</label><textarea id="description" required>${model.description || ''}</textarea></div>
        <div class="form-group"><label for="model-img1">Image 1 URL:</label><input type="file" id="imgUrl1" value="${model.img1 || ''}" required></div>
        <div class="form-group"><label for="model-img2">Image 2 URL:</label><input type="file" id="imgUrl2" value="${model.img2 || ''}" required></div>
        <div class="form-group"><label for="model-img3">Image 3 URL:</label><input type="file" id="imgUrl3" value="${model.img3 || ''}" required></div>
    `;
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Create a FormData object from the form
    const formData = new FormData();
    
    formData.append('imgUrl1',this.imgUrl1.files[0]);
    formData.append('imgUrl2',this.imgUrl2.files[0]);
    formData.append('imgUrl3',this.imgUrl3.files[0]);

    const restData = {
        'name': this.name.value,
        'email': this.email.value,
        'phone': this.phone.value,
        'dob': this.dob.value,
        'gender': this.gender.value,
        'weight': this.weight.value,
        'height': this.height.value,
        'hair': this.hair.value,
        'eyeColor': this.eyeColor.value,
        'hips': this.hips.value,
        'description': this.description.value,
        'category': this.category.value,
        'rate': this.rate.value,
        'location': this.location.value
    }

    formData.append('restData',JSON.stringify(restData));

    // Use fetch API to send the data
    fetch('http://localhost:8080/model/add', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            toastr.success('Form submitted successfully');

                document.querySelector('#welcome-msg').style.display = 'none';
                
                document.querySelector('#Add-Md-Form').style.display = 'none';
                document.querySelector('#Edit-Md-Form').style.display = 'none';
                // Hide all cards
                adminCards.forEach(card => card.style.display = 'none');
                // Show the clicked card
                adminCards[0].style.display = 'block';
                showdataFromBackend()
              
        } else {
            console.error('Form submission failed', response);
            toastr.error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toastr.error('Error submitting form');
    });
    
}

// Delete Model
function deleteModel(index) {
    //models.splice(index, 1);
    const mdl = models[index];
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: `http://localhost:8080/model/delete/${mdl.modelId}`,
            method: 'DELETE',
            success: function(response){
                if (response.ok) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Model has been deleted.",
                        icon: "success"
                      });
                      showdataFromBackend();
                }else{
                    toastr.error('Model deleted failed');
                }
            },
            error: function(error){
                toastr.error('Error in deleting:', error);
            }
          })
        }
      });
}

function getModelEditFormFields(model = {}) {
    return `
        <div style="display:none;" class="form-group"><label for="model-name">Name:</label><input type="text" name="modelId" id="modelId" value="${model.modelId || ''}" required></div>
        <div class="form-group"><label for="model-name">Name:</label><input type="text" name="name" id="name" value="${model.name || ''}" required></div>
        <div class="form-group"><label for="model-email">Email:</label><input type="email" name="email" id="email" value="${model.email || ''}" required></div>
        <div class="form-group"><label for="model-phone">Phone:</label><input type="text" name="phone" id="phone" value="${model.phone || ''}" required></div>
        <div class="form-group"><label for="model-location">Location:</label><input type="text" id="location" value="${model.location || ''}" required></div>
        <div class="form-group"><label for="model-dob">Date of Birth:</label><input type="date" id="dob" value="${model.dob.split('T')[0] || ''}" required></div>
        <div class="form-group"><label for="model-gender">Gender:</label><input type="text" id="gender" value="${model.gender || ''}" required></div>
        <div class="form-group"><label for="model-category">Category:</label><input type="text" id="category" value="${model.category || ''}" required></div>
        <div class="form-group"><label for="model-hair">Hair Color:</label><input type="text" id="hair" value="${model.hair || ''}" required></div>
        <div class="form-group"><label for="model-eyes">Eyes Color:</label><input type="text" id="eyeColor" value="${model.eyeColor || ''}" required></div>
        <div class="form-group"><label for="model-height">Height:</label><input type="text" id="height" value="${model.height || ''}" required></div>
        <div class="form-group"><label for="model-weight">Weight:</label><input type="text" id="weight" value="${model.weight || ''}" required></div>
        <div class="form-group"><label for="model-hips">Hips Size:</label><input type="text" id="hips" value="${model.hips || ''}" required></div>
        <div class="form-group"><label for="model-rate">Rate:</label><input type="text" id="rate" value="${model.rate || ''}" required></div>
        <div class="form-group"><label for="model-description">Description:</label><textarea id="description" required>${model.description || ''}</textarea></div>
        <div class="form-group"><label for="model-img1">Image 1 URL:</label><input type="file" id="imgUrl1" value="${model.img1 || ''}" required></div>
        <div class="form-group"><label for="model-img2">Image 2 URL:</label><input type="file" id="imgUrl2" value="${model.img2 || ''}" required></div>
        <div class="form-group"><label for="model-img3">Image 3 URL:</label><input type="file" id="imgUrl3" value="${model.img3 || ''}" required></div>
    `;
}

// Handle Form Submission
function handleEditFormSubmit(event) {
    event.preventDefault();
    // Create a FormData object from the form
    const formData = new FormData();
    
    formData.append('imgUrl1',this.imgUrl1.files[0]);
    formData.append('imgUrl2',this.imgUrl2.files[0]);
    formData.append('imgUrl3',this.imgUrl3.files[0]);

    const restData = {
        'modelId': this.modelId.value,
        'name': this.name.value,
        'email': this.email.value,
        'phone': this.phone.value,
        'dob': this.dob.value,
        'gender': this.gender.value,
        'weight': this.weight.value,
        'height': this.height.value,
        'hair': this.hair.value,
        'eyeColor': this.eyeColor.value,
        'hips': this.hips.value,
        'description': this.description.value,
        'category': this.category.value,
        'rate': this.rate.value,
        'location': this.location.value
    }

    formData.append('restData',JSON.stringify(restData));

    // Use fetch API to send the data
    fetch('http://localhost:8080/model/edit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            toastr.success('Form submitted successfully');

                document.querySelector('#welcome-msg').style.display = 'none';
                
                document.querySelector('#Add-Md-Form').style.display = 'none';
                document.querySelector('#Edit-Md-Form').style.display = 'none';
                // Hide all cards
                adminCards.forEach(card => card.style.display = 'none');
                // Show the clicked card
                adminCards[0].style.display = 'block';
                showdataFromBackend()
              
        } else {
            console.error('Form submission failed', response);
            toastr.error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toastr.error('Error submitting form');
    });
    
}

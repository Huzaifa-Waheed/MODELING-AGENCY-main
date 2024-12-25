// Function to open the hire card modal
const hireBtn = document.getElementById('hire-btn');
const hireModal = document.getElementById('hire-card-modal');
const hireConfirmBtn = document.getElementById('hire-confirm');
const hireCancelBtn = document.getElementById('hire-cancel');

// Extract model name from URL
const params = new URLSearchParams(window.location.search);
const modelId = params.get('id');
console.log(modelId);

$.ajax({
    url: `http://localhost:8080/model/getmodel/${modelId}`,
    method: "GET",
    success: function(model) {

        document.getElementById('model-name').textContent = model.name;
        document.getElementById('model-rate').textContent = "Rs: " + model.rate;
        document.getElementById('model-height').textContent = model.height;
        document.getElementById('model-weight').textContent = model.weight;
        document.getElementById('model-waist').textContent = model.gender;
        document.getElementById('model-hips').textContent = model.hips;
        document.getElementById('model-hair').textContent = model.hair;
        document.getElementById('model-shoe').textContent = model.age;
        document.getElementById('model-eye').textContent = model.eyeColor;
        document.getElementById('model-location').textContent = model.location;
        document.getElementById('model-experience').textContent = model.age /10 + " Years of Experience";
        const imageWrapper = document.querySelector('.image-wrapper');
        imageWrapper.innerHTML = model.images.map(src => `<img src="${model.imgUrl1}" alt="${model.name}">`).join('');
    }
})

// // Data for models
// const models = [
//     { 
//         name: 'Ali Khan', 
//         rate: '$200/day', 
//         height: '6\'2"', 
//         weight: '80 kg', 
//         waist: '32 inches', 
//         hips: '36 inches', 
//         hair: 'Black', 
//         shoe: '11 US', 
//         eye: 'Brown', 
//         location: 'Karachi, Pakistan', 
//         experience: 'Worked with Gucci and Prada',
//         images: [
//             'BOYS MODEL/1 B/1574792157_2796.jpg',
//             'BOYS MODEL/1 B/1574792159_2799.jpg',
//             'BOYS MODEL/1 B/1574792170_2812.jpg',
//             'BOYS MODEL/1 B/1574792170_2813.jpg',
//             'BOYS MODEL/1 B/1574792172_2815.jpg',
//             'BOYS MODEL/1 B/1574792204_2844.jpg',
//             'BOYS MODEL/1 B/1632493866_5547.jpg',
//             'BOYS MODEL/1 B/1632493894_5549.jpg',
//             'BOYS MODEL/1 B/1632493937_5550.jpg',
//             'BOYS MODEL/1 B/1574792158_2797.jpg',
//             'BOYS MODEL/1 B/1574792192_2832.jpg',
//             'BOYS MODEL/1 B/1574792203_2843.jpg'
//         ] 
//     },
//     { 
//         name: 'Saad', 
//         rate: '$170/day', 
//         height: '6\'1"', 
//         weight: '75 kg', 
//         waist: '32 inches', 
//         hips: '34 inches', 
//         hair: 'Black', 
//         shoe: '10 US', 
//         eye: 'Brown', 
//         location: 'New York, USA', 
//         experience: 'Recently worked with Louis Vuitton, Balenciaga, Vogue, and Lacoste.',
//         images: [
//                 'BOYS MODEL/3B/1634033864_5599.jpg',
//                 'BOYS MODEL/3B/1634033861_5595.jpg',
//                 'BOYS MODEL/3B/1634033861_5596.png',
//                 'BOYS MODEL/3B/1634033862_5597.jpg',
//                 'BOYS MODEL/3B/1634033867_5603.jpg',
//                 'BOYS MODEL/3B/1634033859_5594.jpg',
//                 'BOYS MODEL/3B/1634033872_5609.jpg',
//                 'BOYS MODEL/3B/1634033874_5612.jpg',
//                 'BOYS MODEL/3B/1634033880_5620.jpg',
//                 'BOYS MODEL/3B/1634033880_5621.jpg',
//                 'BOYS MODEL/3B/1634033859_5594.jpg',
//                 'BOYS MODEL/3B/1634033872_5609.jpg'
//         ]
//     }
// ];

// // Decode and match the model name (case-insensitive and trimming extra spaces)
// const decodedName = decodeURIComponent(modelName).toLowerCase().trim();
// const model = models.find(model => model.name.toLowerCase().trim() === decodedName);

// if (model) {
//     // Display model details
//     document.getElementById('model-name').textContent = model.name;
//     document.getElementById('model-rate').textContent = model.rate;
//     document.getElementById('model-height').textContent = model.height;
//     document.getElementById('model-weight').textContent = model.weight;
//     document.getElementById('model-waist').textContent = model.waist;
//     document.getElementById('model-hips').textContent = model.hips;
//     document.getElementById('model-hair').textContent = model.hair;
//     document.getElementById('model-shoe').textContent = model.shoe;
//     document.getElementById('model-eye').textContent = model.eye;
//     document.getElementById('model-location').textContent = model.location;
//     document.getElementById('model-experience').textContent = model.experience;

//     // Populate images in the image slider
//     const imageWrapper = document.querySelector('.image-wrapper');
//     imageWrapper.innerHTML = model.images.map(src => `<img src="${src}" alt="${model.name}">`).join('');
// } else {
//     // Display a user-friendly message if the model is not found
//     document.getElementById('model-details').innerHTML = `
//         <h2>Model Not Found</h2>
//         <p>Sorry, the model you are looking for does not exist. Please go back to the <a href="ModelExplore.html">Explore Page</a>.</p>
//     `;
// }

// Slider functionality
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const imageWrapper = document.querySelector('.image-wrapper');

let currentPosition = 0;
const imagesPerView = 3;
const totalImages = document.querySelectorAll('.image-wrapper img').length;
const maxPosition = Math.ceil(totalImages / imagesPerView) - 1;

prevBtn.addEventListener('click', () => {
    currentPosition = currentPosition > 0 ? currentPosition - 1 : maxPosition;
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    currentPosition = currentPosition < maxPosition ? currentPosition + 1 : 0;
    updateSliderPosition();
});

function updateSliderPosition() {
    const moveAmount = -currentPosition * 100;
    imageWrapper.style.transform = `translateX(${moveAmount}%)`;
}

// Show the modal when "Hire Now" button is clicked
hireBtn.addEventListener('click', () => {
    hireModal.classList.add('show');
});

// Close the modal when the cancel button is clicked
hireCancelBtn.addEventListener('click', () => {
    hireModal.classList.remove('show');
});

// Handle confirmation logic 
hireConfirmBtn.addEventListener('click', () => {
    const hireDate = document.getElementById('hire-date').value;
    const hireDescription = document.getElementById('hire-description').value;
    
    if (hireDate && hireDescription) {
        // Logic for confirming the hire (send data to the server)
        alert('Model hired successfully!');
        hireModal.classList.remove('show'); // Close the modal
    } else {
        alert('Please fill in all fields!');
    }
});
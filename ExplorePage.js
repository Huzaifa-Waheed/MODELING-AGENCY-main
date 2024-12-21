document.addEventListener('DOMContentLoaded', () => {
    const models = [
        { name: 'Ali Khan', height: "6'2\"", age: 25, category: 'male', image: 'Pics/Ali-khan-main-pic.png' },
        { name: 'Huzaifa', height: "5'7\"", age: 22, category: 'female', image: 'Pics/Huzaifa-main-pic.png' },
        { name: 'Saad', height: "6'1\"", age: 27, category: 'male', image: 'Pics/Saad-main-pic.png' },
        { name: 'SZA', height: "5'6\"", age: 24, category: 'female', image: 'Pics/SZA-main-pic.png' },
        { name: 'Ali Baksh', height: "5'8\"", age: 27, category: 'male', image: 'Pics/AliBaksh-main-pic.png' }
    ];

    // --- RENDER MODEL CARDS ---
    const gallery = document.getElementById('model-gallery');
    
    function renderModels(modelList) {
        gallery.innerHTML = modelList.map(model => `
            <a href="ModelDetailPage.htm?name=${encodeURIComponent(model.name)}" class="model-card" data-category="${model.category}">
                <img src="${model.image}" alt="Model Image">
                <div class="model-info">
                    <h3>${model.name}</h3>
                    <p>Height: ${model.height} | Age: ${model.age} | ${model.category} Model</p>
                </div>
            </a>
        `).join('');
    }
    
    renderModels(models);

    // --- CATEGORY FILTER FUNCTIONALITY ---
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links, add to current link
            categoryLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            const filteredModels = selectedCategory === 'all'
                ? models
                : models.filter(model => model.category === selectedCategory);

            renderModels(filteredModels); // Render filtered models
        });
    });

    // --- SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', () => {
        const searchValue = searchInput.value.toLowerCase().trim();
        
        // Filter models based on search input
        const filteredModels = models.filter(model => 
            model.name.toLowerCase().includes(searchValue)
        );

        renderModels(filteredModels);
    });
});

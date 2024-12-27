document.addEventListener('DOMContentLoaded', () => {
    const modelPics = [
         'Pics/Ali-khan-main-pic.png',
         'Pics/Huzaifa-main-pic.png',
         'Pics/Saad-main-pic.png',
         'Pics/SZA-main-pic.png',
         'Pics/AliBaksh-main-pic.png',
         'Pics/1574791858_2633.jpg',
         'Pics/1574791859_2634.jpg',
         'Pics/1574792204_2844.jpg',
         'Pics/1574792203_2843.jpg',
         'Pics/1574792203_2843.jpg',
         'Pics/1574793622_2972.jpg',
         'Pics/1574793623_2973.jpg',
         'Pics/1574792159_2799.jpg',
         'Pics/1574791860_2635.jpg',
         'Pics/1574792158_2797.jpg'
    ];
    // --- RENDER MODEL CARDS ---
    //const gallery = document.getElementById('model-gallery');
    const gallery = $('#model-gallery');
    $.ajax({
        url: "http://localhost:8080/model/show",
        method: "GET",
        success: function(response){
            console.log(response);
            $(response).each(function(index,model){
                console.log(model);
                const modelCard = `
                <a href="ModelDetailPage.htm?id=${encodeURIComponent(model.modelId)}" class="model-card" data-category="${model.category}">
                <img src="${modelPics[index]}" alt="Model Image">
                <div class="model-info">
                    <h3>${model.name}</h3>
                    <p>Height: ${model.height} | Age: ${model.age} | ${model.category} Model</p>
                </div>
            </a>
                `
                gallery.append(modelCard);
            })
        },
        error: function(xhr, status, error){
            console.error("Error fetching models:", error);
        }
        
    })
   
    
    // function renderModels(modelList) {
    //     gallery.innerHTML = modelList.map(model => `
    //         <a href="ModelDetailPage.htm?name=${encodeURIComponent(model.name)}" class="model-card" data-category="${model.category}">
    //             <img src="${model.image}" alt="Model Image">
    //             <div class="model-info">
    //                 <h3>${model.name}</h3>
    //                 <p>Height: ${model.height} | Age: ${model.age} | ${model.category} Model</p>
    //             </div>
    //         </a>
    //     `).join('');
    // }
    
    // renderModels(models);

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



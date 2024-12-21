document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("background-section");

    const backgrounds = 
    [
        "Pics/miranda-kerr-australian-model-portrait-5k-5068x3379-3204.jpg",
        "Pics/miranda-kerr-model-5120x2880-14005.jpg"
    ];

    let currentIndex = 0;

    function updateBackground(index) {
        section.style.setProperty('--background-image', `url('${backgrounds[index]}')`);
    }

    document.getElementById("scroll-up").addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length; // Cycle backward
        updateBackground(currentIndex);
    });

    document.getElementById("scroll-down").addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % backgrounds.length; // Cycle forward
        updateBackground(currentIndex);
    });
});



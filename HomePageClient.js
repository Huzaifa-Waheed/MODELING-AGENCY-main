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


document.addEventListener("DOMContentLoaded", () => {
    const notificationsButton = document.getElementById("notifications-button");
    const notificationsCard = document.getElementById("notifications-card");
    const closeButton = document.getElementById("close-card");

    // Show the notifications card
    notificationsButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default behavior
        notificationsCard.classList.remove("hidden");
    });

    // Close the notifications card
    closeButton.addEventListener("click", () => {
        notificationsCard.classList.add("hidden");
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all buttons and panes
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabPanes.forEach((pane) => pane.classList.remove("active"));

            // Add 'active' class to the clicked button and corresponding pane
            button.classList.add("active");
            tabPanes[index].classList.add("active");
        });
    });
});

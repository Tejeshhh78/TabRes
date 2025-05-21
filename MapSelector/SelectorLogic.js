document.addEventListener("DOMContentLoaded", () => {
    const buildingDropdown = document.getElementById("building-dropdown");
    const levelDropdown = document.getElementById("level-dropdown");
    const roomDropdown = document.getElementById("room-dropdown");
    const confirmButton = document.getElementById("confirm-button");
    const iframe = document.getElementById("embedded-page");

    confirmButton.addEventListener("click", () => {
        const building = buildingDropdown.value;
        const level = levelDropdown.value;
        const room = roomDropdown.value;

        // Check if all dropdowns have a selected value
        if (!building || !level || !room) {
            alert("Please select a building, level, and room.");
            iframe.src = ""; // Clear the iframe source
            return;
        }

        // Construct the path to the map file based on the selected options
        const mapPath = `../Maps/Map_${building}_${level}_${room}.html`;
        iframe.src = mapPath; // Set the iframe source
    });
});
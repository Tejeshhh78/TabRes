// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const seatButtons = document.querySelectorAll(".seat-button");
    const popup = document.getElementById("popup");
    const seatNumberSpan = document.getElementById("seat-number");
    const confirmButton = document.getElementById("confirm-button");
    const popupText = document.getElementById("popup-text");

    let selectedButton = null; // To track the currently selected button

    let building = null;
    let level = null;
    let room = null;
    let seat = null;
    let seatID = null;

    function clearSeatData() {
        building = null;
        level = null;
        room = null;
        seat = null;
        seatID = null;
    }

    // Click event listener for the seat buttons
    seatButtons.forEach((button) => {
        button.addEventListener("click", () => {

            selectedButton = button; // Store the clicked button in above variable

            building = button.getAttribute("data-building"); // Get building from data attribute
            level = button.getAttribute("data-level"); // Get level from data attribute
            room = button.getAttribute("data-room"); // Get room from data attribute
            seat = button.getAttribute("data-seat"); // Get seat from data attribute
            seatID = button.getAttribute("data-seatID"); // Get seat ID from data attribute

            seatNumberSpan.textContent = button.textContent; // Set seat number in popup

            // Set popup text for unavailable seat (change this to a database check in the future)
            if (button.style.backgroundColor === "red" ) {
                popupText.innerHTML = `
                    This time slot is already booked.<br>
                `;
                confirmButton.innerHTML = `
                    Cancel
                `;
                popup.classList.remove("hidden"); // Show popup
                return; // Exit if the seat is already booked
            }
            // Set popup text for available seat (change this to a database check in the future)
            popupText.innerHTML = `
                Click confirm to book this time slot.<br>
                Click anywhere else to cancel.
            `;
            confirmButton.innerHTML = `
                Confirm
            `;
            popup.classList.remove("hidden"); // Show popup
        });
    });

    // Close popup when clicking outside the popup content
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.add("hidden");
            // Clear innerHTML of popup text and confirm button
            popupText.innerHTML = "";
            confirmButton.innerHTML = "";
        }
    });

    // Popup confirm button click event
    confirmButton.addEventListener("click", () => {
        // If the seat is already booked (change this to a database check in the future)
        if (selectedButton.style.backgroundColor === "red" ) {
            popup.classList.add("hidden"); // Close popup after confirmation
            // Clear innerHTML of popup text and confirm button
            popupText.innerHTML = "";
            confirmButton.innerHTML = "";
            clearSeatData(); // Clear seat data after booking
        }
        // If the seat is available (change this to a database check in the future)
        else { 
            selectedButton.style.backgroundColor = "red";
            popup.classList.add("hidden"); // Close popup after confirmation
            // Clear innerHTML of popup text and confirm button
            popupText.innerHTML = "";
            confirmButton.innerHTML = "";
            
            // Example booking data
            seatData = {
                building: building,
                level: level,
                room: room,
                seat: seat,
                user: "Lukas"
            }
            timeSlot = "2025/05/02,AM" //should be dynamic in the future
            bookingData = {
                seatID: seatID,
                seatData: seatData
            };
            databaseEntry = [bookingData]; // Create an array with time slot and booking data

            addToDatabase(timeSlot, bookingData); // Call the function to add booking data to the database

            // Debugging outputs
            console.log(getEntryData(timeSlot, seatID));
            console.log(getTimeslot(timeSlot));
            console.log(getDatabase());
            
            clearSeatData(); // Clear seat data after booking
        }
    });
});
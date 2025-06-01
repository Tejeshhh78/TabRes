const mockDatabase = {};

// key is the timeslot (example: "2025/05/02,AM")
function addToDatabase(key, entry) {
    // Check if the key already exists in the database
    if (key in mockDatabase) {
        // If the key exists, update the existing entry by adding the new booking data to the array
        mockDatabase[key].push(entry);
    }
    // If the key does not exist, create a new entry
    else {
        mockDatabase[key] = [entry];
    }
}

function getEntryData(timeSlot, seatID) {
    let entryData = null; // Initialize entryData to null
    timeSlotArray = mockDatabase[timeSlot];

    timeSlotArray.forEach((entry) => {
        if (entry.seatID === seatID) {
            entryData = entry.seatData; // Store the entry data in a variable
        }
    });

    return entryData; // Return the entry data
}

function getTimeslot(timeSlot) {
    return mockDatabase[timeSlot]; // Return the timeslot data
}

function getDatabase() {
    return mockDatabase; // Return the entire database
}

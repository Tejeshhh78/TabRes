// ui.js - UI Rendering Functions and Utilities for TableRes App

// --- Helper Utilities (often UI related for defaults/formatting) ---
function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateId(prefix = 'id_') { // Made prefix more generic
    return `${prefix}${new Date().getTime()}_${Math.random().toString(36).substr(2, 5)}`;
}

// --- Modal Display Function ---
function showGeneralModal(message, type = 'info', elements) {
    if (!elements.generalModalMessage || !elements.generalModalIcon || !elements.generalModalContent || !elements.generalModal) {
        console.error("General modal elements not provided or found.");
        alert(message); // Fallback to alert if modal elements are missing
        return;
    }
    elements.generalModalMessage.textContent = message;
    elements.generalModalIcon.className = 'fas fa-2x mr-3'; // Reset icon classes
    elements.generalModalContent.className = 'relative p-6 rounded-lg shadow-xl w-full max-w-md'; // Reset content classes

    switch (type) {
        case 'success':
            elements.generalModalIcon.classList.add('fa-check-circle', 'text-green-700');
            elements.generalModalContent.classList.add('bg-green-100', 'border-l-4', 'border-green-400', 'text-green-700');
            break;
        case 'error':
            elements.generalModalIcon.classList.add('fa-times-circle', 'text-red-700');
            elements.generalModalContent.classList.add('bg-red-100', 'border-l-4', 'border-red-400', 'text-red-700');
            break;
        case 'info':
        default:
            elements.generalModalIcon.classList.add('fa-info-circle', 'text-blue-700');
            elements.generalModalContent.classList.add('bg-blue-100', 'border-l-4', 'border-blue-400', 'text-blue-700');
            break;
    }
    elements.generalModal.classList.remove('hidden');
}

// --- Page Navigation ---
// `pages` and `navButtons` will be passed from app.js or defined globally if preferred (less ideal)
function showPage(pageId, domElements, appState, renderFunctions) {
    // Hide all pages
    Object.values(domElements.pages).forEach(page => page.classList.add('hidden'));

    // Show requested page
    if (domElements.pages[pageId]) {
        domElements.pages[pageId].classList.remove('hidden');

        // Render specific page content based on the page
        if (pageId === 'dashboard' && appState.currentUser) {
            console.log('Rendering dashboard page...');
            renderDashboard(appState.currentUser, appState.allBookings, domElements, getTodayDateString);
        }
        
        // Immediately render map when showing map page
        if (pageId === 'map') {
            console.log('Rendering map page...');
            renderMapPage(appState, domElements, renderFunctions, populateTimeSlotSelect, getTodayDateString);

            // Force initial map render
            renderFunctions.renderDetailedMap(
                appState,
                domElements,
                roomLayoutData,
                initialDeskData,
                handleMapDeskClick
            );
        }

        // Render booking form when showing book page
        if (pageId === 'book') {
            console.log('Rendering book page...');
            renderBookingForm(appState.bookableItems, domElements, populateDeskSelect, populateTimeSlotRadios, getTodayDateString);
        }

        // Render manage page when showing manage page
        if (pageId === 'manage' && appState.currentUser) {
            console.log('Rendering manage page...');
            renderManageBookingsPage(appState.currentUser, appState.allBookings, domElements, renderFunctions, populateTimeSlotSelect);
        }
    }
}


// --- UI Element Population Functions ---
function populateDeskSelect(tableSelectEl, bookableItemsData) {
    if (!tableSelectEl) return;
    tableSelectEl.innerHTML = '<option value="">-- Schreibtisch wählen --</option>';
    bookableItemsData.forEach(desk => {
        const option = document.createElement('option');
        option.value = desk.id;
        option.textContent = desk.name;
        tableSelectEl.appendChild(option);
    });
}

function populateTimeSlotRadios(container, timeSlots, name, selectedValue = '') {
    container.innerHTML = '';
    timeSlots.forEach(slot => {
        const id = `${name}_${slot.replace(/\s+/g, '_')}`;
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = name;
        radio.value = slot;
        radio.id = id;
        if (slot === selectedValue) radio.checked = true;
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = slot;
        container.appendChild(radio);
        container.appendChild(label);
    });
}

function populateTimeSlotSelect(selectElement, timeSlotsData, defaultSlot = null) {
    if (!selectElement) return;
    selectElement.innerHTML = '';
    console.log('Populating time slot select:', timeSlotsData, 'Default:', defaultSlot); // Debug line
    timeSlotsData.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        if (defaultSlot && slot === defaultSlot) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
}

// --- Page Rendering Functions ---
function renderDashboard(currentUser, allBookings, domElements, getTodayDateStringFn) {
    if (!currentUser || !domElements.welcomeMessage) return;
    domElements.welcomeMessage.textContent = `Willkommen, ${currentUser.name}!`;
    if (domElements.todayDateDisplay) domElements.todayDateDisplay.textContent = getTodayDateStringFn();
    if (domElements.userInfoEmail) domElements.userInfoEmail.textContent = currentUser.email;
    if (domElements.userInfoId) domElements.userInfoId.textContent = currentUser.id;

    const today = getTodayDateStringFn();
    const todaysUserBookings = allBookings.filter(b =>
        b.userId === currentUser.id && b.date === today && b.status !== 'cancelled'
    );

    if (domElements.todaysBookingsList) {
        if (todaysUserBookings.length > 0) {
            domElements.todaysBookingsList.innerHTML = '<p class="text-green-600 font-semibold mb-2">Sie haben heute folgende Buchung(en):</p><ul class="list-disc list-inside space-y-1"></ul>';
            const ul = domElements.todaysBookingsList.querySelector('ul');
            todaysUserBookings.forEach(booking => {
                const li = document.createElement('li');
                li.className = "text-slate-600";
                li.textContent = `${booking.bookedItemName} für ${booking.timeSlot}`;
                ul.appendChild(li);
            });
        } else {
            domElements.todaysBookingsList.innerHTML = '<p class="text-slate-500">Sie haben heute keine aktiven Buchungen.</p>';
        }
    }
}

function renderMapPage(appState, domElements, renderFunctions, populateTimeSlotSelectFn, getTodayDateStringFn) {
    console.log('Setting up map page...');
    
    // Set default date if not set
    if (!appState.mapSelectedDate) {
        appState.mapSelectedDate = getTodayDateStringFn();
    }
    
    // Set default time slot if not set
    if (!appState.mapSelectedTimeSlot) {
        appState.mapSelectedTimeSlot = timeSlots[0]; // First time slot as default
    }

    // Update UI elements
    if (domElements.mapDateSelect) {
        domElements.mapDateSelect.value = appState.mapSelectedDate;
        domElements.mapDateSelect.min = getTodayDateStringFn();
    }

    if (domElements.mapTimeSlotSelect) {
        populateTimeSlotSelectFn(
            domElements.mapTimeSlotSelect, 
            timeSlots, 
            appState.mapSelectedTimeSlot
        );
    }

    // Force initial map render
    renderFunctions.renderDetailedMap(
        appState,
        domElements,
        roomLayoutData,
        initialDeskData,
        handleMapDeskClick
    );
}

function renderDetailedMap(appState, domElements, roomLayout, deskData, mapDeskClickHandler) {
    console.log("Room layout:", roomLayout);
    console.log("Desk data:", deskData);

    if (!domElements.mapContainer) {
        console.error("Map container not found!");
        return;
    }

    domElements.mapContainer.innerHTML = '';
    domElements.mapContainer.className = 'map-grid-container bg-white p-4 rounded-lg shadow-md';

    roomLayout.forEach(room => {
        const roomOuterDiv = document.createElement('div');
        roomOuterDiv.className = 'map-room-container';
        roomOuterDiv.style.gridRowStart = room.gridPos.row;
        roomOuterDiv.style.gridColumnStart = room.gridPos.col;

        // Room name
        const roomNameHeader = document.createElement('div');
        roomNameHeader.className = 'map-room-header mb-2';
        roomNameHeader.textContent = room.name;
        roomOuterDiv.appendChild(roomNameHeader);

        // Desks grid
        const desksGrid = document.createElement('div');
        desksGrid.className = 'map-desks-grid';

        // Filter desks for this room
        const desksInRoom = deskData.filter(d => d.roomId === room.id);
        desksInRoom.forEach(desk => {
            const deskDiv = document.createElement('div');
            deskDiv.className = 'map-desk available';
            deskDiv.textContent = desk.deskLabel;
            deskDiv.dataset.deskId = desk.id;

            // Attach click handler for popup/modal
            deskDiv.addEventListener('click', (event) => {
                mapDeskClickHandler(event, appState, domElements, deskData);
            });

            desksGrid.appendChild(deskDiv);
        });

        roomOuterDiv.appendChild(desksGrid);
        domElements.mapContainer.appendChild(roomOuterDiv);
    });
}


function renderBookingForm(bookableItems, domElements, populateDeskSelect, populateTimeSlotRadios, getTodayDateString, defaults = {}) {
    const selectedDesk = defaults.deskId || '';
    const selectedDate = defaults.date || getTodayDateString();
    const selectedTimeSlot = defaults.timeSlot || '';

    // Populate desk select
    populateDeskSelect(domElements.tableSelect, bookableItems, selectedDesk);

    // Set date
    if (domElements.bookingDateInput) domElements.bookingDateInput.value = selectedDate;

    // Populate time slot radios
    populateTimeSlotRadios(domElements.timeSlotRadiosContainer, timeSlots, "bookingTimeSlot", selectedTimeSlot);
}

function renderManageBookingsPage(currentUser, allBookings, domElements, renderFunctions, populateTimeSlotSelectFn) {
    if (!currentUser || !domElements.userBookingsContainer) return;
    const userBookings = allBookings.filter(b => b.userId === currentUser.id)
                                   .sort((a, b) => new Date(a.date) - new Date(b.date) || a.bookedItemName.localeCompare(b.bookedItemName));
    
    domElements.userBookingsContainer.innerHTML = '';
    if(domElements.manageBookingMessageDiv) {
        domElements.manageBookingMessageDiv.classList.add('hidden');
        domElements.manageBookingMessageDiv.textContent = '';
    }

    if (userBookings.length === 0) {
        domElements.userBookingsContainer.innerHTML = '<p class="text-slate-500 bg-white p-6 rounded-lg shadow">Sie haben keine Buchungen.</p>';
        return;
    }

    userBookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = `bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 ${booking.status === 'cancelled' ? 'opacity-60' : ''}`;
        let statusText = '';
        if (booking.status === 'cancelled') {
            statusText = '<p class="text-red-500 font-semibold text-sm">STORNIERT</p>';
        }
        card.innerHTML = `
            <div>
                <p class="text-lg font-semibold text-sky-700">${booking.bookedItemName}</p>
                <p class="text-slate-600"><i class="fas fa-calendar-alt mr-1"></i> ${booking.date}</p>
                <p class="text-slate-600"><i class="fas fa-clock mr-1"></i> ${booking.timeSlot}</p>
                ${statusText}
            </div>
            ${booking.status !== 'cancelled' ? `
            <div class="flex space-x-2">
                <button data-booking-id="${booking.id}" class="edit-booking-btn bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center transition-colors" title="Bearbeiten">
                    <i class="fas fa-edit mr-1 md:mr-0"></i> <span class="md:hidden">Bearbeiten</span>
                </button>
                <button data-booking-id="${booking.id}" data-booking-name="${booking.bookedItemName}" data-booking-date="${booking.date}" class="cancel-booking-btn bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center transition-colors" title="Stornieren">
                    <i class="fas fa-trash-alt mr-1 md:mr-0"></i> <span class="md:hidden">Stornieren</span>
                </button>
            </div>` : ''}
        `;
        domElements.userBookingsContainer.appendChild(card);
    });

    // Event listeners for edit/cancel buttons will be attached in app.js
    // as they need access to appState and other handlers.
    // Or, pass handlers as arguments to this function.
    // For now, assuming app.js will re-attach them or use event delegation.
     document.querySelectorAll('.edit-booking-btn').forEach(button => {
        button.addEventListener('click', (event) => renderFunctions.handleEditBookingClick(event, appState, domElements, populateTimeSlotSelectFn, timeSlots));
    });
    document.querySelectorAll('.cancel-booking-btn').forEach(button => {
        button.addEventListener('click', (event) => renderFunctions.handleCancelBookingClick(event, appState, renderFunctions));
    });
}

function displayBookingMessage(bookingMessageDiv, message, type = 'info') {
    if (!bookingMessageDiv) return;
    bookingMessageDiv.textContent = message;
    bookingMessageDiv.className = 'p-3 rounded-md mb-4 text-sm';
    if (type === 'success') {
        bookingMessageDiv.classList.add('bg-green-100', 'text-green-700');
    } else if (type === 'error') {
        bookingMessageDiv.classList.add('bg-red-100', 'text-red-700');
    } else {
        bookingMessageDiv.classList.add('bg-blue-100', 'text-blue-700');
    }
    bookingMessageDiv.classList.remove('hidden');
}

function displayManageBookingMessage(manageBookingMessageDiv, message, type = 'info') {
    if (!manageBookingMessageDiv) return;
    manageBookingMessageDiv.textContent = message;
    manageBookingMessageDiv.className = 'p-3 rounded-md mb-4 text-sm';
     if (type === 'success') {
        manageBookingMessageDiv.classList.add('bg-green-100', 'text-green-700');
    } else if (type === 'error') {
        manageBookingMessageDiv.classList.add('bg-red-100', 'text-red-700');
    } else {
        manageBookingMessageDiv.classList.add('bg-blue-100', 'text-blue-700');
    }
    manageBookingMessageDiv.classList.remove('hidden');
}

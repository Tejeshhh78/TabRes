function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateId(prefix = 'id_') { 
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
        }        // Render manage page when showing manage page
        if (pageId === 'manage' && appState.currentUser) {
            console.log('Rendering manage page...');
            renderManageBookingsPage(appState.currentUser, appState.allBookings, domElements, renderFunctions, populateTimeSlotSelect, timeSlots);
        }
    }
}


// --- UI Element Population Functions ---
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

    // Get selected date and time slot for booking conflict checking
    const selectedDate = appState.mapSelectedDate;
    const selectedTimeSlot = appState.mapSelectedTimeSlot;
    
    console.log("MAP RENDERING DEBUG:");
    console.log("Selected date:", selectedDate);
    console.log("Selected time slot:", selectedTimeSlot);
    console.log("All bookings:", appState.allBookings);

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
            
            // Check if desk is booked for selected date and time slot
            const isBooked = appState.allBookings.some(booking => 
                booking.bookedItemId === desk.id &&
                booking.date === selectedDate &&
                booking.status !== 'cancelled' &&
                (booking.timeSlot === selectedTimeSlot || 
                 booking.timeSlot === "Ganzer Tag" || 
                 selectedTimeSlot === "Ganzer Tag")
            );
            
            console.log(`Desk ${desk.id} (${desk.deskLabel}) in room ${room.name}: isBooked = ${isBooked}`);

            // Set appropriate CSS class based on booking status
            deskDiv.className = isBooked ? 'map-desk booked' : 'map-desk available';
            deskDiv.textContent = desk.deskLabel;
            deskDiv.dataset.deskId = desk.id;

            // Only attach click handler for available desks
            if (!isBooked) {
                deskDiv.addEventListener('click', (event) => {
                    mapDeskClickHandler(event, appState, domElements, deskData);
                });
            } else {
                // Add cursor styling to indicate non-clickable
                deskDiv.style.cursor = 'not-allowed';
            }

            desksGrid.appendChild(deskDiv);
        });

        roomOuterDiv.appendChild(desksGrid);
        domElements.mapContainer.appendChild(roomOuterDiv);
    });
}


function renderManageBookingsPage(currentUser, allBookings, domElements, renderFunctions, populateTimeSlotSelectFn, timeSlots) {
    if (!currentUser || !domElements.userBookingsContainer) return;
    
    // Get all user bookings
    const userBookings = allBookings.filter(b => b.userId === currentUser.id)
                                   .sort((a, b) => new Date(a.date) - new Date(b.date) || a.bookedItemName.localeCompare(b.bookedItemName));
    
    // Clear messages
    if(domElements.manageBookingMessageDiv) {
        domElements.manageBookingMessageDiv.classList.add('hidden');
        domElements.manageBookingMessageDiv.textContent = '';
    }

    // Update booking counts
    const activeBookings = userBookings.filter(b => b.status !== 'cancelled');
    const cancelledBookings = userBookings.filter(b => b.status === 'cancelled');
    
    const totalCountEl = document.getElementById('totalBookingsCount');
    const activeCountEl = document.getElementById('activeBookingsCount');
    const cancelledCountEl = document.getElementById('cancelledBookingsCount');
    
    if (totalCountEl) totalCountEl.textContent = `Gesamt: ${userBookings.length}`;
    if (activeCountEl) activeCountEl.textContent = `Aktiv: ${activeBookings.length}`;
    if (cancelledCountEl) cancelledCountEl.textContent = `Storniert: ${cancelledBookings.length}`;

    // Handle filter
    const filterSelect = document.getElementById('bookingStatusFilter');
    const noBookingsMessage = document.getElementById('noBookingsMessage');
    let filteredBookings = userBookings;
    
    if (filterSelect) {
        const filterValue = filterSelect.value;
        const today = getTodayDateString();
        
        switch(filterValue) {
            case 'active':
                filteredBookings = userBookings.filter(b => b.status !== 'cancelled');
                break;
            case 'cancelled':
                filteredBookings = userBookings.filter(b => b.status === 'cancelled');
                break;
            case 'upcoming':
                filteredBookings = userBookings.filter(b => b.status !== 'cancelled' && b.date >= today);
                break;
            case 'past':
                filteredBookings = userBookings.filter(b => b.date < today);
                break;
            default:
                filteredBookings = userBookings;
        }
    }

    // Clear container
    domElements.userBookingsContainer.innerHTML = '';
    
    if (filteredBookings.length === 0) {
        if (noBookingsMessage) {
            noBookingsMessage.classList.remove('hidden');
            // Update message based on filter
            const messageTitle = noBookingsMessage.querySelector('h3');
            const messageText = noBookingsMessage.querySelector('p');
            if (filterSelect && filterSelect.value !== 'all') {
                if (messageTitle) messageTitle.textContent = 'Keine Buchungen in dieser Kategorie';                if (messageText) messageText.textContent = 'Versuchen Sie einen anderen Filter oder buchen Sie über die Karte.';
            } else {
                if (messageTitle) messageTitle.textContent = 'Keine Buchungen gefunden';
                if (messageText) messageText.textContent = 'Sie haben noch keine Buchungen oder alle wurden storniert. Buchen Sie über die Karte!';
            }
        }
        return;
    } else {
        if (noBookingsMessage) noBookingsMessage.classList.add('hidden');
    }

    // Add bulk actions header if there are active bookings
    const activeBulkBookings = filteredBookings.filter(b => b.status !== 'cancelled');
    if (activeBulkBookings.length > 1) {
        const bulkActionsDiv = document.createElement('div');
        bulkActionsDiv.className = 'bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4 flex justify-between items-center';
        bulkActionsDiv.innerHTML = `
            <div class="flex items-center space-x-4">
                <label class="flex items-center">
                    <input type="checkbox" id="selectAllBookings" class="mr-2">
                    <span class="text-sm font-medium text-slate-700">Alle auswählen</span>
                </label>
                <span id="selectedCount" class="text-sm text-slate-600">0 ausgewählt</span>
            </div>
            <button id="bulkDeleteBtn" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <i class="fas fa-trash-alt mr-1"></i>Ausgewählte löschen
            </button>
        `;
        domElements.userBookingsContainer.appendChild(bulkActionsDiv);
    }

    // Render bookings
    filteredBookings.forEach(booking => {
        const card = document.createElement('div');
        const today = getTodayDateString();
        const isUpcoming = booking.date >= today && booking.status !== 'cancelled';
        const isPast = booking.date < today;
        
        card.className = `bg-white p-4 rounded-lg shadow-md border-l-4 ${
            booking.status === 'cancelled' ? 'border-red-400 opacity-60' : 
            isUpcoming ? 'border-green-400' : 
            isPast ? 'border-slate-400' : 'border-blue-400'
        }`;
        
        let statusBadge = '';
        if (booking.status === 'cancelled') {
            statusBadge = '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><i class="fas fa-times-circle mr-1"></i>Storniert</span>';
        } else if (isUpcoming) {
            statusBadge = '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><i class="fas fa-check-circle mr-1"></i>Kommend</span>';
        } else if (isPast) {
            statusBadge = '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800"><i class="fas fa-clock mr-1"></i>Vergangen</span>';
        }

        const canEdit = booking.status !== 'cancelled' && booking.date >= today;
        const canCancel = booking.status !== 'cancelled';
        
        card.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                <div class="flex-1">
                    ${activeBulkBookings.length > 1 && booking.status !== 'cancelled' ? `
                        <div class="flex items-start space-x-3">
                            <input type="checkbox" class="booking-checkbox mt-1" data-booking-id="${booking.id}">
                            <div class="flex-1">
                    ` : '<div>'}
                        <div class="flex items-center space-x-2 mb-2">
                            <h4 class="text-lg font-semibold text-slate-800">${booking.bookedItemName}</h4>
                            ${statusBadge}
                        </div>
                        <div class="space-y-1 text-sm text-slate-600">
                            <p><i class="fas fa-calendar-alt mr-2 text-slate-400"></i>${formatDate(booking.date)}</p>
                            <p><i class="fas fa-clock mr-2 text-slate-400"></i>${booking.timeSlot}</p>
                            <p><i class="fas fa-plus-circle mr-2 text-slate-400"></i>Erstellt: ${formatDateTime(booking.createdAt)}</p>
                            ${booking.updatedAt ? `<p><i class="fas fa-edit mr-2 text-slate-400"></i>Geändert: ${formatDateTime(booking.updatedAt)}</p>` : ''}
                        </div>
                    ${activeBulkBookings.length > 1 && booking.status !== 'cancelled' ? '</div></div>' : '</div>'}
                </div>
                
                ${(canEdit || canCancel) ? `
                <div class="flex space-x-2 flex-shrink-0">
                    ${canEdit ? `
                        <button data-booking-id="${booking.id}" class="edit-booking-btn bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center transition-colors" title="Bearbeiten">
                            <i class="fas fa-edit mr-1"></i>Bearbeiten
                        </button>
                    ` : ''}
                    ${canCancel ? `
                        <button data-booking-id="${booking.id}" data-booking-name="${booking.bookedItemName}" data-booking-date="${booking.date}" class="cancel-booking-btn bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center transition-colors" title="Stornieren">
                            <i class="fas fa-trash-alt mr-1"></i>Stornieren
                        </button>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `;
        domElements.userBookingsContainer.appendChild(card);
    });

    // Set up filter event listener
    if (filterSelect) {
        const newFilterSelect = document.getElementById('bookingStatusFilter');
        if (newFilterSelect) {
            newFilterSelect.removeEventListener('change', handleFilterChange);
            newFilterSelect.addEventListener('change', handleFilterChange);
        }
    }    function handleFilterChange() {
        renderManageBookingsPage(currentUser, allBookings, domElements, renderFunctions, populateTimeSlotSelectFn, timeSlots);
    }    // Set up bulk actions
    setupBulkActions(domElements, renderFunctions, currentUser, allBookings, populateTimeSlotSelectFn, timeSlots);// Event listeners for edit/cancel buttons
    document.querySelectorAll('.edit-booking-btn').forEach(button => {
        button.addEventListener('click', (event) => renderFunctions.handleEditBookingClick(event, { currentUser, allBookings }, domElements, populateTimeSlotSelectFn, timeSlots));
    });    document.querySelectorAll('.cancel-booking-btn').forEach(button => {
        button.addEventListener('click', (event) => renderFunctions.handleCancelBookingClick(event, { currentUser, allBookings }, renderFunctions));
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

// Helper function to format date nicely
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateString === getTodayDateString()) {
        return 'Heute';
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
        return 'Morgen';
    } else {
        return date.toLocaleDateString('de-DE', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

// Helper function to format datetime
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('de-DE', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    }) + ' ' + date.toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Setup bulk actions for manage bookings page
function setupBulkActions(domElements, renderFunctions, currentUser, allBookings, populateTimeSlotSelectFn, timeSlots) {
    const selectAllCheckbox = document.getElementById('selectAllBookings');
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    const selectedCountSpan = document.getElementById('selectedCount');
    
    if (!selectAllCheckbox || !bulkDeleteBtn || !selectedCountSpan) return;

    function updateBulkActions() {
        const checkboxes = document.querySelectorAll('.booking-checkbox');
        const checkedBoxes = document.querySelectorAll('.booking-checkbox:checked');
        
        selectedCountSpan.textContent = `${checkedBoxes.length} ausgewählt`;
        bulkDeleteBtn.disabled = checkedBoxes.length === 0;
        
        selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length;
        selectAllCheckbox.checked = checkboxes.length > 0 && checkedBoxes.length === checkboxes.length;
    }

    // Select/deselect all
    selectAllCheckbox.addEventListener('change', () => {
        const checkboxes = document.querySelectorAll('.booking-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateBulkActions();
    });

    // Individual checkbox changes
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('booking-checkbox')) {
            updateBulkActions();
        }
    });

    // Bulk delete button
    bulkDeleteBtn.addEventListener('click', () => {
        const checkedBoxes = document.querySelectorAll('.booking-checkbox:checked');
        const selectedIds = Array.from(checkedBoxes).map(cb => cb.dataset.bookingId);
        
        const bulkDeleteModal = document.getElementById('bulkDeleteModal');
        const bulkDeleteCount = document.getElementById('bulkDeleteCount');
        const confirmBulkDelete = document.getElementById('confirmBulkDelete');
        const cancelBulkDelete = document.getElementById('cancelBulkDelete');
        
        if (bulkDeleteModal && bulkDeleteCount && confirmBulkDelete && cancelBulkDelete) {
            bulkDeleteCount.textContent = selectedIds.length;
            bulkDeleteModal.classList.remove('hidden');
            
            const handleConfirm = () => {
                // Update booking statuses to cancelled
                selectedIds.forEach(bookingId => {
                    const bookingIndex = allBookings.findIndex(b => b.id === bookingId);
                    if (bookingIndex > -1) {
                        allBookings[bookingIndex].status = 'cancelled';
                        allBookings[bookingIndex].updatedAt = new Date().toISOString();
                    }
                });
                
                bulkDeleteModal.classList.add('hidden');
                
                // Show success message
                if (domElements.manageBookingMessageDiv) {
                    domElements.manageBookingMessageDiv.textContent = `${selectedIds.length} Buchung(en) erfolgreich storniert!`;
                    domElements.manageBookingMessageDiv.className = 'p-4 rounded-lg mb-4 bg-green-100 text-green-700';
                    domElements.manageBookingMessageDiv.classList.remove('hidden');
                    setTimeout(() => domElements.manageBookingMessageDiv.classList.add('hidden'), 5000);
                }
                  // Re-render the page
                renderManageBookingsPage(currentUser, allBookings, domElements, renderFunctions, populateTimeSlotSelectFn, timeSlots);
                
                // Update dashboard
                renderDashboard(currentUser, allBookings, domElements, getTodayDateString);
                
                // Clean up event listeners
                confirmBulkDelete.removeEventListener('click', handleConfirm);
                cancelBulkDelete.removeEventListener('click', handleCancel);
            };
            
            const handleCancel = () => {
                bulkDeleteModal.classList.add('hidden');
                confirmBulkDelete.removeEventListener('click', handleConfirm);
                cancelBulkDelete.removeEventListener('click', handleCancel);
            };
            
            confirmBulkDelete.addEventListener('click', handleConfirm);
            cancelBulkDelete.addEventListener('click', handleCancel);
        }
    });

    // Initial update
    updateBulkActions();
}

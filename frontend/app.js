// Global function for handling desk clicks on map
function handleMapDeskClick(event, appState, domElements, deskData) {
    const deskId = event.currentTarget.dataset.deskId;
    if (!deskId) return;

    const modal = document.getElementById('bookingModal');
    const tableSelect = document.getElementById('modalTableSelect');
    const dateInput = document.getElementById('modalBookingDate');
    const timeSlotRadios = document.getElementById('modalTimeSlotRadios');

    if (!modal || !tableSelect || !dateInput || !timeSlotRadios) {
        console.error('Required modal elements not found');
        return;
    }

    // Populate desk select with clicked desk selected
    tableSelect.innerHTML = '';
    appState.bookableItems.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.name;
        if (item.id === deskId) opt.selected = true;
        tableSelect.appendChild(opt);
    });

    // Set date
    dateInput.value = appState.mapSelectedDate || getTodayDateString();

    // Populate time slots
    timeSlotRadios.innerHTML = '';
    timeSlots.forEach(slot => {
        const id = `modalTimeSlot_${slot.replace(/\s+/g, '_')}`;
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'modalBookingTimeSlot';
        radio.value = slot;
        radio.id = id;
        radio.className = 'mr-2';
        if (slot === appState.mapSelectedTimeSlot) radio.checked = true;

        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = slot;
        label.className = 'mr-4 cursor-pointer';

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center mb-2';
        wrapper.appendChild(radio);
        wrapper.appendChild(label);
        timeSlotRadios.appendChild(wrapper);
    });

    modal.classList.remove('hidden');
}

// Utility functions
function generateId(prefix = 'id_') {
    return prefix + Math.random().toString(36).substr(2, 9);
}

function displayBookingMessage(messageDiv, message, type = 'info') {
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = `p-4 rounded-lg mb-4 ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

function displayManageBookingMessage(messageDiv, message, type = 'info') {
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = `p-4 rounded-lg mb-4 ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

// Utility functions
function generateId(prefix = 'id_') {
    return prefix + Math.random().toString(36).substr(2, 9);
}

function displayBookingMessage(messageDiv, message, type = 'info') {
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = `p-4 rounded-lg mb-4 ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

function displayManageBookingMessage(messageDiv, message, type = 'info') {
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = `p-4 rounded-lg mb-4 ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

// Function to show simple booking notification
function showBookingNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('bookingNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'bookingNotification';
        notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium hidden';
        document.body.appendChild(notification);
    }
    
    // Set notification content and style
    notification.textContent = message;
    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    
    // Show notification
    notification.classList.remove('hidden');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("APP.JS: DOM fully loaded. Initializing TableRes App main script...");

    // --- Check if config.js and ui.js objects/functions are available ---
    if (typeof mockUsers === 'undefined' || typeof initialDeskData === 'undefined' || typeof roomLayoutData === 'undefined' || typeof timeSlots === 'undefined') {
        console.error("APP.JS: config.js might not have loaded correctly or is missing data.");
        alert("Fehler: Konfigurationsdaten konnten nicht geladen werden. Die Anwendung kann nicht starten.");
        return;
    }
    if (typeof getTodayDateString !== 'function' || typeof showPage !== 'function' || typeof renderDetailedMap !== 'function') {
        console.error("APP.JS: ui.js might not have loaded correctly or key functions are missing.");
        alert("Fehler: UI-Funktionen konnten nicht geladen werden. Die Anwendung kann nicht starten.");
        return;
    }
    console.log("APP.JS: config.js and ui.js dependencies seem to be available.");    // --- Application State ---
    const appState = {
        currentUser: null,        allBookings: [
            // Sample bookings for testing - remove in production
            {
                id: 'booking_sample1',
                userId: 'user1',
                bookedItemId: 'desk1',
                bookedItemName: 's2_1og_r5 - Tisch A',
                date: getTodayDateString(),
                timeSlot: 'Vormittag',
                status: 'booked',
                createdAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
            },
            {
                id: 'booking_sample2',
                userId: 'user1',
                bookedItemId: 'desk2',
                bookedItemName: 's2_1og_r5 - Tisch B',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                timeSlot: 'Nachmittag',
                status: 'booked',
                createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
            },
            {
                id: 'booking_sample3',
                userId: 'user1',
                bookedItemId: 'desk3',
                bookedItemName: 's2_1og_r6 - Tisch A',
                date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
                timeSlot: 'Ganzer Tag',
                status: 'cancelled',
                createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                updatedAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
            },
            // Add another test booking for today to see red desks
            {
                id: 'booking_sample4',
                userId: 'user2',
                bookedItemId: 'desk4',
                bookedItemName: 's2_1og_r5 - Tisch D',
                date: getTodayDateString(),
                timeSlot: 'Ganzer Tag',
                status: 'booked',
                createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
            }
        ],
        bookableItems: initialDeskData.map(desk => ({ id: desk.id, name: `${desk.roomId} - ${desk.deskLabel}` })),
        mapSelectedDate: getTodayDateString(),
        mapSelectedTimeSlot: timeSlots[0],
    };
    console.log("APP.JS: Initial appState created:", appState);

    // --- DOM Elements ---
    const domElements = {
        loginView: document.getElementById('loginView'),
        appView: document.getElementById('appView'),
        loginForm: document.getElementById('loginForm'),
        loginEmailInput: document.getElementById('email'),
        loginPasswordInput: document.getElementById('password'),
        loginErrorDiv: document.getElementById('loginError'),
        loginButton: document.getElementById('loginButton'),
        currentUserDisplay: document.getElementById('currentUserDisplay'),
        currentUserDisplayMobile: document.getElementById('currentUserDisplayMobile'),
        logoutButton: document.getElementById('logoutButton'),
        navButtons: document.querySelectorAll('.nav-button'),        pages: {
            dashboard: document.getElementById('dashboardPage'),
            map: document.getElementById('mapPage'),
            manage: document.getElementById('managePage'),
        },
        welcomeMessage: document.getElementById('welcomeMessage'),
        todayDateDisplay: document.getElementById('todayDateDisplay'),
        todaysBookingsList: document.getElementById('todaysBookingsList'),
        userInfoEmail: document.getElementById('userInfoEmail'),
        userInfoId: document.getElementById('userInfoId'),
        mapContainer: document.getElementById('mapContainer'),
        mapDateSelect: document.getElementById('mapDateSelect'),
        mapTimeSlotSelect: document.getElementById('mapTimeSlotSelect'),
        userBookingsContainer: document.getElementById('userBookingsContainer'),
        manageBookingMessageDiv: document.getElementById('manageBookingMessage'),
        editBookingModal: document.getElementById('editBookingModal'),
        editBookingForm: document.getElementById('editBookingForm'),
        editBookingIdInput: document.getElementById('editBookingId'),
        editBookingTableNameSpan: document.getElementById('editBookingTableName'),
        editBookingDateInput: document.getElementById('editBookingDate'),
        editBookingTimeSlotSelect: document.getElementById('editBookingTimeSlot'),
        cancelEditBookingButton: document.getElementById('cancelEditBooking'),
        generalModal: document.getElementById('generalModal'),
        generalModalContent: document.getElementById('generalModalContent'),
        generalModalCloseButton: document.getElementById('generalModalCloseButton'),        generalModalIcon: document.getElementById('generalModalIcon'),
        generalModalMessage: document.getElementById('generalModalMessage'),
        currentYearEl: document.getElementById('currentYear'),
        footerUserId: document.getElementById('footerUserId'),
        // New elements for enhanced manage page
        bookingStatusFilter: document.getElementById('bookingStatusFilter'),
        noBookingsMessage: document.getElementById('noBookingsMessage'),
        bulkDeleteModal: document.getElementById('bulkDeleteModal'),
        bulkDeleteCount: document.getElementById('bulkDeleteCount'),
        confirmBulkDelete: document.getElementById('confirmBulkDelete'),
        cancelBulkDelete: document.getElementById('cancelBulkDelete')
    };
    console.log("APP.JS: DOM elements collected.");

    // Helper function for handling edit booking
    function handleEditBookingClick(event, currentAppState, currentDomElements, populateTimeSlotSelectFnFromUI, timeSlotsDataFromConfig) {
        const bookingId = event.currentTarget.dataset.bookingId;
        const bookingToEdit = currentAppState.allBookings.find(b => b.id === bookingId);
        if (!bookingToEdit) return;
        if(currentDomElements.editBookingIdInput) currentDomElements.editBookingIdInput.value = bookingToEdit.id;
        if(currentDomElements.editBookingTableNameSpan) currentDomElements.editBookingTableNameSpan.textContent = bookingToEdit.bookedItemName;
        if(currentDomElements.editBookingDateInput) {
            currentDomElements.editBookingDateInput.value = bookingToEdit.date;
            currentDomElements.editBookingDateInput.min = getTodayDateString();
        }
        if(currentDomElements.editBookingTimeSlotSelect) populateTimeSlotSelectFnFromUI(currentDomElements.editBookingTimeSlotSelect, timeSlotsDataFromConfig, bookingToEdit.timeSlot);
        if(currentDomElements.editBookingModal) currentDomElements.editBookingModal.classList.remove('hidden');    }    
    // Helper function for handling cancel booking
    function handleCancelBookingClick(event, currentAppState, renderFunctions) {
        console.log('handleCancelBookingClick called', { event, currentAppState, renderFunctions });
        const bookingId = event.currentTarget.dataset.bookingId;
        const bookingName = event.currentTarget.dataset.bookingName;
        const bookingDate = event.currentTarget.dataset.bookingDate;
        console.log('Booking data:', { bookingId, bookingName, bookingDate });
        
        if (confirm(`Möchten Sie die Buchung für ${bookingName} am ${bookingDate} wirklich stornieren?`)) {
            const bookingIndex = currentAppState.allBookings.findIndex(b => b.id === bookingId);
            if (bookingIndex > -1) {
                currentAppState.allBookings[bookingIndex].status = 'cancelled';
                currentAppState.allBookings[bookingIndex].updatedAt = new Date().toISOString();
                
                // Show success message
                if (domElements.manageBookingMessageDiv) {
                    displayManageBookingMessage(domElements.manageBookingMessageDiv, 'Buchung erfolgreich storniert!', 'success');
                }
                  // Re-render the manage bookings page
                renderManageBookingsPage(currentAppState.currentUser, currentAppState.allBookings, domElements, renderFunctions, populateTimeSlotSelect, timeSlots);
                // Update dashboard with new booking info
                renderDashboard(currentAppState.currentUser, currentAppState.allBookings, domElements, getTodayDateString);
                // Update the map view 
                renderDetailedMap(currentAppState, domElements, roomLayoutData, initialDeskData, handleMapDeskClick);
            } else {
                if (domElements.manageBookingMessageDiv) {
                    displayManageBookingMessage(domElements.manageBookingMessageDiv, 'Fehler: Buchung nicht gefunden.', 'error');
                }
            }
        }
    }

    // Group render functions (from ui.js) and handlers (from app.js)
    const renderFunctions = {
        renderDashboard, 
        renderMapPage,        renderDetailedMap, 
        renderManageBookingsPage, 
        handleEditBookingClick,   
        handleCancelBookingClick, 
        handleMapDeskClick // <-- this now refers to the global function
    };
    
    if(domElements.currentYearEl) domElements.currentYearEl.textContent = new Date().getFullYear();
    if(domElements.generalModalCloseButton) {
        domElements.generalModalCloseButton.addEventListener('click', () => {
            if(domElements.generalModal) domElements.generalModal.classList.add('hidden');
        });
    }

    // --- Event Handlers ---
    // Restore login from localStorage if present
    const savedUser = localStorage.getItem('tabresUser');
    if (savedUser) {
        appState.currentUser = JSON.parse(savedUser);
        domElements.loginView.classList.add('hidden');
        domElements.appView.classList.remove('hidden');
        // Update user display elements
        domElements.currentUserDisplay.textContent = `${appState.currentUser.name} (${appState.currentUser.email.split('@')[0]})`;
        domElements.currentUserDisplayMobile.textContent = `User: ${appState.currentUser.name}`;
        domElements.footerUserId.textContent = `Ihre User ID (Lokal): ${appState.currentUser.id}`;
        domElements.footerUserId.classList.remove('hidden');
        showPage('dashboard', domElements, appState, renderFunctions);
        renderDashboard(appState.currentUser, appState.allBookings, domElements, getTodayDateString);
    }    // Login form handler
    if (domElements.loginForm) {
        domElements.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("APP.JS: Login form submitted.");
            if (domElements.loginButton) domElements.loginButton.disabled = true;
            if (domElements.loginErrorDiv) domElements.loginErrorDiv.classList.add('hidden');

            const email = domElements.loginEmailInput.value;
            const password = domElements.loginPasswordInput.value;
            const user = mockUsers.find(u => u.email === email && u.password === password);

            setTimeout(() => {
                try {
                    if (user) {
                        console.log("APP.JS: User found:", user.name);
                        appState.currentUser = { ...user };
                        localStorage.setItem('tabresUser', JSON.stringify(appState.currentUser));
                        domElements.loginView.classList.add('hidden');
                        domElements.appView.style.display = 'flex';
                        domElements.currentUserDisplay.textContent = `${appState.currentUser.name} (${appState.currentUser.email.split('@')[0]})`;
                        domElements.currentUserDisplayMobile.textContent = `User: ${appState.currentUser.name}`;
                        domElements.footerUserId.textContent = `Ihre User ID (Lokal): ${appState.currentUser.id}`;
                        domElements.footerUserId.classList.remove('hidden');
                        appState.mapSelectedDate = getTodayDateString();
                        appState.mapSelectedTimeSlot = timeSlots[0];
                        showPage('dashboard', domElements, appState, renderFunctions);
                        renderDashboard(appState.currentUser, appState.allBookings, domElements, getTodayDateString);
                        domElements.loginForm.reset();
                    } else {
                        console.warn("APP.JS: User not found or password incorrect.");
                        domElements.loginErrorDiv.textContent = 'Ungültige E-Mail oder Passwort.';
                        domElements.loginErrorDiv.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error("APP.JS: Error during login UI update:", error);
                    showGeneralModal("Ein Fehler ist beim Login aufgetreten: " + error.message, 'error', domElements);
                    domElements.loginErrorDiv.textContent = 'Ein interner Fehler ist aufgetreten.';
                    domElements.loginErrorDiv.classList.remove('hidden');
                } finally {
                    domElements.loginButton.disabled = false;
                }
            }, 250);
        });
    } else {
        console.error("APP.JS: Login form not found!");
    }

    if (domElements.logoutButton) {
        domElements.logoutButton.addEventListener('click', () => {
            localStorage.removeItem('tabresUser');
            appState.currentUser = null;
            domElements.appView.classList.add('hidden');
            domElements.loginView.classList.remove('hidden');
        });
    }

    domElements.navButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.page, domElements, appState, renderFunctions); 
        });
    });

    if (domElements.mapDateSelect) {
        domElements.mapDateSelect.addEventListener('change', (e) => {
            appState.mapSelectedDate = e.target.value;
            console.log("APP.JS: Map date changed to:", appState.mapSelectedDate);
            renderDetailedMap(appState, domElements, roomLayoutData, initialDeskData, handleMapDeskClick); 
        });
    }
    if (domElements.mapTimeSlotSelect) {
        domElements.mapTimeSlotSelect.addEventListener('change', (e) => {
            appState.mapSelectedTimeSlot = e.target.value;
            console.log("APP.JS: Map time slot changed to:", appState.mapSelectedTimeSlot);            renderDetailedMap(appState, domElements, roomLayoutData, initialDeskData, handleMapDeskClick);
        });
    }

    // Modal booking form handler
    const modalBookingForm = document.getElementById('modalBookingForm');
    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();            if (!appState.currentUser) {
                alert('Bitte zuerst einloggen.');
                return;
            }
            
            const deskId = document.getElementById('modalTableSelect').value;
            const date = document.getElementById('modalBookingDate').value;
            const timeSlotRadio = document.querySelector('input[name="modalBookingTimeSlot"]:checked');
            
            if (!deskId || !date || !timeSlotRadio) {
                alert('Bitte alle Felder ausfüllen.');
                return;
            }
            
            const timeSlot = timeSlotRadio.value;
            const deskDetails = initialDeskData.find(d => d.id === deskId);
            if (!deskDetails) {
                alert('Fehler: Schreibtischdetails nicht gefunden.');
                return;
            }
            
            const conflict = appState.allBookings.find(b =>
                b.bookedItemId === deskId &&
                b.date === date &&
                b.status !== 'cancelled' &&
                (b.timeSlot === timeSlot || b.timeSlot === "Ganzer Tag" || timeSlot === "Ganzer Tag")
            );
            if (conflict) {
                alert(`Der Schreibtisch "${deskDetails.deskLabel}" ist am ${date} für "${timeSlot}" bereits belegt.`);
                return;
            }
            
            const newBooking = {
                id: generateId('booking_'),
                userId: appState.currentUser.id,
                bookedItemId: deskId,
                bookedItemName: `${deskDetails.roomId} - ${deskDetails.deskLabel}`,
                date: date,
                timeSlot: timeSlot,
                status: 'booked',
                createdAt: new Date().toISOString()
            };
            appState.allBookings.push(newBooking);
            console.log("APP.JS: New booking added via modal:", newBooking);
            
            // Update dashboard after booking
            renderDashboard(appState.currentUser, appState.allBookings, domElements, getTodayDateString);            // Hide modal and update map
            document.getElementById('bookingModal').classList.add('hidden');
            renderDetailedMap(appState, domElements, roomLayoutData, initialDeskData, handleMapDeskClick);
            
            // Show simple green notification
            showBookingNotification(`Schreibtisch "${deskDetails.deskLabel}" erfolgreich für ${date} (${timeSlot}) gebucht!`);
        });
    }

    // Cancel modal booking
    const cancelBookingModal = document.getElementById('cancelBookingModal');
    if (cancelBookingModal) {
        cancelBookingModal.addEventListener('click', () => {
            document.getElementById('bookingModal').classList.add('hidden');
        });
    }

    // Edit booking form handler
    if (domElements.editBookingForm) {
        domElements.editBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const bookingId = domElements.editBookingIdInput.value;
            const newDate = domElements.editBookingDateInput.value;
            const newTimeSlot = domElements.editBookingTimeSlotSelect.value;
            const bookingIndex = appState.allBookings.findIndex(b => b.id === bookingId);
            if (bookingIndex > -1) {
                appState.allBookings[bookingIndex].date = newDate;
                appState.allBookings[bookingIndex].timeSlot = newTimeSlot;
                appState.allBookings[bookingIndex].updatedAt = new Date().toISOString();
                displayManageBookingMessage(domElements.manageBookingMessageDiv, 'Buchung erfolgreich aktualisiert!', 'success');
            } else {
                displayManageBookingMessage(domElements.manageBookingMessageDiv, 'Fehler: Buchung nicht gefunden.', 'error');
            }            if(domElements.editBookingModal) domElements.editBookingModal.classList.add('hidden');
            renderManageBookingsPage(appState.currentUser, appState.allBookings, domElements, renderFunctions, populateTimeSlotSelect, timeSlots);
            renderDetailedMap(appState, domElements, roomLayoutData, initialDeskData, handleMapDeskClick);
            // Update dashboard after editing booking
            renderDashboard(appState.currentUser, appState.allBookings, domElements, getTodayDateString);
        });
    }

    if(domElements.cancelEditBookingButton) {
         domElements.cancelEditBookingButton.addEventListener('click', () => {
            if(domElements.editBookingModal) domElements.editBookingModal.classList.add('hidden');
            if(domElements.editBookingForm) domElements.editBookingForm.reset();
        });
    }

    console.log("APP.JS: App script initialization complete. Event listeners attached.");
});

// script.js for TabRes App (Plain HTML/CSS/JS)

document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const mockUsers = [
        { id: 'user1', email: 'tejesh@test.com', password: 'admin', name: 'Tejesh' },
        { id: 'user2', email: 'maxim@test.com', password: 'admin', name: 'Maxim' },
        { id: 'user3', email: 'lukas@test.com', password: 'admin', name: 'Lukas' },
    ];

    const initialTablesData = [
        { id: 'table_1', name: "Tisch 1", capacity: 2, type: "table" },
        { id: 'table_2', name: "Tisch 2", capacity: 4, type: "table" },
        { id: 'table_3', name: "Tisch 3", capacity: 4, type: "table" },
        { id: 'room_alpha', name: "Raum Alpha", capacity: 8, type: "room" },
        { id: 'room_beta', name: "Raum Beta", capacity: 12, type: "room" },
    ];

    const timeSlots = ["Vormittag", "Nachmittag", "Ganzer Tag"];

    // --- Application State ---
    let currentUser = null;
    let allBookings = []; // Stores all booking objects {id, userId, tableId, tableName, date, timeSlot, status, createdAt}
    let tables = [...initialTablesData]; // In a real app, this might be fetched

    // --- DOM Elements ---
    const loginView = document.getElementById('loginView');
    const appView = document.getElementById('appView');
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('email');
    const loginPasswordInput = document.getElementById('password');
    const loginErrorDiv = document.getElementById('loginError');
    const loginButton = document.getElementById('loginButton');

    const currentUserDisplay = document.getElementById('currentUserDisplay');
    const currentUserDisplayMobile = document.getElementById('currentUserDisplayMobile');
    const logoutButton = document.getElementById('logoutButton');
    const navButtons = document.querySelectorAll('.nav-button');

    const pages = {
        dashboard: document.getElementById('dashboardPage'),
        book: document.getElementById('bookPage'),
        manage: document.getElementById('managePage'),
    };
    const welcomeMessage = document.getElementById('welcomeMessage');
    const todayDateDisplay = document.getElementById('todayDateDisplay');
    const todaysBookingsList = document.getElementById('todaysBookingsList');
    const userInfoEmail = document.getElementById('userInfoEmail');
    const userInfoId = document.getElementById('userInfoId');

    const bookingForm = document.getElementById('bookingForm');
    const tableSelect = document.getElementById('tableSelect');
    const bookingDateInput = document.getElementById('bookingDate');
    const timeSlotRadiosContainer = document.getElementById('timeSlotRadios');
    const bookingMessageDiv = document.getElementById('bookingMessage');

    const userBookingsContainer = document.getElementById('userBookingsContainer');
    const manageBookingMessageDiv = document.getElementById('manageBookingMessage');

    const editBookingModal = document.getElementById('editBookingModal');
    const editBookingForm = document.getElementById('editBookingForm');
    const editBookingIdInput = document.getElementById('editBookingId');
    const editBookingTableNameSpan = document.getElementById('editBookingTableName');
    const editBookingDateInput = document.getElementById('editBookingDate');
    const editBookingTimeSlotSelect = document.getElementById('editBookingTimeSlot');
    const cancelEditBookingButton = document.getElementById('cancelEditBooking');

    const generalModal = document.getElementById('generalModal');
    const generalModalContent = document.getElementById('generalModalContent');
    const generalModalCloseButton = document.getElementById('generalModalCloseButton');
    const generalModalIcon = document.getElementById('generalModalIcon');
    const generalModalMessage = document.getElementById('generalModalMessage');
    
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    const footerUserId = document.getElementById('footerUserId');


    // --- Helper Functions ---
    const getTodayDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 5)}`;

    function showGeneralModal(message, type = 'info') {
        generalModalMessage.textContent = message;
        generalModalIcon.className = 'fas fa-2x mr-3'; // Reset icon classes
        generalModalContent.className = 'relative p-6 rounded-lg shadow-xl w-full max-w-md'; // Reset content classes

        switch (type) {
            case 'success':
                generalModalIcon.classList.add('fa-check-circle', 'text-green-700');
                generalModalContent.classList.add('bg-green-100', 'border-l-4', 'border-green-400', 'text-green-700');
                break;
            case 'error':
                generalModalIcon.classList.add('fa-times-circle', 'text-red-700');
                generalModalContent.classList.add('bg-red-100', 'border-l-4', 'border-red-400', 'text-red-700');
                break;
            case 'info':
            default:
                generalModalIcon.classList.add('fa-info-circle', 'text-blue-700');
                generalModalContent.classList.add('bg-blue-100', 'border-l-4', 'border-blue-400', 'text-blue-700');
                break;
        }
        generalModal.classList.remove('hidden');
    }

    generalModalCloseButton.addEventListener('click', () => {
        generalModal.classList.add('hidden');
    });


    // --- Page Navigation ---
    function showPage(pageId) {
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        if (pages[pageId]) {
            pages[pageId].classList.remove('hidden');
        }
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.page === pageId);
        });
        // Refresh content for the shown page
        if (pageId === 'dashboard') renderDashboard();
        if (pageId === 'book') renderBookingForm();
        if (pageId === 'manage') renderManageBookingsPage();
    }

    // --- Rendering Functions ---
    function populateTableSelect() {
        tableSelect.innerHTML = '<option value="">-- Bitte wählen --</option>';
        tables.forEach(table => {
            const option = document.createElement('option');
            option.value = table.id;
            option.textContent = `${table.name} (Kapazität: ${table.capacity})`;
            tableSelect.appendChild(option);
        });
    }

    function populateTimeSlotRadios(containerElementId, inputName) {
        const container = document.getElementById(containerElementId);
        container.innerHTML = '';
        timeSlots.forEach(slot => {
            const label = document.createElement('label');
            label.className = "flex items-center p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer";
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = inputName;
            radio.value = slot;
            radio.className = "h-4 w-4 text-sky-600 border-slate-300 focus:ring-sky-500 mr-3";
            radio.required = true;

            const span = document.createElement('span');
            span.className = "text-slate-700";
            span.textContent = slot;

            label.appendChild(radio);
            label.appendChild(span);
            container.appendChild(label);
        });
    }
    
    function populateTimeSlotSelect(selectElementId) {
        const select = document.getElementById(selectElementId);
        select.innerHTML = '';
        timeSlots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            select.appendChild(option);
        });
    }


    function renderDashboard() {
        if (!currentUser) return;
        welcomeMessage.textContent = `Willkommen, ${currentUser.name}!`;
        todayDateDisplay.textContent = getTodayDateString();
        userInfoEmail.textContent = currentUser.email;
        userInfoId.textContent = currentUser.id;

        const today = getTodayDateString();
        const todaysUserBookings = allBookings.filter(b => 
            b.userId === currentUser.id && b.date === today && b.status !== 'cancelled'
        );

        if (todaysUserBookings.length > 0) {
            todaysBookingsList.innerHTML = '<p class="text-green-600 font-semibold mb-2">Sie haben heute folgende Buchung(en):</p><ul class="list-disc list-inside space-y-1"></ul>';
            const ul = todaysBookingsList.querySelector('ul');
            todaysUserBookings.forEach(booking => {
                const li = document.createElement('li');
                li.className = "text-slate-600";
                li.textContent = `${booking.tableName} für ${booking.timeSlot}`;
                ul.appendChild(li);
            });
        } else {
            todaysBookingsList.innerHTML = '<p class="text-slate-500">Sie haben heute keine aktiven Buchungen.</p>';
        }
    }

    function renderBookingForm() {
        populateTableSelect();
        bookingDateInput.value = getTodayDateString();
        bookingDateInput.min = getTodayDateString();
        populateTimeSlotRadios('timeSlotRadios', 'bookingTimeSlot');
        bookingMessageDiv.classList.add('hidden');
        bookingMessageDiv.textContent = '';
        bookingForm.reset(); // Reset form fields
         // Re-set date after reset
        bookingDateInput.value = getTodayDateString();
    }

    function renderManageBookingsPage() {
        if (!currentUser) return;
        const userBookings = allBookings.filter(b => b.userId === currentUser.id)
                                       .sort((a, b) => new Date(a.date) - new Date(b.date) || a.tableName.localeCompare(b.tableName));
        
        userBookingsContainer.innerHTML = '';
        manageBookingMessageDiv.classList.add('hidden');
        manageBookingMessageDiv.textContent = '';

        if (userBookings.length === 0) {
            userBookingsContainer.innerHTML = '<p class="text-slate-500 bg-white p-6 rounded-lg shadow">Sie haben keine Buchungen.</p>';
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
                    <p class="text-lg font-semibold text-sky-700">${booking.tableName}</p>
                    <p class="text-slate-600"><i class="fas fa-calendar-alt mr-1"></i> ${booking.date}</p>
                    <p class="text-slate-600"><i class="fas fa-clock mr-1"></i> ${booking.timeSlot}</p>
                    ${statusText}
                </div>
                ${booking.status !== 'cancelled' ? `
                <div class="flex space-x-2">
                    <button data-booking-id="${booking.id}" class="edit-booking-btn bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center transition-colors" title="Bearbeiten">
                        <i class="fas fa-edit mr-1 md:mr-0"></i> <span class="md:hidden">Bearbeiten</span>
                    </button>
                    <button data-booking-id="${booking.id}" data-booking-name="${booking.tableName}" data-booking-date="${booking.date}" class="cancel-booking-btn bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 rounded-md flex items-center transition-colors" title="Stornieren">
                        <i class="fas fa-trash-alt mr-1 md:mr-0"></i> <span class="md:hidden">Stornieren</span>
                    </button>
                </div>` : ''}
            `;
            userBookingsContainer.appendChild(card);
        });

        // Add event listeners for new buttons
        document.querySelectorAll('.edit-booking-btn').forEach(button => {
            button.addEventListener('click', handleEditBookingClick);
        });
        document.querySelectorAll('.cancel-booking-btn').forEach(button => {
            button.addEventListener('click', handleCancelBookingClick);
        });
    }
    
    function displayBookingMessage(message, type = 'info') {
        bookingMessageDiv.textContent = message;
        bookingMessageDiv.className = 'p-3 rounded-md mb-4 text-sm'; // Reset classes
        if (type === 'success') {
            bookingMessageDiv.classList.add('bg-green-100', 'text-green-700');
        } else if (type === 'error') {
            bookingMessageDiv.classList.add('bg-red-100', 'text-red-700');
        } else {
            bookingMessageDiv.classList.add('bg-blue-100', 'text-blue-700');
        }
        bookingMessageDiv.classList.remove('hidden');
    }

    function displayManageBookingMessage(message, type = 'info') {
        manageBookingMessageDiv.textContent = message;
        manageBookingMessageDiv.className = 'p-3 rounded-md mb-4 text-sm'; // Reset classes
         if (type === 'success') {
            manageBookingMessageDiv.classList.add('bg-green-100', 'text-green-700');
        } else if (type === 'error') {
            manageBookingMessageDiv.classList.add('bg-red-100', 'text-red-700');
        } else {
            manageBookingMessageDiv.classList.add('bg-blue-100', 'text-blue-700');
        }
        manageBookingMessageDiv.classList.remove('hidden');
    }


    // --- Authentication ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginButton.disabled = true;
        loginErrorDiv.classList.add('hidden');
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        const user = mockUsers.find(u => u.email === email && u.password === password);

        setTimeout(() => { // Simulate network delay
            if (user) {
                currentUser = { ...user }; // Create a copy
                loginView.classList.add('hidden');
                appView.style.display = 'flex'; // Use style.display to ensure flex layout applies
                currentUserDisplay.textContent = `${currentUser.name} (${currentUser.email.substring(0, currentUser.email.indexOf('@'))})`;
                currentUserDisplayMobile.textContent = `User: ${currentUser.name}`;
                footerUserId.textContent = `Ihre User ID (Lokal): ${currentUser.id}`;
                footerUserId.classList.remove('hidden');
                showPage('dashboard');
            } else {
                loginErrorDiv.textContent = 'Ungültige E-Mail oder Passwort.';
                loginErrorDiv.classList.remove('hidden');
            }
            loginButton.disabled = false;
            loginForm.reset();
        }, 500);
    });

    logoutButton.addEventListener('click', () => {
        currentUser = null;
        appView.style.display = 'none';
        loginView.classList.remove('hidden');
        footerUserId.classList.add('hidden');
    });

    // --- Navigation Event Listeners ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.page);
        });
    });

    // --- Booking Logic ---
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            displayBookingMessage('Bitte zuerst einloggen.', 'error');
            return;
        }

        const tableId = tableSelect.value;
        const date = bookingDateInput.value;
        const timeSlotRadio = document.querySelector('input[name="bookingTimeSlot"]:checked');
        
        if (!tableId || !date || !timeSlotRadio) {
            displayBookingMessage('Bitte alle Felder ausfüllen.', 'error');
            return;
        }
        const timeSlot = timeSlotRadio.value;
        const tableDetails = tables.find(t => t.id === tableId);

        // Check for booking conflicts
        const conflict = allBookings.find(b =>
            b.tableId === tableId &&
            b.date === date &&
            b.status !== 'cancelled' &&
            (b.timeSlot === timeSlot || b.timeSlot === "Ganzer Tag" || timeSlot === "Ganzer Tag")
        );

        if (conflict) {
            displayBookingMessage(`Der Tisch "${tableDetails.name}" ist am ${date} für "${timeSlot}" bereits belegt.`, 'error');
            return;
        }

        const newBooking = {
            id: generateId(),
            userId: currentUser.id,
            tableId: tableId,
            tableName: tableDetails.name,
            date: date,
            timeSlot: timeSlot,
            status: 'booked',
            createdAt: new Date().toISOString()
        };
        allBookings.push(newBooking);
        displayBookingMessage(`Tisch "${tableDetails.name}" erfolgreich für ${date} (${timeSlot}) gebucht!`, 'success');
        bookingForm.reset();
        bookingDateInput.value = getTodayDateString(); // Re-set date after reset
        // Optionally, navigate to manage page or clear form further
        // showPage('manage'); // Example: navigate after booking
    });

    // --- Manage Bookings Logic ---
    function handleEditBookingClick(event) {
        const bookingId = event.currentTarget.dataset.bookingId;
        const bookingToEdit = allBookings.find(b => b.id === bookingId);
        if (!bookingToEdit) return;

        editBookingIdInput.value = bookingToEdit.id;
        editBookingTableNameSpan.textContent = bookingToEdit.tableName;
        editBookingDateInput.value = bookingToEdit.date;
        editBookingDateInput.min = getTodayDateString();
        populateTimeSlotSelect('editBookingTimeSlot'); // Populate select for modal
        editBookingTimeSlotSelect.value = bookingToEdit.timeSlot;
        
        editBookingModal.classList.remove('hidden');
    }

    cancelEditBookingButton.addEventListener('click', () => {
        editBookingModal.classList.add('hidden');
        editBookingForm.reset();
    });

    editBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bookingId = editBookingIdInput.value;
        const newDate = editBookingDateInput.value;
        const newTimeSlot = editBookingTimeSlotSelect.value;

        const bookingIndex = allBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex > -1) {
            // Simple update, add conflict check if necessary for edit
            allBookings[bookingIndex].date = newDate;
            allBookings[bookingIndex].timeSlot = newTimeSlot;
            allBookings[bookingIndex].updatedAt = new Date().toISOString();
            
            displayManageBookingMessage('Buchung erfolgreich aktualisiert!', 'success');
        } else {
            displayManageBookingMessage('Fehler: Buchung nicht gefunden.', 'error');
        }
        editBookingModal.classList.add('hidden');
        renderManageBookingsPage(); // Re-render the list
    });
    
    function handleCancelBookingClick(event) {
        const bookingId = event.currentTarget.dataset.bookingId;
        const bookingName = event.currentTarget.dataset.bookingName;
        const bookingDate = event.currentTarget.dataset.bookingDate;

        if (confirm(`Möchten Sie die Buchung für ${bookingName} am ${bookingDate} wirklich stornieren?`)) {
            const bookingIndex = allBookings.findIndex(b => b.id === bookingId);
            if (bookingIndex > -1) {
                allBookings[bookingIndex].status = 'cancelled';
                allBookings[bookingIndex].updatedAt = new Date().toISOString();
                displayManageBookingMessage('Buchung erfolgreich storniert!', 'success');
            } else {
                 displayManageBookingMessage('Fehler: Buchung nicht gefunden.', 'error');
            }
            renderManageBookingsPage(); // Re-render the list
        }
    }

    // --- Initial Setup ---
    // By default, loginView is visible and appView is hidden via HTML/CSS
    // No initial page needs to be shown for appView until login.
});

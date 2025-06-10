// config.js - Data Definitions for TableRes App

// --- Mock User Data ---
const mockUsers = [
    { id: 'user1', email: 'tejesh@test.com', password: 'admin', name: 'Tejesh' },
    { id: 'user2', email: 'maxim@test.com', password: 'admin', name: 'Maxim' },
    { id: 'user3', email: 'lukas@test.com', password: 'admin', name: 'Lukas' },
];

// --- Room Layout Data for the Map ---
// Defines the overall structure of rooms on the map grid.
const roomLayoutData = [
    { id: 's2_1og_r5', name: "Raum 5", gridPos: { row: 1, col: 1 }, desksPerRow: 2 },
    { id: 's2_1og_r6', name: "Raum 6", gridPos: { row: 1, col: 2 }, desksPerRow: 2 },
    { id: 's2_1og_r7', name: "Abstell-Raum", gridPos: { row: 1, col: 3 }, bookable: false }, // Not bookable
    { id: 's2_1og_r8', name: "Raum 8", gridPos: { row: 1, col: 4 }, desksPerRow: 2 },
    { id: 's2_1og_r1', name: "Raum 1", gridPos: { row: 2, col: 1 }, desksPerRow: 3, bookable: true },
    { id: 's2_1og_r3', name: "Raum 3", gridPos: { row: 2, col: 2 }, desksPerRow: 2 },
    { id: 's2_1og_r2', name: "Raum 2", gridPos: { row: 2, col: 3 }, desksPerRow: 2 },
    { id: 's2_1og_r4', name: "Raum 4", gridPos: { row: 2, col: 4 }, desksPerRow: 2 },
];

// --- Individual Desk Data ---
// Defines each bookable desk, linking it to a room.
const initialDeskData = [
    { id: 'desk1', roomId: 's2_1og_r5', deskLabel: 'Tisch A' },
    { id: 'desk2', roomId: 's2_1og_r5', deskLabel: 'Tisch B' },
    { id: 'desk3', roomId: 's2_1og_r5', deskLabel: 'Tisch C' },
    { id: 'desk4', roomId: 's2_1og_r5', deskLabel: 'Tisch D' },
    { id: 'desk5', roomId: 's2_1og_r6', deskLabel: 'Tisch A' },
    { id: 'desk6', roomId: 's2_1og_r6', deskLabel: 'Tisch B' },
    { id: 'desk7', roomId: 's2_1og_r8', deskLabel: 'Tisch A' },
    { id: 'desk8', roomId: 's2_1og_r8', deskLabel: 'Tisch B' },
    { id: 'desk9', roomId: 's2_1og_r8', deskLabel: 'Tisch C' },
    { id: 'desk10', roomId: 's2_1og_r8', deskLabel: 'Tisch D' },
    { id: 'desk11', roomId: 's2_1og_r1', deskLabel: 'Tisch A' },
    { id: 'desk12', roomId: 's2_1og_r1', deskLabel: 'Tisch B' },
    { id: 'desk13', roomId: 's2_1og_r1', deskLabel: 'Tisch C' },
    { id: 'desk14', roomId: 's2_1og_r1', deskLabel: 'Tisch D' },
    { id: 'desk15', roomId: 's2_1og_r1', deskLabel: 'Tisch E' },
    { id: 'desk16', roomId: 's2_1og_r1', deskLabel: 'Tisch F' },
    { id: 'desk17', roomId: 's2_1og_r3', deskLabel: 'Tisch A' },
    { id: 'desk18', roomId: 's2_1og_r3', deskLabel: 'Tisch B' },
    { id: 'desk19', roomId: 's2_1og_r2', deskLabel: 'Tisch A' },
    { id: 'desk20', roomId: 's2_1og_r2', deskLabel: 'Tisch B' },
    { id: 'desk21', roomId: 's2_1og_r2', deskLabel: 'Tisch C' },
    { id: 'desk22', roomId: 's2_1og_r2', deskLabel: 'Tisch D' },
    { id: 'desk23', roomId: 's2_1og_r4', deskLabel: 'Tisch A' },
    { id: 'desk24', roomId: 's2_1og_r4', deskLabel: 'Tisch B' },
    { id: 'desk25', roomId: 's2_1og_r4', deskLabel: 'Tisch C' },
    { id: 'desk26', roomId: 's2_1og_r4', deskLabel: 'Tisch D' },
];

// --- Available Time Slots ---
const timeSlots = ["Vormittag", "Nachmittag", "Ganzer Tag"];

// Example room layout data
const exampleRoomLayoutData = [
    { id: 'room1', name: 'Raum 1', gridPos: { row: 1, col: 1 }, desksPerRow: 3 },
    { id: 'room2', name: 'Raum 2', gridPos: { row: 1, col: 2 }, desksPerRow: 3 },
];

// Example desk data
const exampleDeskData = [
    { id: 'desk1', roomId: 'room1', deskLabel: 'Tisch A' },
    { id: 'desk2', roomId: 'room1', deskLabel: 'Tisch B' },
    { id: 'desk3', roomId: 'room1', deskLabel: 'Tisch C' },
    { id: 'desk4', roomId: 'room2', deskLabel: 'Tisch A' },
    { id: 'desk5', roomId: 'room2', deskLabel: 'Tisch B' },
    { id: 'desk6', roomId: 'room2', deskLabel: 'Tisch C' },
];

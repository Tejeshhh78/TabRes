const Table = require('../models/tableModel')
const Booking = require('../models/bookingModel')

// Alle Tische abrufen
exports.getTables = async (req, res) => {
    try {
        const tables = await Table.find().sort({number: 1});

        res.json({
            success: true,
            count: tables.length,
            tables
        });
    } catch (error) {
        res.status(500).json({
             success: false, 
            message: 'Serverfehler', 
            error: error.message
        });
    }
};

// TODO: Check code
// Verfügbare Tische für ein bestimmtes Datum und eine bestimmte Zeit abrufen
exports.getAvailableTables = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;
    
    if (!date || !startTime || !endTime) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datum, Startzeit und Endzeit sind erforderlich' 
      });
    }

    // Alle Tische abrufen
    const allTables = await Table.find().sort({ number: 1 });
    
    // Das angegebene Datum formatieren
    const bookingDate = new Date(date);
    
    // Gebuchte Tische für das angegebene Datum und die angegebene Zeit finden
    const bookedTables = await Booking.find({
      date: {
        $gte: new Date(bookingDate.setHours(0, 0, 0, 0)),
        $lte: new Date(bookingDate.setHours(23, 59, 59, 999))
      },
      $or: [
        {
          startTime: { $lte: startTime },
          endTime: { $gt: startTime }
        },
        {
          startTime: { $lt: endTime },
          endTime: { $gte: endTime }
        },
        {
          startTime: { $gte: startTime },
          endTime: { $lte: endTime }
        }
      ],
      status: { $ne: 'cancelled' }
    }).select('table');
    
    // IDs der gebuchten Tische extrahieren
    const bookedTableIds = bookedTables.map(booking => booking.table.toString());
    
    // Verfügbare Tische filtern
    let availableTables = allTables.filter(table => 
      !bookedTableIds.includes(table._id.toString()) &&
      table.isAvailable
    );
    
    res.json({
      success: true,
      count: availableTables.length,
      tables: availableTables
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Serverfehler', 
      error: error.message 
    });
  }
};
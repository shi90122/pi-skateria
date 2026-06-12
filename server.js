const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint: Handle Reservations
app.post('/api/reservations', (req, res) => {
    const { name, date, time, guests } = req.body;
    
    // In a production environment, this would save to a database (e.g., MongoDB/PostgreSQL)
    console.log(`New Reservation Received: ${name} for ${guests} guests on ${date} at ${time}.`);
    
    // Return a success response
    res.status(200).json({ 
        success: true, 
        message: 'Reservation confirmed! We look forward to seeing you at the skatepark.' 
    });
});

// Fallback Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Pi! Skateria Server running on http://localhost:${PORT}`);
});
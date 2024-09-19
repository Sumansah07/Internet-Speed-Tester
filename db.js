const fs = require('fs');
const os = require('os');
const express = require('express');
const mongoose = require('mongoose');

// Function to log activity
const logActivity = (activity) => {
    const dateTime = new Date().toISOString();
    const ipAddress = os.networkInterfaces()['eth0'] ? os.networkInterfaces()['eth0'][0].address : 'Unknown IP';
    const logEntry = `${dateTime} - IP: ${ipAddress} - Activity: ${activity}\n`;

    // Append the log entry to 'log.txt'
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log('Activity logged');
        }
    });
};

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Internetspeed', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');

        // Log the connection activity
        logActivity('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        logActivity(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
};

// Create an Express app to simulate user activity
const app = express();
app.use(express.json());

// Route to simulate user activity
app.post('/user-activity', (req, res) => {
    const activity = req.body.activity || 'No activity provided';
    
    // Log the user activity
    logActivity(`User activity: ${activity}`);
    
    res.send('Activity logged');
});

app.listen(3001, () => {
    console.log('Server started on port 3000');
});

module.exports = connectDB;

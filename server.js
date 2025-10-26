const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (your HTML)
app.use(express.static(__dirname));

// POST endpoint to receive IP
app.post('/log-ip', (req, res) => {
    const { privateIp, publicIp, localIp, timestamp, userAgent } = req.body;
    
    // Log all IP types to console
    console.log('🎯 NEW CONNECTION DETECTED');
    console.log('================================');
    console.log(`📍 Public IP: ${publicIp || 'Not available'}`);
    console.log(`🏠 Private IP: ${privateIp || 'Not available'}`);
    console.log(`🔧 Local IP: ${localIp || 'Not available'}`);
    console.log(`🕒 Time: ${new Date(timestamp).toLocaleString()}`);
    console.log(`🌐 Browser: ${userAgent || 'Unknown'}`);
    console.log('================================\n');
    
    // Send response
    res.json({ 
        success: true, 
        message: 'All IP addresses received'
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📝 Waiting for connections...\n`);
});

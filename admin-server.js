const express = require('express');
const path = require('path');
const app = express();

// Serve all files in the current directory (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route the root URL directly to your admin dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Render provides the PORT dynamically
const PORT = process.env.PORT || 4000;
server = app.listen(PORT, () => {
    console.log(`Sentinel Admin Panel active on port ${PORT}`);
});

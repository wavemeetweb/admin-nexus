const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Health check endpoint for Render monitoring
app.get('/status', (req, res) => res.send('Sentinel Online'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[SENTINEL] Governance interface live on port ${PORT}`);
});

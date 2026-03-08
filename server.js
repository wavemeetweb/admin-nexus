const bannedUsers = new Set(); // In a real app, load this from Firebase Firestore

io.on('connection', (socket) => {
    socket.on('auth', async (userData) => {
        // SECURITY CHECK
        if (bannedUsers.has(userData.uid) || bannedUsers.has(userData.email)) {
            socket.emit('banned-notice', "Your access to Zenith Nexus has been revoked due to trolling.");
            socket.disconnect();
            return;
        }
        
        socket.username = userData.name;
        socket.uid = userData.uid;
        // ... rest of auth logic
    });

    // MASTER ADMIN POWERS (Only you can trigger this)
    socket.on('admin-global-ban', ({ targetUid, adminSecret }) => {
        if (adminSecret === "YOUR_SUPER_SECRET_PASSWORD") {
            bannedUsers.add(targetUid);
            io.emit('force-check-ban', targetUid); // Instantly kicks them if they are online
            console.log(`User ${targetUid} has been globally banned.`);
        }
    });
});

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace this with your actual MongoDB Connection String
const MONGO_URI = "mongodb+srv://shieldsync_admin:Incseption2026@cluster0.dkykvmw.mongodb.net/?appName=Cluster0/";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));

// Define the Agent Schema
const AgentSchema = new mongoose.Schema({
    agentId: { type: String, required: true, unique: true },
    passcode: { type: String, required: true }, // In production, use bcrypt to hash this!
    xp: { type: Number, default: 0 }
});
const Agent = mongoose.model('Agent', AgentSchema);

// --- ROUTES ---

// 1. Register
app.post('/api/register', async (req, res) => {
    try {
        const { agentId, passcode } = req.body;
        const existing = await Agent.findOne({ agentId });
        if (existing) return res.status(400).json({ error: 'Agent ID already taken' });

        const newAgent = await Agent.create({ agentId, passcode });
        res.status(201).json({ message: 'Clearance Granted', agent: newAgent });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. Login
app.post('/api/login', async (req, res) => {
    try {
        const { agentId, passcode } = req.body;
        const agent = await Agent.findOne({ agentId, passcode });

        if (!agent) return res.status(401).json({ error: 'Invalid Credentials' });
        res.status(200).json({ message: 'Access Granted', agent });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 ShieldSync API running on port ${PORT}`));
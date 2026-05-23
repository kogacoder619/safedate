require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/verify', require('./routes/verify'));
app.use('/api/garbo', require('./routes/garbo'));

app.get('/health', (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`safedate server running on port ${PORT}`));

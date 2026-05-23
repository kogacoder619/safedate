const router = require('express').Router();
const axios = require('axios');

const GARBO_BASE = 'https://api.garbo.io/v1';

// POST /api/garbo/search  { firstName, lastName, city?, state?, dob? }
// Garbo API docs: https://garbo.io/for-platforms — verify exact shape with your key
router.post('/search', async (req, res) => {
  const { firstName, lastName, city, state, dob } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'firstName and lastName are required' });
  }

  try {
    const { data } = await axios.post(
      `${GARBO_BASE}/search`,
      { firstName, lastName, city, state, dob },
      {
        headers: {
          Authorization: `Bearer ${process.env.GARBO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Normalise the Garbo response into a shape the app can use
    res.json({
      sexOffenderHit: data.sexOffenderHit ?? false,
      violentCrimes: data.violentCrimes ?? [],
      otherRecords: data.otherRecords ?? [],
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    const status = err.response?.status ?? 500;
    const message = err.response?.data?.message ?? err.message;
    res.status(status).json({ error: message });
  }
});

module.exports = router;

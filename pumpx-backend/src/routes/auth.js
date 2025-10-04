import express from 'express';

const router = express.Router();

router.post('/register', async (req, res) => {
  res.json({ success: true, message: 'Auth routes - Coming soon' });
});

router.post('/login', async (req, res) => {
  res.json({ success: true, message: 'Auth routes - Coming soon' });
});

export default router;

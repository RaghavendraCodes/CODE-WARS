import { Router } from 'express';
const router = Router();
import WaitingUser, { findOne } from '../models/waiting';

router.post('/add', async (req, res) => {
  const { name, email, difficulty, matchID } = req.body;

  try {
    // Add the user to the waiting queue
    const newUser = new WaitingUser({ name, email, difficulty, matchId: matchID });
    await newUser.save();

    // Check if there’s another waiting user with the same difficulty
    const match = await findOne({ difficulty, status: 'waiting', _id: { $ne: newUser._id } });

    if (match) {
      // Update both users with matched status
      match.status = 'matched';
      newUser.status = 'matched';

      await match.save();
      await newUser.save();

      // Respond with match details
      res.json({ success: true, matchFound: true, matchDetails: { user1: newUser, user2: match } });
    } else {
      res.json({ success: true, matchFound: false, message: 'Waiting for an opponent...' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add user to waiting list', error });
  }
});

export default router;

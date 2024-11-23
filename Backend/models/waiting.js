import { Schema, model } from 'mongoose';

const WaitingUserSchema = new Schema({
  name: String,
  email: String,
  difficulty: String,
  matchId: String,
  status: { type: String, default: 'waiting' },
  joinedAt: { type: Date, default: Date.now },
});

const WaitingUser = model('WaitingUser', WaitingUserSchema);
export default WaitingUser;

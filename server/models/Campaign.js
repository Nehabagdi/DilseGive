import mongoose from 'mongoose';

const updateSchema = new mongoose.Schema({
  date: { type: String, required: true },
  text: { type: String, required: true }
});

const transparencySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  date: { type: String, required: true }
});

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true }, // goalAmount
  raised: { type: Number, default: 0 }, // raisedAmount
  location: { type: String, required: true }, // city, state
  category: { type: String, enum: ['Food', 'Education', 'Healthcare', 'Relief', 'Development'], required: true },
  ngo: { type: String, required: true }, // ngoName
  image: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
  updates: [updateSchema],
  transparency: [transparencySchema]
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;

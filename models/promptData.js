import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  prompt: 
  {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const promptData = mongoose.model('promptData', userSchema);

export default promptData;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: 
  {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
});

const usersData = mongoose.model('usersData', userSchema);

export default usersData;

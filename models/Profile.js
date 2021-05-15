
const mongoose = require('mongoose'); 

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }, 
  dailyTasks: {
    type: [String],
    required:true
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);


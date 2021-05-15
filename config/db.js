const mongoose = require('mongoose'); 
const config = require('config'); 
const db = config.get('mongoURI');


//give us a promise or Async 
//asny wrapped always in try and catch 

const connectDB = async () => {
  try {
    //gibt us a promise
    await mongoose.connect(db, {
      useNewUrlParser:true,
      useCreateIndex:true,
      useUnifiedTopology: true
    });
 console.log('MongoDB connected :-)');
  } catch(err){
    console.log(err.message);

    //exit process with failure
 process.exit(1)
  }
}


module.exports = connectDB; 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import { MODE, LOCAL_DB_URL, TEST_DB_URL, DEV_DB_URL, PROD_DB_URL}  from '../config/constants';
export const startDb = () =>{
    console.log(DEV_DB_URL)
    let DB_URL;
    if(MODE == 'LOCAL'){
      DB_URL = LOCAL_DB_URL
    } else if(MODE == 'TEST'){
      DB_URL = TEST_DB_URL
    } else if(MODE == 'PROD'){
      DB_URL = PROD_DB_URL
    }else if(MODE == 'DEV'){
      DB_URL = DEV_DB_URL
    }
    mongoose.connect(DB_URL, {
        useNewUrlParser: true, 
        useFindAndModify: false, 
        useCreateIndex:true,
        useUnifiedTopology: true
        }, (err,done) => {
          if(err){
            console.error(err);
          } else{
            console.log('Database connected to: ' + DB_URL);

          }
      })
      
}
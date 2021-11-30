var db = require('../utils/db');

module.exports = {
    
  
    singleByUserName: name => {
      return db.load(`select * from account where username = '${name}'`);
    },
  
    findById: name => {
      return db.load(`select * from account where id = '${name}'`);
    }
}
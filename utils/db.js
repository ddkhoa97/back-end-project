const mysql = require('mysql');
const config = require('../config/default');
var createConnection = () => mysql.createConnection(config['mysql']);
module.exports = {
    load: sql => {
      return new Promise((resolve, reject) => {
        var connection = createConnection();
        connection.connect();
        connection.query(sql, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
          connection.end();
        });
      });
    }
};

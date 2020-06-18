const MySQL = require('mysql');

class DatabaseConnection {
  constructor() {
    this.host = 'localhost';
    this.user = 'root';
    this.password = '';
    this.database = 'sample_chatsystem';
  }
  dbConnection() {
    return MySQL.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });
  }
  validateConnection() {
    // let x = {status:'zxc'};
    this.dbConnection().connect((err)=>{
      return err ? err : 'Connected!';
    });
  }
}

module.exports = DatabaseConnection;

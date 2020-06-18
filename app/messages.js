const Database = require('./db.js');
const User = require('./user.js');
const MySQL = require('mysql');

class Messages extends User{
  getUserMessages(chatId, data){
    this.dbConnection().query('SELECT * FROM `tbl_messages` WHERE `chat_id`=' + MySQL.escape(chatId.id), (err, rows, fields) => {
      data(err || rows)
    });
  }
  sentMessage(){

  }
}

module.exports = Messages;


const MySQL = require('mysql');
const Database = require('./db.js');
class User extends Database {
  getAllUser(id, data){
    const query = 'SELECT `chat_id`,`username` FROM `tbl_user` INNER JOIN `tbl_chat_member` ON `tbl_chat_member`.`user_id`=`tbl_user`.`id` WHERE `tbl_user`.`id`!=' + MySQL.escape(id);
    this.dbConnection().query(query, (err, rows, fields) => {
      data(err || rows);
      // if(err){
      //   return err;
      // } else {
      //   console.table(rows);
      // }
    });
  }
  getActiveUser(id){
    return id;
  }
  getUserId(){

  }
  getChatId(current, userId, data){
    const query = `SELECT * FROM \`tbl_chat_member\` WHERE \`user_id\`=${MySQL.escape(current)} OR \`user_id\`=${MySQL.escape(current)} GROUP BY \`chat_id\``;
    this.dbConnection().query(query, (err, rows, fields) => {
      data(rows);
    });
  }
  validateUser(username, data) {
    this.dbConnection().query(`SELECT * FROM \`tbl_user\` WHERE \`username\`=${MySQL.escape(username)}`, (err, rows, fields) => {
      data(rows);
    });
  }
  registerUser(username, data){
    this.dbConnection().query(`INSERT INTO \`tbl_user\`(\`username\`) VALUES(${MySQL.escape(username)})`, (err, result) => {
      data(result);
    });
  }
  login(req, res, next) {
    let user = {username: req.body.username};
    this.validateUser(user.username, (x)=>{
      if(x[0]) {
        user['id'] = x[0]['id'];
        res.render('index', {data:user})
      } else {
        this.registerUser(user.username, (data)=>{
          user['id'] = data.insertId;
          // res.send(user);
          res.render('index', {data:user})
        });
        // res.redirect('/?username=invalid');
      }
      // res.render('index', {sample: 'sample data'})
    });
  }

}
module.exports = User;

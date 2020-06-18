const express = require('express');
const socket = require('socket.io');
const path = require('path');
const Db = require('./app/db.js');
const User = require('./app/user.js');
const ejs = require('ejs');
const Messages = require('./app/messages.js');
const expressSession = require('express-session');
var app = express();

// const dbc = new Db();
const db = new Db();
const user = new User();
const message = new Messages();


const router = express.Router();
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set("views", path.join(__dirname, "public"));
app.use(express.json()); // form data
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("login");
});
app.post('/login', user.login.bind(user));


// console.table(user.getAllUser());
// console.log(user.getActiveUser(1123123));

// mes

var server = app.listen(4000, ()=>{
  console.log('Listening to port 4000');
});
var client = socket(server);
const activeUser = 1;
const users = [{
    id:1,
    username: 'jm',
  }, {
    id:2,
    user: 'anthony',
  }
];
let chatMessages = [{
  chat_id: 1234,
  from: 1,
  message:"first"
}];
let chat_id = [{
  id:1,
  chat_id: 1234
  }, {
  id:2,
  chat_id:2345
}];
let chat_ids = [{
  id:1,
  chat_id:1234,
  user_id:1
}];
let activeUserId = 1;
// app.use(express.static('public'));
  //
  client.on('connection', socket=>{
    let currentUserId = '';
    // console.log('socket conn--' + socket.id);
    socket.on('getAllUser', ({userId})=>{
      currentUserId = userId;
      user.getAllUser(userId, (result)=>{
        // console.log();
        client.emit('check', result.sqlMessage ? 'server error' : result)
      });
      // client.emit('check', {id:userId});
    })
    socket.on('chat', (chatId)=>{
      // user.getChatId(currentUserId, userId, (rows)=>{
        // console.log(chatId)
      // })
      message.getUserMessages(chatId, (data)=>{
        // console.log(data);
        client.emit('chat-history', data)
      })
      // console.log(currentUserId);
      // client.emit('chat-history',{''})
    })
    // socket.on('message-history',data=>{
    //   client.to(data.userId).emit('chatDetails', {
    //     user: data.userId
    //   });
    // });

    // client.emit('chat-history', chatMessages)

    socket.on('send-message',data=>{
      // chatMessages.push(data);
      client.emit('sent', data);

      // console.log(chatMessages);
    })
  });

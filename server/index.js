var express = require('express');
var bp = require('body-parser')
var server = express()
var cors = require('cors')
var port = 3000

//create server for socked and connect socket to it
var app = require('http').createServer(server);
var io = require("socket.io")(app);



var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))




//Fire up database connection
require('./server-assets/db/mlab-config')


//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//REGISTER YOUR AUTH ROUTES BEFORE YOUR GATEKEEPER, OTHERWISE YOU WILL NEVER GET LOGGED IN
let auth = require('./server-assets/auth/routes')
server.use(auth.session)
server.use(auth.router)


//Gate Keeper Must login to access any route below this code
server.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

//ROUTES!
let tournamentRoutes = require('./server-assets/routes/tournaments')
server.use('/api/tournament', tournamentRoutes)
let entryRoutes = require('./server-assets/routes/entries')
server.use('/api/entry', entryRoutes)
let profileRoutes = require('./server-assets/routes/profiles')
server.use('/api/profile', profileRoutes)







//Catch all
server.use('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})

//socket stuff
let connectedUsers = {}
let rooms = {}

io.on("connection", socket => {
  console.log("User Connected");

  //notify controller of successful connection
  socket.emit("CONNECTED", {
    socket: socket.id,
    message: "successfully connected",
    openRooms: Object.keys(rooms)

  })

  socket.on("join", data => {
    //insure connection passed name
    if (data.name, data.room) {
      //attaches name to socket
      //@ts-ignore
      socket.user = data.name;
      if (!rooms[data.room]) {
        rooms[data.room] = []
      }
      //@ts-ignore
      rooms[data.room].push(socket.user)
      //add connection to room
      socket.join(data.room);


      //notify connection of room connection
      socket.emit("joinedRoom", {
        connectedUsers: rooms[data.room],
      });

      //notify room of new connection
      io.to(data.room).emit("newUser", { userName: data.name });
    }
  });
  //connection leaves room
  socket.on('leave', data => {
    //confirm they were in the room
    //@ts-ignore
    if (socket.user) {
      //remove connection from room
      //@ts-ignore
      let i = rooms[data.roomName].findIndex(user => {
        return user == data.name
      })
      rooms[data.roomName].splice(i, 1)
      //@ts-ignore
      io.to(data.roomName).emit('left', socket.user)
    }
  })
  socket.on('message', data => {
    if (data.message && data.user) {
      console.log('message received')
      io.to(data.roomName).emit('newMessage', data)
    }
  })

  // socket.on('newBoard', data => {
  //   Boards.create(data)
  //     .then(res => {
  //       io.to('tournament').emit('boardCreated', res)
  //     })
  // })
})

app.listen(port, () => {
  console.log('server running on port', port)
})

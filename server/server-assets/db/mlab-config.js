var mongoose = require('mongoose')
var connectionString = 'mongodb://brackets:brackets1@ds042908.mlab.com:42908/brackets'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})
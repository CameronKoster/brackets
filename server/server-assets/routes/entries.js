let router = require('express').Router()
let Entries = require('../models/entry')
let Users = require('../models/user')


//create a new entry
router.post('/', (req, res, next) => {
  req.body.members.push(req.session.uid)
  Entries.create(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//create a new owner entry
router.post('/ownerEntry', (req, res, next) => {
  req.body.members.push("5c4cc3faeef20209b8cd29b7")
  Entries.create(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//owner may delete an entry
router.delete('/:entryId', (req, res, next) => {
  Entries.findById({ _id: req.params.entryId })
    .then(entry => {
      entry.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("successfully deleted")
      })
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//owner update an entry
router.put('/:entryId', (req, res, next) => {
  Entries.findById({ _id: req.params.entryId })
    .then(entry => {
      entry.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      })
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//get all users for autocomplete
router.get('/', (req, res, next) => {
  Users.find({})
    .then(users => {
      users.forEach(user => {
        delete user._doc.password
      })
      res.send(users)
    })
    .catch(err => {
      console.log(err)
      next()
      return
    })
})

//get tournament Ids for a User Id
//get all entries with a particular user Id
router.get('/:userId', (req, res, next) => {
  let tournamentIds = []
  Entries.find({ members: [req.params.userId] })
    .then(entries => {
      entries.forEach(entry => {
        tournamentIds.push(entry.tournamentId)
      })
      res.send(tournamentIds)
    })
    .catch(err => {
      console.log(err)
      next()
      return
    })
})
module.exports = router
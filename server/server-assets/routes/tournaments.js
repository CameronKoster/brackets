let router = require('express').Router()
let Tournaments = require('../models/tournament')
let Entries = require('../models/entry')
let robin = require("roundrobin")

//get a Tournament by Id
router.get('/:tournamentId', (req, res, next) => {
  Tournaments.findOne({ _id: req.params.tournamentId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.error(err)
      next()
    })
})

//create a tournament
router.post('/', (req, res, next) => {
  req.body.owner = req.session.uid
  Tournaments.create(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.put('/:tournamentId/archive', (req, res, next) => {
  Tournaments.findById(req.params.tournamentId)
    .then(tournament => {
      if (!tournament.owner.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      tournament.archived = true
      tournament.save(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send(tournament)
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//update a tournament
router.put('/:tournamentId/:userId', (req, res, next) => {
  Tournaments.findById({ _id: req.params.tournamentId })
    .then(tournament => {
      if (!tournament.owner.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      tournament.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.put('/:tournamentId', (req, res, next) => {
  Tournaments.findById({ _id: req.params.tournamentId })
    .then(tournament => {
      tournament.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//delete a tournament 
router.delete('/:tournamentId', (req, res, next) => {
  Tournaments.findById(req.params.tournamentId)
    .then(tournament => {
      if (!tournament.owner.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      tournament.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})


//get entries by tournamentId
router.get('/:tournamentId/entries', (req, res, next) => {
  Tournaments.findById(req.params.tournamentId)
    .then(activeTournament => {
      Entries.find({ tournamentId: req.params.tournamentId })
        .then(data => {
          if (activeTournament.style == "Single-Elimitation" || activeTournament.style == "Double-Elimination") {
            res.send(data)
            return
          }
          if (activeTournament.style == "Round-Robin-Split") {
            let group1 = []
            let group2 = []
            let out = {
              rounds: {
                group1: {},
                group2: {}
              }
            }
            for (let i = 1; i < data.length + 1; i++) {
              const entry = data[i - 1];
              if (i % 2) {
                group1.push(entry)
              } else {
                group2.push(entry)
              }
            }
            let group1Rounds = robin(group1.length, group1)
            let group2Rounds = robin(group2.length, group2)
            let count = 1
            group1Rounds.forEach(round => {
              out.rounds.group1["round" + count++] = round
              count = 1
            })
            group2Rounds.forEach(round => {
              out.rounds.group2["round" + count++] = round
            })
            out["entries"] = data
            res.send(out)
          }
          if (activeTournament.style === "Round-Robin") {
            let out = {
              rounds: {

              }
            }
            let round = robin(data.length, data)
            let count = 1
            round.forEach(round => {
              out.rounds["round" + count++] = round
            })
            out.entries = data
            res.send(out)
          }
        })
        .catch(err => {
          console.log(err)
          next()
        })
    })
})

//get a tournament by an entry code
router.get('/join/:entryCode', (req, res, next) => {
  Tournaments.findOne({ entrycode: req.params.entryCode })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//get all tournaments made by an owner
router.get('/:ownerId/owner', (req, res, next) => {
  let tournamentIds = []
  Tournaments.find({ owner: req.params.ownerId })
    .then(Tournaments => {
      Tournaments.forEach(t => {
        tournamentIds.push(t._id)
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
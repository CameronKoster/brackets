let router = require('express').Router()
let Users = require('../models/user')


//update user bio/picture
router.put('/:userId', (req, res, next) => {
  Users.findByIdAndUpdate(req.params.userId, req.body)
    .then(user => {
      res.send("Successfully Updated")
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
module.exports = router
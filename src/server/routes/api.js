const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const mongoose = require('mongoose')
const db = "mongodb+srv://admin:zFGRKXn4aHKfKdX@myproject-k5h8e.mongodb.net/Project?retryWrites=true"

/* import Models */
const Staff = require('../models/staff')
 
mongoose.connect(db, err => {
  if (err) {
    console.error('Error!' + err)
  } else {
    console.log('Connected to Database')
  }
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works')
});

/* Staff registration API */
router.post('/staff/register', (req, res) => {
  let staffData = req.body
  let staff = new Staff(staffData)

  staff.save((error, registeredStaff) => {
    if (error) {
      console.log(error)
    } else {
      let payload = { subject: registeredStaff._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

/* Staff login API */
router.post('/staff/login', (req, res) => {
  let staffData = req.body

  Staff.findOne({ email: staffData.email }, (error, staff) => {
    if(error) {
      console.log(error)
    } else {
      if (!staff) {
        res.status(401).send('Invalid email')
      } else
      if ( staff.password !== staffData.password ) {
        res.status(401).send('Invalid password')
      } else {
        let payload = { subject: staff._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
     }
  })
})

module.exports = router;
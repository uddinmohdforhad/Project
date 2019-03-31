const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const mongoose = require('mongoose')
const db = "mongodb+srv://admin:zFGRKXn4aHKfKdX@myproject-k5h8e.mongodb.net/Project?retryWrites=true"

/* import Models */
const Staff = require('../models/staff')
const Customer = require('../models/customer')
 
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
      if(staffIsDuplicate(staff.email)) {
        res.status(401).send({success: false, message: "Email already exits in database"})
      }
      else {
        console.log(error)
      }
    } else {
      let payload = { subject: registeredStaff._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({success: true})
    }
  })
})

async function staffIsDuplicate(id) {
  isDuplicate = false
  await Staff.findOne({ email: id }, (error, staff) => {
    if(error) {
      console.log(error);
    } else if (staff) {
      isDuplicate = true
    }
  })
  return isDuplicate;
}

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

/* Get All Staff */
router.get('/staff/getAll', (req, res) => {
  findStaff("", res)
})
router.get('/staff/getByEmail', (req, res) => {
  let data = req.body
  findStaff(data.email, res)
})

function findStaff(byEmail, res){
  if (!byEmail || byEmail === ""){
    Staff.find({} , (error, staffList) => {
      if (error) {
        console.log(error)
      } else
      if (!staffList) {
        res.status(401).send('no staff members')
      } else {
        res.status(200).send(staffList)
      }
    })
  } else {
    Staff.findOne({ email: byEmail }, (error, staff) => {
      if (error) {
        console.log(error)
      } else
      if (!staff) {
        res.status(401).send(`no staff with email: ${byEmail}`)
      } else {
        res.status(200).send(staff)
      }
    })
  }
}

router.post('/staff/getById', (req, res) => {
  var staffData = req.body
  var id = staffData._id
  Staff.findById(id, (error, staff) => {
    if (error) console.log(error)
    else if (!staff) res.status(401).send({success: false, message: `staff (id: ${id}) not found`});
    else res.status(200).send({success: true, message: `${staff.email} was returned`, objectReturned: staff})
  })
})

/* Find and remove */
router.post('/staff/remove', (req, res) => {
  var staffData = req.body
  var id = staffData._id
  Staff.findByIdAndRemove(id, (error, removedStaff) => {
    if (error) console.log(error);
    else if (!removedStaff) res.status(401).send({success: false, message: `staff (email: ${staffData.email}) not found`});
    else res.status(200).send({success: true, message: `${removedStaff.email} has been removed from database`});
  })
})

/* find and update */
router.post('/staff/update', (req, res) => {
  var staffData = req.body
  var id = staffData._id
  Staff.findByIdAndUpdate(id, staffData, (error, updatedStaff) => {
    if (error) console.log(error)
    else if (!updatedStaff) res.status(401).send({success: false, message: `staff (email: ${staffData.email}) not found`});
    else res.status(200).send({success: true, message: `${updatedStaff.email} was updated`})
  })
})


/* Customer Sign Up */
router.post('/customer/signup', (req, res) => {
  var customerData = req.body
  var newCustomer = new Customer(customerData)
  console.log(newCustomer)
  newCustomer.save((error, signupCustomer) => {
    if (error) { 
      if(error.name == "MongoError" && error.code == 11000) {
        res.status(401).send({success: false, message: "Email already exits in database"})
      }
      else if(error.name == "ValidationError") {
        res.status(401).send({success: false, message: error.message})
      }
      else {
        res.status(500).send(error)
      }
    } else {
      let payload = { subject: signupCustomer._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({success: true, token: token})
    }
  })
})

router.post('/customer/login', (req, res) => {
  let customerData = req.body

  Customer.findOne({ email: customerData.email }, (error, customer) => {
    if(error) {
      console.log(error)
    } else {
      if (!customer) {
        res.status(401).send({success: false, message: 'Invalid email'})
      } else
      if ( customer.password !== customerData.password ) {
        res.status(401).send({success: false, message: 'Invalid password'})
      } else {
        let payload = { subject: customer._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({success: true, token})
      }
     }
  })
})

module.exports = router;
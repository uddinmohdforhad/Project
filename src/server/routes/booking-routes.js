const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

/* import Models */
const Customer = require('../models/customer')
const Booking = require('../models/bookingV2')

router.post('/customer/bookingV2', (req, res) => {
  let bookingData = req.body
  var token = bookingData.token
  var date = bookingData.date
  var time = bookingData.time
  var tables = [String]
  tables = bookingData.tables
  
  if(tables.length == 0)
  {
    res.status(400).send({success: false, message: "No table was selected."})
  }

  var customerId = "";
  var payload = jwt.verify(token, 'secretKey', function(err, payload){
    if(err) res.status(401).send({success: false, message: 'Invalid token'});

    customerId = payload.subject;
  });

  Customer.findById(customerId, (error, customerObj) => {
    if (error) res.status(401).send({success: false, message: 'Invalid customer id'});

    var newBooking = {
      customerId: customerObj._id,
      customerEmail: customerObj.email,
      date: date,
      time: time,
      tables: tables,
      status: "Booked"
    }

    var booking = new Booking(newBooking);
    booking.save((error, newBooking) => {
      if(error) res.status(500).send({success: false, message: 'error'});
  
      res.status(200).send({success: true, booking: newBooking, message: `${newBooking.customerEmail}, your booking is confirmed, your booking number is ${newBooking._id}`})
    })
  });
})

router.post('/customer/getBookingsV2', (req, res) => {
  let bookingData = req.body

  var customerId = "";

  var token = bookingData.token;
  var payload = jwt.verify(token, 'secretKey', function(err, payload){
    if(err) res.status(401).send({success: false, message: 'Invalid token'});

    customerId = payload.subject;
  });

  Booking.find({ customerId: customerId }, (error, customerBookings) => {
    if (error) {
      console.log(error)
    } else
    if (!customerBookings) {
      res.status(204).send({success: false, message: 'No bookings'})
    } else {
      res.status(200).send(customerBookings)
    }
  })
})

router.post('/customer/getBookingV2', (req, res) => {
  let bookingData = req.body

  var bookingId = bookingData._id

  Booking.findById(bookingId, (error, booking) => {
    if (error) console.log(error)
    else if (!booking) res.status(401).send({success: false, message: `booking (id: ${bookingId}) not found`});
    else res.status(200).send({success: true, booking})
  })
})

router.get('/staff/getAllBookings', (req, res) => {
  Booking.find({}, (err, bookings) => {
    if (err) console.log(err)
    else if (!bookings) res.status(200).send({success: false, message: "no bookings"})
    else res.status(200).send({success: true, bookings})
  })
})

router.post('/staff/getBookingsByDate', (req, res) => {
  let reqData = req.body

  var date = reqData.date

  Booking.find({date}, (err, bookings) => {
    if (err) console.log(err)
    else if (!bookings) res.status(200).send({success: false, message: `no bookings on (${date})`})
    else res.status(200).send({success: true, bookings})
  })
})

router.post('/staff/getBookingById', (req, res) => {
  let reqData = req.body

  var id = reqData._id

  Booking.findById(id, (error, booking) => {
    if (error) console.log(error)
    else if (!booking) res.status(401).send({success: false, message: `booking (id: ${id}) not found`});
    else res.status(200).send({success: true, booking})
  })
})

router.post('/booking/cancel', (req, res) => {
  let reqData = req.body

  var id = reqData._id

  Booking.findByIdAndUpdate(id, {status: "Canceled"} , (error, booking) => {
    if (error) console.log(error)
    else if (!booking) res.status(401).send({success: false, message: `booking (id: ${id}) not found`})
    else res.status(200).send({success: true, message: "Your booking was canceled", booking})
  })
})

router.post('/booking/ordered', (req, res) => {
  let reqData = req.body

  var id = reqData._id

  Booking.findByIdAndUpdate(id, {status: "Ordered"} , (error, booking) => {
    if (error) console.log(error)
    else if (!booking) res.status(401).send({success: false, message: `booking (id: ${id}) not found`})
    else res.status(200).send({success: true})
  })
})

router.post('/booking/update', (req, res) => {
  let reqData = req.body

  var id = reqData._id

  Booking.findByIdAndUpdate(id, { 
    tables: reqData.tables, 
    date: reqData.date,
    time: reqData.time
  }, (error, updatedBooking) => {
    if (error) console.log(error)
    else if (!updatedBooking) res.status(401).send({success: false, message: `booking (id: ${id}) not found`})
    else res.status(200).send({success: true, message: "Your booking was updated"})
  })
})

module.exports = router;
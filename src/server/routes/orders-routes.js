const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

/* import Models */
const Customer = require('../models/customer')
const Booking = require('../models/bookingV2')
const Order = require('../models/order')

router.post('/customer/order', (req, res) => {
  let orderData = req.body
  orderData.date = DateToString()

  var newOrder = new Order(orderData)
  console.log(newOrder)
  newOrder.save((error, order) => {
    if (error) { 
      res.status(500).send(error)
    } else {
      res.status(200).send({success: true, order})
    }
  })
})

function DateToString() {
  var date = new Date()
  var month = (date.getMonth()+1).toString();
  if(date.getMonth()+1 < 10)
  {
    month = `0${date.getMonth()+1}`
  }
  return `${date.getFullYear()}${month}${date.getDate()}`
}

router.post('/order/getById', (req, res) => {
  let reqData = req.body

  var id = reqData._id
  Order.findById(id, (error, order) => {
    if(error) console.log(error)
    if(!order) res.status(400).send({success: false, message: `Order id (${id}) is not valid`})
    else res.status(200).send({success: true, order})
  })
})

router.get('/order/get', (req, res) => {
  Order.find((error, orders) => {
    if(error) console.log(error)
    else res.status(200).send({success: true, orders})
  })
})

module.exports = router;
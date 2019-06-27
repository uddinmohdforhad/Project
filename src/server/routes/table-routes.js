const express = require('express')
const router = express.Router()

/* import Models */
const Table = require('../models/table')

router.post("/tables/add", (req, res) => {
  let tableData = req.body
  let table = new Table(tableData)
  
  var today = new Date()
  console.log(today);
  console.log(today.getFullYear());
  console.log(today.getMonth());
  console.log(today.getDate());
  var todayString = `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
  table.availability[todayString] = { 
    five_six: true,
    six_seven: true, 
    seven_eight: true, 
    eight_nine: true, 
    nine_ten: true, 
    ten_eleven: true
  }

  table.save((error, newTable) => {
    if (error){
      res.status(401).send({succes: false, error})
    } else {
      res.status(200).send({succes: true, message: "Table was added"})
    }
  })
})

router.post("/tables/update", (req, res) => {
  let tableData = req.body
  let tableNo = tableData.tableNo

  Table.findOneAndUpdate({ tableNo }, tableData, (error, updatedTable) => {
    if (error) console.log(error)
    else if (!updatedTable) res.status(401).send({success: false, message: `table (No: ${tableData.tableNo}) not found`});
    else res.status(200).send({success: true, message: `Table No:${updatedTable.tableNo} was updated`})
  })
})

router.delete("/tables/delete", (req, res) => {
  let tableData = req.body
  let tableNo = tableData.tableNo

  Table.findOneAndDelete({ tableNo }, (error, deletedTable) => {
    if (error) console.log(error);
    else if (!deletedTable) res.status(401).send({success: false, message: `table (No: ${tableData.tableNo}) not found`});
    else res.status(200).send({success: true, message: `Table No:${deletedTable.tableNo} was deleted`});
  })
})

router.get("/tables/getAll", (req, res) => {
  Table.find((error, tableList) => {
    if (error) {
      console.log(error)
    } else
    if (!tableList) {
      res.status(204).send({success: false, message:"Empty list"})
    } else {
      res.status(200).send({success: true, tableList})
    }
  })
})

router.get("/tables/getByNumber", (req, res) => {
  let tableData = req.body
  let tableNo = tableData.tableNo

  Table.findOne({ tableNo } ,(error, table) => {
    if (error) {
      console.log(error)
    } else
    if (!table) {
      res.status(404).send({success: false, message:`no table with number: ${tableNo}`})
    } else {
      res.status(200).send({success: true, table})
    }
  })
})

//Get available tables ==> Given (date) and (time)
router.get("/tables/getAvailableTables", (req, res) => {
  let reqBody = req.body
  let date = reqBody.date
  let time = reqBody.time

  Table.find((error, tableList) => {
    if (error) {
      console.log(error)
    } else
    if (!tableList) {
      res.status(204).send({success: false, message:"Empty list"})
    } else {
      var availableTables = []

      tableList.forEach(table => {
        //check the avail on date
        var currentAvailability = table.availability[date];

        if(currentAvailability == undefined) {
          // added the new date to table
          table.availability[date] = { 
            five_six: true,
            six_seven: true, 
            seven_eight: true, 
            eight_nine: true, 
            nine_ten: true, 
            ten_eleven: true
          }

          //updated the table
          Table.findOneAndUpdate({ tableNo: table.tableNo }, table, (error, updatedTable) => {
            if (error) console.log(error)
            else if (!updatedTable) console.log("table not found");
            else console.log("table updated");
          })

          //add the table to the availableTables array
          var resTableObj = {
            tableNo: table.tableNo,
            capacity: table.capacity
          }
          availableTables.push(resTableObj);
        } else { // if exists
          var timeAvailTable = currentAvailability[time]
          if(timeAvailTable == true)
          {
            //add the table to the availableTables array
            var resTableObj = {
              tableNo: table.tableNo,
              capacity: table.capacity
            }
            availableTables.push(resTableObj);
          }
        }
      })

      res.status(200).send({success: true, availableTables})
    }
  })
})


module.exports = router;
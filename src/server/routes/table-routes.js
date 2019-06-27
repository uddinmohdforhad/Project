const express = require('express')
const router = express.Router()

/* import Models */
const Table = require('../models/table')

router.post("/tables/add", (req, res) => {
  let tableData = req.body
  let table = new Table(tableData)
  
  var today = new Date()
  var month = (today.getMonth()+1).toString();
  if(today.getMonth()+1 < 10)
  {
    month = `0${today.getMonth()+1}`
  }
  var todayString = `${today.getFullYear()}${month}${today.getDate()}`
  table.availability[todayString] = { 
    five_six: true,
    six_seven: true, 
    seven_eight: true, 
    eight_nine: true, 
    nine_ten: true, 
    ten_eleven: true,
    eleven_twelve: true
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

router.post("/tables/getByNumber", (req, res) => {
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
router.post("/tables/getAvailableTables", (req, res) => {
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
        //check the tableAvailability on date
        var currentAvailability = table.availability[date];

        if(currentAvailability == undefined) {
          // added the new date to table
          table.availability[date] = { 
            five_six: true,
            six_seven: true, 
            seven_eight: true, 
            eight_nine: true, 
            nine_ten: true, 
            ten_eleven: true,
            eleven_twelve: true
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

// update tables availability when booking/canceling them
router.post("/tables/updateTablesAvailability", (req, res) => {
  let tableData = req.body
  let tableList = [String];
  tableList = tableData.tables
  var date = tableData.date
  var time = tableData.time
  var updateAvailability = tableData.updateAvailability;

  tableList.forEach(item => {
    Table.findOne({ tableNo: item } ,(error, table) => {
      if (error) { console.log(error) }
      else if (!table) { console.log(`no table with number: ${item}`) } 
      else {
        var tableAvailability = table.availability[date]
        tableAvailability[time] = updateAvailability
        table.availability[date] = tableAvailability

        Table.findOneAndUpdate({ tableNo: table.tableNo }, table, (error, table) => {
          if (error) { console.log(error) }
          else {
            console.log(`table: ${table.tableNo} was booked`)
          }
        })
      }
    })
  })

  res.status(200).send({success: true, message: "Tables booked"})
})

module.exports = router;
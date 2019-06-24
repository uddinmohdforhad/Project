const express = require('express')
const router = express.Router()

/* import Models */
const Table = require('../models/table')

router.post("/tables/add", (req, res) => {
  let tableData = req.body
  let table = new Table(tableData)

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


module.exports = router;
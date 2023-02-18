const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')
const consoleTable = require('console.table')

const PORT = process.env.PORT || 3001
const app = express()

//EXPRESS MIDDLEWARE 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// connection to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Armyusmc01",
    database: "Employee_Tracker"
  },
  console.log(`Connected to the Employee Tracker database.`)
  )


  module.exports = db
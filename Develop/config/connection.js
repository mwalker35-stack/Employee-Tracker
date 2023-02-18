const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3003
const app = express()

// connection to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Armyusmc01",
    database: "employee_tracker"
  },
  console.log(`Connected to the Employee Tracker database.`)
  )


  module.exports = db
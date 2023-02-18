const inquirer = require('inquirer');
const connection = require('./config/connection.js')
const fs = require("fs");
const path = require("path");
require('dotenv').config()
const cTable = require('console.table');
const express = require("express");


function askQuestions() {
    inquirer.prompt({
        type: "list",
        name: "userChoice",
        message: "select from the menu",
        choices: [
            "View employees",
            "View departments",
            "View roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update role",
            "Update manager",
            "Display employees by manager",
            "Delete an employee",
            "Delete a role",
            "Delete a department",
            "View utilized budget for a department",
            "Quit"
        ]
    }).then(answers => {
        let answer = answers.userChoice;
        switch (answer) {
            case "View employees":
                viewAllEmployees();
                break;
            case "View departments":
                viewAllDepartments();
                break;
        }

    })
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employee;',(err, data) => {
        if(err) console.log(err)
        console.table(data)
    })

}

function viewAllDepartments() {

}

askQuestions() 
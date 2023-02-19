const inquirer = require('inquirer');
const connection = require('./config/connection.js')
const consoleTable = require('console.table')
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
            case "View roles":
                viewAllRoles();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Update role":
                updateRole();
                break;
            case "Update Manager":
                updateManager();
                break;
            case "Display employees by manager":
                displayEmployeesByManager();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Delete a department":
                deleteDepartment();
                break;
            case "View utilized budget for a department":
                viewBudgetByDepartment();
                break;
            case "Quit":
                process.exit()
        }

    })
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employees;', (err, data) => {
        if (err) console.log(err)
        console.log("\n")
        console.table(data)
    })

}

function viewAllDepartments() {
    connection.query('SELECT * FROM department;', (err, data) => {
        if (err) console.log(err)
        console.log("\n")
        console.table(data)
        askQuestions()
    })

}

function viewAllRoles() {
    connection.query('SELECT * FROM roles;', (err, data) => {
        if (err) console.log(err)
        console.log("\n")
        console.table(data)
        askQuestions()
    })

}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'what is the new department name?'
            }
        ]).then((data) => {
            const sql = 'INSERT INTO department (department_name) VALUES (?)';
            const params = [data.department_name]
            connection.query(sql, params, (err, row) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("\n")
                    console.table(viewAllDepartments())
                    askQuestions()
                }
            })
        })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: `what is the employee's first name?`
            },
            {
                type: 'input',
                name: 'last_name',
                message: `what is the employee's last name?`
            },
            {
                type: 'input',
                name: 'role_id',
                message: `what is the employee's role id?`
            },
            {
                type: 'input',
                name: 'manager_id',
                message: `what is the employee's manager id?`
            }
        ]).then((data) => {
            const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
            if (data.manager_id === '') {
                data.manager_id = null
            }
            const params = [data.first_name, data.last_name, data.role_id, data.manager_id]
            connection.query(sql, params, (err, row) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("\n")
                    console.table(data)
                    askQuestions()
                }
            })
        })

}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'what is the title of the role?'
            }, {
                type: 'input',
                name: 'salary',
                message: 'what is the salary of the role?'
            }, {
                type: 'input',
                name: 'department_id',
                message: 'what is the department_id of the role?',                
            }
        ]).then((data) => {
            const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
            const params = [data.title, data.salary, data.department_id]
            connection.query(sql, params, (err, row) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("\n")
                    console.table(viewAllRoles())
                    askQuestions()
                }
            })
        })
}

const updateRole = () => {
    let employeeID = ''
    let roleID = ''
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'title',
                message: 'what is the title of the role?',
                choices:  roleChoices    
            },
        ]).then((data) => {
            const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
            const params = [data.title, data.salary, data.department_id]
            connection.query(sql, params, (err, row) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("\n")
                    console.table(viewAllRoles())
                    askQuestions()
                }
            })
        })
}

askQuestions() 
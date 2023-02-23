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
        //functions called after selection made
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

function viewAllDepartments() {
    const sql = 'SELECT * FROM department'
    connection.query(sql, (err, row) => {
        if (err) console.log(err)
        console.log("\n")
        console.table(row)
        askQuestions()
    })


}

function viewAllEmployees() {
    const sql = 'SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary FROM employees LEFT JOIN roles on employees.role_id = roles.id'
    connection.query(sql, (err, row) => {
        if (err) console.log(err)
        console.log("\n")
        console.table(row)
        askQuestions()
    })
    
    }



// function viewAllEmployees() {
//     connection.query('SELECT * FROM employees;', (err, data) => {
//         if (err) console.log(err)
//         console.log("\n")
//         console.table(data)
//         askQuestions()
//     })

// }

// function displayEmployeesByManager() {
//     connection.query('SELECT * FROM employee_tracker.employees WHERE manager_id = 2;', (err, data) => {
//         if (err) console.log(err)
//         console.log("\n")
//         console.table(data)
//         askQuestions()
//     })
// }

const displayEmployeesByManager = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_by_manager',
                message: 'what is the managers_id?'
            }
        ]).then((data) => {
            const sql = `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id FROM employees WHERE employees.manager_id= ${data.employee_by_manager}` 
            // const params = [data.manager_id]
            connection.query(sql, (err, row) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("\n")
                    console.table(row)
                    askQuestions()
                }
            })
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
                    console.table(row)
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
            const params = [data.department_id, data.title, data.salary]
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
    const sql = 'SELECT id, title FROM roles'
    connection.query(sql, (err, results) => {
        if(err){
            console.log(err)
        } else {
            let roleInfo = results
            const roleChoices = roleInfo.map(({id, title}) => (({
                name: title,
                value: id
            })))

            connection.query('select * FROM employees;',(err, data) => {
                if(err) console.log(err)
                let employeeInfo = data
                const employeeChoices = employeeInfo.map(({id, first_name, last_name}) => (({
                    name: `${first_name} ${last_name}`,
                    value: id
                })))

                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'role_title',
                        message: 'what is the title of the role?',
                        choices:  roleChoices    
                    },
                    {
                        type: 'list',
                        name: 'employee_name',
                        message: 'what is the name of the employee?',
                        choices:  employeeChoices     
                    }
                ]).then((data) => {
                    const sql = `UPDATE employees SET employees.role_id=${data.role_title} WHERE employees.id=${data.employee_name};`;
                    const params = [data.title, data.salary, data.department_id]
                    connection.query(sql, params, (err, row) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("\n")
                            console.table(row)
                            askQuestions()
                        }
                    })
                })
        
            })
        }
            })
           

}

const deleteEmployee = () => {
    let employeeId = ''
    const sql = 'SELECT id, first_name FROM employees'
    connection.query(sql, (err, results) => {
        if(err){
            console.log(err)
        } else {
            let employeeInfo = results
            const employeeChoices = employeeInfo.map(({id, first_name}) => (({
                name: first_name,
                value: id
            })))
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'select employee to delete',
                        choices: employeeChoices
                    },
                ]).then((data) => {
                    employeeId = data.employee
                    const sql = 'DELETE FROM employees WHERE id = ?'
                    connection.query(sql, [employeeId], (err, results) => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log("\n")
                            console.table(results)
                            askQuestions()
                        }
                    })
            })
        }
    })
}

const deleteRole = () => {
    let employeeId = ''
    const sql = 'SELECT id, title FROM roles'
    connection.query(sql, (err, results) => {
        if(err){
            console.log(err)
        } else {
            let roleInfo = results
            const roleChoices = roleInfo.map(({id, title}) => (({
                name: title,
                value: id
            })))
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'select a role to delete',
                        choices: roleChoices
                    },
                ]).then((data) => {
                    roleId = data.role
                    const sql = 'DELETE FROM roles WHERE id = ?'
                    connection.query(sql, [employeeId], (err, results) => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log("\n")
                            console.table(viewAllRoles())
                            askQuestions()
                        }
                    })
            })
        }
    })
}

const deleteDepartment = () => {
    let department = ''
    const sql = 'SELECT id, department_name FROM department'
    connection.query(sql, (err, results) => {
        if(err){
            console.log(err)
        } else {
            let departmentInfo = results
            const departmentChoices = departmentInfo.map(({id, department_name}) => (({
                name: department_name,
                value: id
            })))
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'select a department to delete',
                        choices: departmentChoices
                    },
                ]).then((data) => {
                    department = data.department
                    const sql = 'DELETE FROM department WHERE department_name= ?'
                    connection.query(sql, [departmentInfo], (err, results) => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log("\n")
                            console.table(viewAllDepartments())
                            askQuestions()
                        }
                    })
            })
        }
    })
}

askQuestions() 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MehmetMusabeyoglu1.',
    database: 'firm_db'
});


let departmentsList = [];
let managersList = [];
let rolesList = [];
let employeesList = [];
let startChoices = [
    "View all employees",
    "View all employees by department",
    "View all employees by manager",
    "Add employee",
    "Remove employee",
    "Update employee role",
    "Update employee manager",
    "View all roles",
    "Add role",
    "Remove role",
    "View all departments",
    "Add department",
    "Remove department",
    "Quit"
];


function department() {
    let sql = `SELECT firm_department.department_name FROM firm_department ORDER BY id ASC`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        let currentDepartments = result.map((element) => element.department_name)
        departmentsList.push(currentDepartments);
        console.log(departmentsList);
    });
}

function manager() {
    let sql = `SELECT firm_employee.id FROM firm_employee WHERE manager_id IS NULL ORDER BY id ASC `;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        let currentManagers = result.map((element) => element.id)
        managersList.push(currentManagers);
        console.log(managersList);
    });
}

function role() {
    let sql = `SELECT firm_role.title FROM firm_role ORDER BY id ASC`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        let currentRoles = result.map((element) => element.title)
        rolesList.push(currentRoles);
        console.log(rolesList);
    });
}

function employee() {
    let sql = `SELECT firm_employee.id FROM firm_employee ORDER BY id ASC`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        let currentEmployees = result.map((element) => element.id)
        employeesList.push(currentEmployees);
        console.log(employeesList);
    });
}


const startQuestion = [
    {
        type: "list",
        name: "start",
        message: "What would you like to do?", 
        choices: startChoices
    }
];

const addingEmployeeQuestions = [
    {
        type: "input",
        name: "addingEmployeeName",
        message: "What is the employee's name?" 
    }
    ,
    {
        type: "input",
        name: "addingEmployeeSurname",
        message: "What is the employee's surname?" 
    }
    ,
    {
        type: "list",
        name: "addingEmployeeRole",
        message: "What is this employee's role?",
        choices: rolesList
    }
    ,
    {
        type: "list",
        name: "addingEmployeeManager",
        message: "Who is the employee's manager? Select manager's ID!",
        choices: managersList
    }
];

const deletingEmployeeQuestions = [
    {
        type: "list",
        name: "deletingEmployee",
        message: "What is the employee's ID would you like to delete? Select employee's ID!",
        choices: employeesList
    }
];

const updatingEmployeeRoleQuestions = [
    {
        type: "list",
        name: "updatingEmployeeID",
        message: " Which employee's role do you want to update? Select employee's ID!",
        choices: employeesList
    }
    ,
    {
        type: "list",
        name: "updatingEmployeeRole",
        message: "Which role do you want to assign the selected employee?",
        choices: rolesList
    }
];

const updatingEmployeeManagerQuestions = [
    {
        type: "list",
        name: "updatingEmployeeID",
        message: "Which employee's manager do you want to update? Select employee's ID!",
        choices: employeesList
    }
    ,
    {
        type: "list",
        name: "updatingEmployeeManagerID",
        message: "Who is the employee's manager? Select manager's ID",
        choices: managersList
    }
];




function init() {
    department();
    manager();
    role();
    employee();
}

init();

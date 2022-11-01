const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable  = require('console.table');
const Manager = require('../../../5th-week/Challenges/Team-Profile-Generator/lib/Manager');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MehmetMusabeyoglu1.',
    database: 'firm_db'
});


let departmentsList = [];
let managersList = [];
// let rolesList = [];
// let employeesList = [];

// console.log(departmentsList);

function showDepartmentsList() {
    let sql = `SELECT firm_department.department_name FROM firm_department`;
    db.query(sql, (err,result) => {
        if(err){
            return console.log(err);
        }
        let currentDepartments = result.map((element) => element.department_name)
        departmentsList.push(currentDepartments);
        console.log(departmentsList);
    });
}

function showManagersList() {
    let sql = `SELECT firm_employee.id FROM firm_employee WHERE manager_id IS NULL`;
    db.query(sql, (err,result) => {
        if(err){
            return console.log(err);
        }
        let currentManagers = result.map((element) => element.id)
        managersList.push(currentManagers);
        console.log(managersList);
    });
}

function init(){
    showDepartmentsList();
    showManagersList();
}

init();

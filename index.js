const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable  = require('console.table');


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


function showDepartmentsList() {
    let sql = `SELECT firm_department.department_name AS department_name, firm_department.id AS id
    FROM firm_department ORDER BY id ASC`;
    db.query(sql, (err,result) => {
        if(err){
            return console.log(err);
        }
        let currentDepartmentsId = result.map((element) => element.id)
        let currentDepartments = result.map((element) => element.department_name)
        departmentsList.push(currentDepartments);
        // console.log(departmentsList);
       for(let i=0; i<currentDepartments.length; i++){
           console.table(`[${currentDepartmentsId[i]}:${currentDepartments[i]}]`);
        //    console.table(`{${currentDepartmentsId[i]}:${currentDepartments[i]}}`);
        }
    });
}

function showManagersList() {
    let sql = `SELECT firm_employee.first_name AS name, firm_employee.last_name AS surname, firm_employee.id AS id
    FROM firm_employee JOIN firm_role ON firm_employee.role_id=firm_role.id WHERE manager_id IS NULL ORDER BY id ASC `;
    db.query(sql, (err,result) => {
        if(err){
            return console.log(err);
        }
        let currentManagersId = result.map((element) => element.id)
        let currentManagers = result.map((element) => [element.name,element.surname])
        managersList.push(currentManagers);
        // console.log(managersList);
        for(let i=0; i<currentManagers.length; i++){
            console.table(`[${currentManagersId[i]}:${currentManagers[i]}]`);
         }
    });
}

function showRolesList() {
    let sql = `SELECT firm_role.title AS title, firm_role.id AS id  FROM firm_role
    JOIN firm_department ON firm_role.department_id=firm_department.id ORDER BY id ASC`;
    db.query(sql, (err,result) => {
        if(err){
            return console.log(err);
        }
        let currentRolesId = result.map((element) => element.id)
        let currentRoles = result.map((element) => element.title)
        rolesList.push(currentRoles);
        // console.log(rolesList);
        for(let i=0; i<currentRoles.length; i++){
            console.table(`[${currentRolesId[i]}:${currentRoles[i]}]`);
         }
    });
}

function showEmployeesList() {
    let sql = `SELECT firm_employee.first_name AS name, firm_employee.last_name AS surname, firm_employee.id AS id
    FROM firm_employee JOIN firm_role ON firm_employee.role_id=firm_role.id ORDER BY id ASC`;
    db.query(sql, (err,result) => {
        if(err){
            return console.log(err);
        }
        let currentEmployeesId = result.map((element) => element.id)
        let currentEmployees = result.map((element) => [element.name,element.surname])
       employeesList.push(currentEmployees);
        // console.log(employeesList);
        for(let i=0; i<currentEmployees.length; i++){
            console.table(`[${currentEmployeesId[i]}:${currentEmployees[i]}]`);
         }
    });
}

function init(){
    showDepartmentsList();
    showManagersList();
    showRolesList();
    showEmployeesList();
}

init();

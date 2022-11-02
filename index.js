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

const removingEmployeeQuestion = [
    {
        type: "list",
        name: "removingEmployee",
        message: "Which employee would you like to remove? Select employee's ID!",
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

const addingRoleQuestions = [
    {
        type: "input",
        name: "addingRoleName",
        message: "What is the name of the role?"
    }
    ,
    {
        type: "number",
        name: "addingRoleSalary",
        message: "What is the salary of the role?"
    }
    ,
    {
        type: "list",
        name: "addingRoleDepartment",
        message: "Which department does the role belong to?",
        choices: departmentsList
    }
];

const removingRoleQuestion = [
    {
        type: "list",
        name: "removingRole",
        message: "Which role would you like to remove?",
        choices: rolesList
    }
];

const addingDepartmentQuestion = [
    {
        type: "input",
        name: "addingDepartment",
        message: "What is the name of the department?"
    }
];

const removingDepartmentQuestion = [
    {
        type: "list",
        name: "removingDepartment",
        message: "Which department would you like to remove?",
        choices: departmentsList
    }
];


function viewEmployees() {
    let sql = `SELECT firm_employee.first_name, firm_employee.last_name, firm_role.title, firm_role.salary, firm_department.department_name, firm_employee.manager_id
    FROM firm_employee 
    INNER JOIN firm_role ON firm_employee.role_id = firm_role.id 
    INNER JOIN firm_department ON firm_role.department_id = firm_department.id`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.table(result);
    });
}


function viewEmployeesByDepartment() {
    let sql = `SELECT firm_employee.first_name, firm_employee.last_name, firm_role.title, firm_role.salary, firm_department.department_name, firm_employee.manager_id
    FROM firm_employee 
    INNER JOIN firm_role ON firm_employee.role_id = firm_role.id 
    INNER JOIN firm_department ON firm_role.department_id = firm_department.id
    GROUP BY firm_department.department_name`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.table(result);
    });
}


function viewEmployeesByManager() {
    let sql = `SELECT firm_employee.first_name, firm_employee.last_name, firm_role.title, firm_role.salary, firm_department.department_name, firm_employee.manager_id
    FROM firm_employee 
    INNER JOIN firm_role ON firm_employee.role_id = firm_role.id 
    INNER JOIN firm_department ON firm_role.department_id = firm_department.id
    WHERE firm_employee.manager_id IS NOT NULL`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.table(result);
    });
}


function addEmployee() {
    inquirer
        .prompt(addingEmployeeQuestions)
        .then((response) => {
            let addingEmployeeName = response.addingEmployeeName;
            let addingEmployeeSurname = response.addingEmployeeSurname;
            let addingEmployeeRole = response.employeeRole;
            let addingEmployeeManager = response.addingEmployeeManager;
            if (!addingEmployeeManager) {
                addingEmployeeManager = null;
            }
            db.query(`SELECT firm_role.id FROM firm_role WHERE firm_role.title = ?;`, `${addingEmployeeRole}`, (err, result) => {
                if (err) {
                    return console.log(err);
                }
                let selectedRole = result[0];
                selectedRole = selectedRole[0].id;

                db.query(`INSERT INTO firm_employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [addingEmployeeName, addingEmployeeSurname, selectedRole, addingEmployeeManager], (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Employee added successfully.");
                    employee();
                });
            });

        });

    // Next step
}


function removeEmployee() {
    inquirer
        .prompt(removingEmployeeQuestion)
        .then((response) => {
            let removingEmployee = response.removingEmployee;
            db.query(`DELETE FROM firm_employee WHERE firm_employee.id = ?;`, [removingEmployee], (err, result) => {
                if (err) {
                    return console.log(err);
                }
                managersList = managersList.filter(element => element !== removingEmployee);
                employeesList = employeesList.filter(element => element !== removingEmployee);
                console.log("Employee removed successfully.");
            });
        });

    // Next step
}


function updateEmployeeRole() {
    inquirer
        .prompt(updatingEmployeeRoleQuestions)
        .then((response) => {
            let updatingEmployeeID = response.updatingEmployeeID;
            let updatingEmployeeRole = response.updatingEmployeeRole;
            db.query(`SELECT firm_role.id FROM firm_role WHERE firm_role.title = ?;`, [updatingEmployeeRole], (err, result) => {
                if (err) {
                    return console.log(err);
                }
                let selectedRole = result[0];
                selectedRole = selectedRole[0].id;
                db.query(`UPDATE firm_employee SET role_id = ? WHERE firm_employee.id = ?;`, [selectedRole, updatingEmployeeID], (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Employee role updated successfully.");
                });
            });
        });
}


function updateEmployeeManager() {
    inquirer
        .prompt(updatingEmployeeManagerQuestions)
        .then((response) => {
            let updatingEmployeeID = response.updatingEmployeeID;
            let updatingEmployeeManagerID = response.updatingEmployeeManagerID;
            db.query(`UPDATE firm_employee SET manager_id = ? WHERE firm_employee.id = ?`, [updatingEmployeeManagerID, updatingEmployeeID], (err, result) => {
                if (err) {
                    return console.log(err);
                }
                console.log("Employee manager updated successfully.");
                manager();
            });
        });
}


function viewRoles() {
    let sql = `SELECT * FROM firm_role`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.table(result);
    });
}


function addRole() {
    inquirer
        .prompt(addingRoleQuestions)
        .then((response) => {
            let addingRoleName = response.addingRoleName;
            let addingRoleSalary = response.addingRoleSalary;
            let addingRoleDepartment = response.addingRoleDepartment;
            db.query(`SELECT firm_department.id FROM firm_department WHERE firm_department.department_name = ?;`, `${addingRoleDepartment}`, (err, result) => {
                if (err) {
                    return console.log(err);
                }
                let selectedDepartment = result[0];
                selectedDepartment = selectedDepartment[0].id;
                db.query(`INSERT INTO firm_role(title, salary, department_id) VALUES (?, ?, ?);`, [addingRoleName, addingRoleSalary, selectedDepartment], (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    rolesList.push(addingRoleName);
                    console.log("Role added successfully.");
                });
            });
            // Next step
        });
}


function removeRole() {
    inquirer
        .prompt(removingRoleQuestion)
        .then((response) => {
            let removingRole = response.removingRole;
            db.query(`SELECT firm_role.id FROM firm_role WHERE firm_role.title = ?;`, [removingRole], (err, result) => {
                if (err) {
                    return console.log(err);
                }
                let currentRole = result[0];
                currentRole = currentRole[0].id;
                db.query(`DELETE FROM firm_role WHERE firm_role.id = ?;`, [currentRole], (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    rolesList = rolesList.filter(element => element !== removingRole);
                    console.log("Role removed successfully.");
                });
            });
            // Next step
        });
}


function viewDepartments() {
    let sql = `Select * from firm_department`;
    db.query(sql, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.table(result);
    });

    // Next step?
}


function addDepartment() {
    inquirer
        .prompt(addingDepartmentQuestion)
        .then((response) => {
            let addingDepartment = response.addingDepartment;
            db.query(`INSERT INTO firm_department(department_name) VALUES (?);`, [addingDepartment], (err, result) => {
                if (err) {
                    return console.log(err);
                }
                departmentsList.push(addingDepartment);
                console.log("Department added successfully.");
            });
            // Next step
        });
}


function removeDepartment() {
    inquirer
        .prompt(removingDepartmentQuestion)
        .then((response) => {
            let removingDepartment = response.removingDepartment;
            db.query(`SELECT firm_department.id FROM firm_department WHERE firm_department.department_name = ?;`, [removingDepartment], (err, result) => {
                if (err) {
                    return console.log(err);
                }
                let currentDepartment = result[0];
                currentDepartment = currentDepartment[0].id;
                db.query(`DELETE FROM firm_department WHERE firm_department.id = ?;`, [currentDepartment], (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    departmentsList  = departmentsList.filter(element => element !== removingDepartment);
                    console.log("Department removed successfully.");
                });
            });
            // Next step
        });
}


function init() {
    department();
    manager();
    role();
    employee();
}

init();

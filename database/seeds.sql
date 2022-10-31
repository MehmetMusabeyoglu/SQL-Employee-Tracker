INSERT INTO firm_department (department_name)
VALUES
    ("Engineering"),
    ("Finance"),
    ("Human Resources (HR)"),
    ("Legal"),
    ("Sales");


INSERT INTO firm_role (title, salary, department_id)
VALUES
    ("Software Engineer", 135000, 1),
    ("Lead Engineer", 175000, 1),
    ("Accountant", 110000, 2),
    ("Accounting Manager", 150000, 2),
    ("HR Analyst", 120000, 3),
    ("HR Director", 160000, 3),
    ("Lawyer", 160000, 4),
    ("Legal Team Lead", 200000, 4),
    ("Salesperson", 120000, 5),
    ("Sales Operations Manager", 160000, 5);
    

INSERT INTO firm_employee (first_name, last_name, role_id, manager_id)
VALUES
  


SELECT * FROM firm_department;
SELECT * FROM firm_role;
SELECT * FROM firm_employee;
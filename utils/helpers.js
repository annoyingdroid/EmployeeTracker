const db = require('../db/connection');
require('console.table');

//Employee Functions//
const getAllEmployees = async () => {
    const [employees] = await db.query(
        `SELECT * FROM employees JOIN roles ON employees.role_id = roles.id`
    );

    console.table(employees);
};

const getSingleEmployee = async (id) => {
    const [employee] = await db.query(
        `SELECT * FROM employees JOIN roles ON employees.role_id = roles.id WHERE employees.role_id = ` + id + `` 
    );
    console.table(employee);
};

const addEmployee = async (fName, lName, role_id, manager_id) => {
    const [employee] = await db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (` + fName + `,` + lName + `,` + role_id + `,` + manager_id + `)` 
    );

    console.table(employee);
};

function updateEmployee() {

};

function deleteEmployee() {

};
//-----------------//

//Role Functions//
const getAllRoles = async () => {
    const [roles] = await db.query(
        `SELECT * FROM roles`
    );
    
    console.table(roles);
};

const addRole = async (title, salary, department_id) => {
    const [roles] = await db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (` + title + `,` + salary + `,` + department_id + `)` 
    );
    
    console.table(roles);
};

function updateRole() {

};

function deleteRole() {

};
//--------------//

//Department Functions//
const getAllDepartments = async () => {
    const [departments] = await db.query(
        `SELECT * FROM departments`
    );
    
    console.table(departments);
};

const addDepartment = async (name) => {
    const [departments] = await db.query(
        `INSERT INTO departments (name) VALUES (` + name + `)` 
    );
    
    console.table(roles);
};

function deleteDepartment() {

};
//--------------------//

module.exports = {
    getAllDepartments, 
    getAllEmployees,
    getAllRoles,
    getSingleEmployee,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee,
    updateRole,
    deleteDepartment,
    deleteEmployee,
    deleteRole
}
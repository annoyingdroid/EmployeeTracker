const inquirer = require('inquirer');
const helpers = require('./utils/helpers');
const logo = require('asciiart-logo');
require('console.table');

const ascii = logo({
    name: 'Employee Tracker',
    font: '',
    lineChars: 10,
    padding: 1,
    borderColor: 'red',
    logoColor: 'white'
})

const mainMenu = async () => {
    while(true){
        console.log(ascii.render());

        return await inquirer.prompt ([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: [
                    'View All Roles', 
                    'View All Departments', 
                    'View All Employees', 
                    'Add Employee', 
                    'Add Role', 
                    'Add Department',
                    'Exit'
                ]
            }

        ]).then(choice => {
            switch(choice.options) {
                case 'View All Roles': helpers.getAllRoles(); mainMenu(); break;
                case 'View All Departments': helpers.getAllDepartments(); mainMenu(); break;
                case 'View All Employees': helpers.getAllEmployees(); mainMenu(); break;
                //case 'View Employees By Manager': addManager(); break;
                //case 'View Employees By Department': addManager(); break;
                case 'Add Employee': addEmployee(); break;
                //case 'Update Employee Role': addManager(); break;
                //case 'Update Employee Manager': addManager(); break;
                case 'Add Role': addRole(); break;
                case 'Add Department': addDepartment(); break;
                case 'Exit': break;
                default: break;
            }
        })
    }
}

const addEmployee = () => {

}

const addDepartment = () => {

}

const addRole = () => {
    const user_in = inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'Enter a role title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter a salary value'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter an associated department id'
        }
    ]),

        helpers.addRole(user_in.title, user_in.salary, user_in.department);
    
}

mainMenu();
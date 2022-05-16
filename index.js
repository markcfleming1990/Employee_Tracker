const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./db/connect')

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

afterConnection = () => {
  console.log("***********************************");
  console.log("*                                 *");
  console.log("*        EMPLOYEE MANAGER         *");
  console.log("*                                 *");
  console.log("***********************************");
  prompt();
};

function prompt() {
  inquirer
      .prompt({
          name: 'action',
          type: 'list',
          message: 'Welcome to our employee database! What would you like to do?',
          choices: [
                  'View all employees',
                  'View all departments',
                  'View all roles',
                  'Add an employee',
                  'Add a department',
                  'Add a role',
                  'Update employee role',
                  'Delete an employee',
                  'EXIT'
                  ]
          }).then(function (answer) {
              switch (answer.action) {
                  case 'View all employees':
                      viewEmployees();
                      break;
                  case 'View all departments':
                      viewDepartments();
                      break;
                  case 'View all roles':
                      viewRoles();
                      break;
                  case 'Add an employee':
                      addEmployee();
                      break;
                  case 'Add a department':
                      addDepartment();
                      break;
                  case 'Add a role':
                      addRole();
                      break;
                  case 'Update employee role':
                      updateRole();
                      break;
                  case 'Delete an employee':
                      deleteEmployee();
                      break;
                  case 'EXIT': 
                      exitApp();
                      break;
                  default:
                      break;
              }
      })
};

function viewEmployees() {
  var query = 'SELECT * FROM employee';
  connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.length + ' employees found!');
      console.table('All Employees:', res); 
      prompt();
  })
};

function viewDepartments() {
  var query = 'SELECT * FROM department';
  connection.query(query, function(err, res) {
      if(err)throw err;
      console.table('All Departments:', res);
      prompt();
  })
};

function viewRoles() {
  var query = 'SELECT * FROM roles';
  connection.query(query, function(err, res){
      if (err) throw err;
      console.table('All Roles:', res);
      prompt();
  })
};

function addEmployee() {
  connection.query('SELECT * FROM roles', function (err, res) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: 'first_name',
                  type: 'input', 
                  message: "What is the employee's fist name? ",
              },
              {
                  name: 'last_name',
                  type: 'input', 
                  message: "What is the employee's last name? "
              },
              {
                  name: 'manager_id',
                  type: 'input', 
                  message: "What is the employee's manager's ID? "
              },
              {
                  name: 'roles', 
                  type: 'list',
                  choices: function() {
                  var rolesArray = [];
                  for (let i = 0; i < res.length; i++) {
                      rolesArray.push(res[i].title);
                  }
                  return rolesArray;
                  },
                  message: "What is this employee's role? "
              }
              ]).then(function (answer) {
                  let roles_id;
                  for (let a = 0; a < res.length; a++) {
                      if (res[a].title == answer.role) {
                          roles_id = res[a].id;
                          console.log(roles_id)
                      }                  
                  }  
                  connection.query(
                  'INSERT INTO employee SET ?',
                  {
                      first_name: answer.first_name,
                      last_name: answer.last_name,
                      manager_id: answer.manager_id,
                      roles_id: roles_id,
                  },
                  function (err) {
                      if (err) throw err;
                      console.log('Your employee has been added!');
                      prompt();
                  })
              })
      })
};

function addDepartment() {
  inquirer
      .prompt([
          {
              name: 'department_name', 
              type: 'input', 
              message: 'Which department would you like to add?'
          }
          ]).then(function (answer) {
              connection.query(
                  'INSERT INTO department SET ?',
                  {
                      department_name: answer.department_name, 
                  });
              var query = 'SELECT * FROM department';
              connection.query(query, function(err, res) {
              if(err)throw err;
              console.log('Your department has been added!');
              console.table('All Departments:', res);
              prompt();
              })
          })
};

function addRole() {
    let department = [];
  connection.query('SELECT * FROM roles', function(answer) {
      if (err) throw err;
      for (let i = 0; i < answer.length; i++) {
          answer[i].first_name + "" + answer[i].last_name
          department.push({name: answer[i].name,})
      }
  
      inquirer 
      .prompt([
          {
              name: 'title',
              type: 'input', 
              message: "What new role would you like to add?"
          },
          {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of this role? (Enter a number)'
          },
          {
              name: 'department_name',
              type: 'list',
              message: "Which Department?",
              choices: department
              }
    
      ]).then(function (answer) {
          console.log(answer);
  
          connection.query(
              'INSERT INTO roles SET ?',
              {
                  title: answer.title,
                  salary: answer.salary,
                  department_id:answer.department
              },
              function (err, res) {
                  if(err)throw err;
                  console.log('Your new role has been added!');
                  console.table('All Roles:', res);
                  prompt();
              })
      })
  })
};

// update a role in the database
function updateRole() {
}

//  delete an employee
function deleteEmployee() {
    
}

// exit the app
function exitApp() {
  connection.end();
};
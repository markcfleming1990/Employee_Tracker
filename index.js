const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTablet = require("console.table");

//DB connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "goat",
  database: "company",
});

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
  promptUser();
};

//inquirer prompt main menu
const promptUser = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "Please select an option:",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "View All Employees By Department",
          "View Department Budgets",
          "Update Employee Role",
          "Update Employee Manager",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Remove Employee",
          "Remove Role",
          "Remove Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Employees") {
        viewAllEmployees();
      }

      if (choices === "View All Departments") {
        viewAllDepartments();
      }

      if (choices === "View All Employees By Department") {
        viewEmployeesByDepartment();
      }

      if (choices === "Add Employee") {
        addEmployee();
      }

      if (choices === "Remove Employee") {
        removeEmployee();
      }

      if (choices === "Update Employee Role") {
        updateEmployeeRole();
      }

      if (choices === "Update Employee Manager") {
        updateEmployeeManager();
      }

      if (choices === "View All Roles") {
        viewAllRoles();
      }

      if (choices === "Add Role") {
        addRole();
      }

      if (choices === "Remove Role") {
        removeRole();
      }

      if (choices === "Add Department") {
        addDepartment();
      }

      if (choices === "View Department Budgets") {
        viewDepartmentBudget();
      }

      if (choices === "Remove Department") {
        removeDepartment();
      }

      if (choices === "Exit") {
        connection.end();
      }
    });
};

//show all employees
const viewAllEmployees = () => {
  let sql = `SELECT employee.id,
   first_name, 
   last_name,
   roles_id,
   manager_id
    FROM
  employee`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`Current Employees`);
    console.table(response);
  });
};

//show all roles
const viewAllRoles = () => {
  let sql = `SELECT roles.id,
   title, 
   salary,
   department_id
    FROM
  roles`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`Current Employee Roles`);
    console.table(response);
  });
};

//show all departments
const viewAllDepartments = () => {
  let sql = `SELECT department.id,
   department_name
    FROM
  department`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`Current Departments`);
    
  });
};

//show employees by Dept
const viewEmployeesByDepartment = () => {
  const sql = `SELECT first_name,
  last_name,
   department.department_name AS department
    FROM employee
    LEFT JOIN roles ON employee.roles_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`Current Employees sorted by department`);
    console.table(response);
    
  });
};


//add dept

// add rolesloyee

promptUser();

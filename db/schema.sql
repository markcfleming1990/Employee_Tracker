USE company_db;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;



CREATE TABLE department (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INTEGER,
  manager_id INTEGER
);





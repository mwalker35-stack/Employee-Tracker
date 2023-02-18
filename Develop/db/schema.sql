DROP DATABASE IF EXISTS Employee_Tracker;
CREATE DATABASE Employee_Tracker;

USE Employee_Tracker;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(30) NOT NULL,
  salary INT,
  department_id INT,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES role(id),
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id),
    ON DELETE SET NULL
);
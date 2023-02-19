INSERT INTO department (department_name)
VALUES ("claims (1)"),
       ("sales (2)");



INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 109000, 1),
       ("adjuster", 60000, 1),
       ("customerservice", 50000, 2),
       ("underwriter", 70000, 2), 
       ("manager", 109000, 2);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("James", "Smith", 2, NULL),
       ("Marc", "Brown", 3, 1),
       ("Steve", "Rivers", 4, 1),
       ("Mike", "Paul", 5, 2);

      

       


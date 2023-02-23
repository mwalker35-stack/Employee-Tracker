INSERT INTO department (department_name)
VALUES ("claims"),
       ("Bodily Injury"),
       ("Accounting"),
       ("SIU"),
       ("sales");



INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 109000, 2),
       ("adjuster", 60000, 1),
       ("customerservice", 50000, 2),
       ("underwriter", 70000, 5), 
       ("manager", 109000, 1);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
       ("James", "Smith", 2, 2),
       ("Marc", "Brown", 3, 1),
       ("Steve", "Rivers", 4, 1),
       ("Mike", "Paul", 5, 2);

      

       


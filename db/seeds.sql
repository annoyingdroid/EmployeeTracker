INSERT INTO departments
(name) 
VALUES 
('Finance'),
('Information Technology'),
('Administrative'),
('Security');

INSERT INTO roles
(title, salary, department_id)
VALUES
('Accountant', 40000.00, 1),
('Financial Analyst', 75000.00, 1),
('Developer', 75000.00, 2),
('Software Architect', 150000.00, 2),
('CEO', 200000.00, 3),
('Secretary', 50000.00, 3),
('Security Officer', 50000.0, 4),
('Head of Security', 75000.0, 4);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Daniel','Taft', 2, null), 
('Alissa','DeMarco', 8, null),
('Joe','Doe', 4, null),
('Rachael','Sizemore', 5, null),
('Nicole','Hamby', 1, 1),
('Andrew','McMaster', 6, 4),
('Thomas','Anderson', 7, 2),
('Tammy','Wynett', 7, 2),
('Lucy','Smith', 3, 3);

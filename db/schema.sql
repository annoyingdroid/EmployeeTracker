CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    CONSTRAINT department_id
        FOREIGN KEY (fk_department)
        REFERENCES departments(id)
        ON DELETE CASCADE
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    CONSTRAINT role_id
        FOREIGN KEY (fk_role)
        REFERENCES roles(id)
        ON DELETE CASCADE
    CONSTRAINT manager_id
        FOREIGN KEY (fk_manager)
        REFERENCES employees(id)
        ON DELETE SET NULL
);
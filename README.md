# PostgreSQL Auth & Course API Demo

This project is a backend API built with Node.js, Express, and PostgreSQL using Sequelize ORM. It demonstrates authentication, role-based access control (RBAC), and protected resource access, following a modular folder-based architecture.

## Key Features

* JWT-based authentication and middleware for token validation
* Role-based access control for admin, instructor, and user roles
* Protected course CRUD operations
* Public access to GET endpoints
* POST, PUT, and DELETE restricted to admin or instructor
* Email verification and password reset using tokenized links
* Sequelize migrations and seeders for database schema and test data
* PostgreSQL connection using a scalable, folder-based project structure

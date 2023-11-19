# Presidio-Task
Welcome to the Employee Backend Server API
==========================================

Endpoints
---------

### GET api/v1/employees

Returns a list of all employees.

      [
        {
          "id": 1,
          "fullname": "John Doe",
          "age": 30,
          "dob": "01-01-90",
          "salary": "20000",
          "department": "Finance"
        },
        {
          "id": 2,
          "fullname": "Jane Doe",
          "age": 25,
          "dob": "01-01-95",
          "salary": "25000",
          "department": "HR"
        }
      ]

You can filter the results by using query parameters. For example, to get all employees named John Doe in the Finance department, use the following URL as the request URL for reference:

      http://localhost:3000/api/v1/employees?fullname=John%20Doe&department=Finance
      

### GET api/v1/employees/:id

Returns the employee with the given ID.

      {
        "fullname": "John Doe",
        "age": 30,
        "dob": "01-01-90",
        "salary": "20000",
        "department": "Finance"
      }
      

### POST api/v1/employees

Creates a new employee. The body of the request should be a JSON object with the following properties:

*   `fullname`: The full name of the employee.
*   `age`: The age of the employee.
*   `dob`: The date of birth of the employee, in the format DD-MM-YY.
*   `salary`: The salary of the employee and the salary should be higher than ₹10000.
*   `department`: The department of the employee and the departments are \["HR", "Sales", "Finance", "Engineer", "Others"\].

Here is an example of a valid JSON object:

        {
          "fullname": "John Doe",
          "age": 30,
          "dob": "01-01-90",
          "salary": "20000",
          "department": "Finance"
        }
        

### PUT api/v1/employees/:id

Updates the employee with the given ID. The body of the request should be a JSON object with the properties to be updated.

      {
        "message": "Employee updated successfully"
      }
      

### DELETE api/v1/employees/:id

Deletes the employee with the given ID.

      {
        "message": "Employee deleted successfully"
      }
      

### GET api/v1/employees/average-salary

Returns the average salary of all employees in the company.

      {
        "averageSalary": "25000"
      }
      

### GET api/v1/employees/average-salary/:department

The API supports the following departments:

*   HR
*   Sales
*   Finance
*   Engineer
*   Others

Returns the average salary of employees in the specified department.

      {
        "averageSalary": "30000"
      }
      

### Testing the API

We recommend using [Postman](https://www.postman.com/) to test the API. You can use it to send requests to the API and view the responses.

import Express from "express";

import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAverageSalaryByDepartment,
  getAverageSalaryInCompany,
} from "../controllers/employeeController.js";

const router = Express.Router();

// Route to get all employees and create a new employee
router.route("/").get(getAllEmployees).post(createEmployee);

// Route to get the average salary of all employees in the company
router.route("/average-salary").get(getAverageSalaryInCompany);

// Route to get, update, and delete an employee by their ID
router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

// Route to get the average salary of employees in a specific department
router.route("/average-salary/:department").get(getAverageSalaryByDepartment);

export default router;

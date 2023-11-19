import employeeSchema from "../schema/employeeSchema.js";

// This function retrieves all employees from the database
const getAllEmployees = async (req, res) => {
  try {
    const queryParameters = ["fullname", "age", "dob", "salary", "department"];
    let filter = {};

    queryParameters.forEach((param) => {
      if (req.query[param]) filter[param] = req.query[param];
    });

    const employees = await employeeSchema.find(filter);
    if (employees.length === 0)
      return res.status(404).json({ message: "No employees found" });
    if (!employees)
      return res.status(404).json({ message: "No employees found" });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This function retrieves a specific employee by their ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeSchema.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// This function creates a new employee in the database
const createEmployee = async (req, res) => {
  try {
    if (
      !req.body.fullname ||
      !req.body.age ||
      !req.body.dob ||
      !req.body.salary ||
      !req.body.department
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required field" });
    }
    const isExisting = await employeeSchema.findOne({
      fullname: req.body.fullname,
    });
    if (isExisting) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    await employeeSchema.create(req.body);
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// This function updates an existing employee's details in the database
const updateEmployee = async (req, res) => {
  try {
    if (
      !req.body.fullname ||
      !req.body.age ||
      !req.body.dob ||
      !req.body.salary ||
      !req.body.department
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required field" });
    }
    const employee = await employeeSchema.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employeeSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// This function deletes an existing employee from the database
const deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeSchema.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employeeSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// This function calculates the average salary of employees in a specific department
const getAverageSalaryByDepartment = async (req, res) => {
  try {
    const department = req.params.department;
    const data = await employeeSchema.aggregate([
      { $match: { department: department } },
      {
        $group: {
          _id: null,
          averageSalary: { $avg: "$salary" },
        },
      },
    ]);
    if (data.length === 0)
      return res.status(404).json({ message: "Department not found" });
    res.status(200).json({ averageSalary: data[0].averageSalary });
  } catch (error) {
    next(error);
  }
};

// This function calculates the average salary of all employees in the company
const getAverageSalaryInCompany = async (req, res) => {
  try {
    const data = await employeeSchema.aggregate([
      {
        $group: {
          _id: null,
          averageSalary: { $avg: "$salary" },
        },
      },
    ]);
    res.status(200).json({ averageSalary: data[0].averageSalary });
  } catch (error) {
    next(error);
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAverageSalaryByDepartment,
  getAverageSalaryInCompany,
};

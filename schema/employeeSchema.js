import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullname: {
      type: String,
      minlength: 3,
    },
    age: {
      type: Number,
      min: 18,
    },
    dob: {
      type: String,
      set: (value) => {
        const [day, month, year] = value.split("-");
        return `20${year}-${month}-${day}`;
      },
    },
    salary: {
      type: Number,
      min: 10000,
    },
    department: {
      type: String,
      enum: ["HR", "Sales", "Finance", "Engineer", "Others"],
    },
  },
  { timestamps: true }
);

const employeeSchema = mongoose.model("EmployeeDetails", User);

export default employeeSchema;

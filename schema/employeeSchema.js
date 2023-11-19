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
    dateOfBirth: {
      type: Date,
      default: Date.now,
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

User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const employeeSchema = mongoose.model("EmployeeDetails", User);

export default employeeSchema;

import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema: Schema<IEmployee> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: { type: String, trim: true },
    department: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  },
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;

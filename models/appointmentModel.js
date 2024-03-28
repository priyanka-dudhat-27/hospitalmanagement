const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_date:{
    type:String,
    required: true,
  },
  status:{
    type:String,
    required: true,
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

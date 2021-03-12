const mongoose = require("mongoose");
const Company = require('./Company')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    Employee_First_Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Employee_Last_Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Employee_National_Number: {
        type: Number,
        required: true
    },
    Employee_Gender: {
        type: String,
        trim: true,
        default: true
    },
    Employee_Manager: {
        type: Boolean,
        default: false
    },
    Employee_Birthday: {
        type: Date,
        default: Date.now
    },
    Employee_Company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
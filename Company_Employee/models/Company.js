const mongoose = require("mongoose");
const Employee = require("./Employee")
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    Company_Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Company_Number_Record: {
        type: Number,
        required: true
    },
    Company_City: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Company_State: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Company_Date_Record: {
        type: Date,
        default: Date.now
    },
    Company_Number: {
        type: String,
        default: "09000000000",
        length: 11
    },
    Company_Manager: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: "6048e336aaaed43380648592"

    }

});

module.exports = mongoose.model('Company', CompanySchema);
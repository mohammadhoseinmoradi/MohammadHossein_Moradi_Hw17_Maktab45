const express = require('express');
const Employee_router = express.Router()
const mongoose = require('mongoose')
const Employee = require('../models/Employee')
const Company = require('../models/Company')
const Relation = require('../models/Relation_Company_Employee')
    // !--------------------------------------------------------------------------------------------------CREATE EMPLOYEE
Employee_router.put('/addEmployee', (req, res) => {
    console.log(req.body)
    Company.find({ _id: req.body.Employee_Company }, (err, Company_Selected) => {
        if (err) {
            return res.status(500).send("Something went wrong in add Employee \n!" + err);
        } else if (!Company_Selected) {
            return res.status(404).send("Something went wrong in add Employee \n!" + err);
        }
    })
    Employee.find({ Employee_Company: req.body.Employee_Company, Employee_Manager: true }, (err, Employee_Selected) => {
        if (err) {
            return res.status(500).send("Something went wrong in add Employee \n!" + err);
        } else if (Employee_Selected.length > 1) {
            return res.status(500).send("Something went wrong in add  \n!" + err);
        } else {
            const NEW_Employee = new Employee({
                _id: new mongoose.Types.ObjectId(),
                Employee_First_Name: req.body.Employee_First_Name,
                Employee_Last_Name: req.body.Employee_Last_Name,
                Employee_National_Number: req.body.Employee_National_Number,
                Employee_Gender: req.body.Employee_Gender,
                Employee_Manager: req.body.Employee_Manager,
                Employee_Birthday: req.body.Employee_Birthday,
                Employee_Company: req.body.Employee_Company
            })
            Company.findOneAndUpdate({
                _id: req.body.Employee_Company
            }, { $set: { Company_Manager: NEW_Employee._id } }, (err, employee_Update) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.msg
                });

            })
            NEW_Employee.save((err, Employee_Data) => {
                if (err) return res.status(500).send("Something went wrong in add Employee \n!" + err);
                return res.json({
                    Employee_Data,
                    message: "Creat NEW Employee successfully"
                })
            })

        }
    })

})

// !--------------------------------------------------------------------------------------------------READ ALL EMPLOYEE
Employee_router.get('/allEmployee', (req, res) => {
    console.log("get is ok");
    Employee.find({}, (err, Employee_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
        res.json(Employee_All)
    })
})

// !--------------------------------------------------------------------------------------------------UPDATE EMPLOYEE
Employee_router.post("/updateEmployee/:id", (req, res) => {
    console.log(req.params.id);

    let Now_Manger = req.body.Employee_Manager
    Employee.find({ _id: req.params.id }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        Employee_update = employee;
        if (Now_Manger == employee[0].Employee_Manager) {
            Employee.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                Employee_First_Name: req.body.Employee_First_Name,
                Employee_Last_Name: req.body.Employee_Last_Name,
                Employee_National_Number: req.body.Employee_National_Number,
                Employee_Gender: req.body.Employee_Gender,
                Employee_Manager: req.body.Employee_Manager,
                Employee_Birthday: req.body.Employee_Number,
                Employee_Company: req.body.Employee_Company
            }, (err, employee_Update) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.msg
                });
                res.json(employee_Update);
            })
        } else if (NEW_Employee == true) {
            Employee.find({ "Employee_Company": employee[0].Employee_Company }, (err, employee) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.msg
                });
                Employee.updateMany({ "Employee_Company": req.body.Employee_Company }, { $set: { "Employee_Manager": false } }, (err, employee) => {
                    if (err) return res.status(500).json({
                        msg: "Server Error :)",
                        err: err.msg
                    });
                    Employee.findOneAndUpdate({
                        _id: req.params.id
                    }, req.body, {
                        Employee_First_Name: req.body.Employee_First_Name,
                        Employee_Last_Name: req.body.Employee_Last_Name,
                        Employee_National_Number: req.body.Employee_National_Number,
                        Employee_Gender: req.body.Employee_Gender,
                        Employee_Manager: req.body.Employee_Manager,
                        Employee_Birthday: req.body.Employee_Number,
                        Employee_Company: req.body.Employee_Company
                    }, (err, employee_Update) => {
                        if (err) return res.status(500).json({
                            msg: "Server Error :)",
                            err: err.msg
                        });
                        res.json(employee_Update);
                    })
                })
            })
        } else {
            Employee.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                Employee_First_Name: req.body.Employee_First_Name,
                Employee_Last_Name: req.body.Employee_Last_Name,
                Employee_National_Number: req.body.Employee_National_Number,
                Employee_Gender: req.body.Employee_Gender,
                Employee_Manager: req.body.Employee_Manager,
                Employee_Birthday: req.body.Employee_Number,
                Employee_Company: req.body.Employee_Company
            }, (err, employee_Update) => {
                if (err) return res.status(500).json({
                    msg: "Server Error :)",
                    err: err.msg
                });
                res.json(employee_Update);
            })
        }

    })






});
// !----------------------------------------------------------------------------------------------------------DELETE EMPLOYEE
Employee_router.delete("/deleteEmployee/:id", (req, res) => {
    Relation.deleteMany({ Employee: req.params.id }, (err, employee) => {
        if (err) return res.status(500).send("Something went wrong in delete Employee! \n" + err);
        if (!Employee) return res.status(404).send("Employee not found")

    })
    Employee.findOneAndDelete({ _id: req.params.id }, (err, Employee) => {
        console.log(Employee);
        if (err) return res.status(500).send("Something went wrong in delete Employee! \n" + err);
        if (!Employee) return res.status(404).send("Employee not found")
        return res.json({
            Employee,
            massage: " delete is ok"


        })
    })
});
// !---------------------------------------------------------------------------------------------------------FIND MANGER COMPANY
Employee_router.get('/FindManager/:id', (req, res) => {

        Employee.find({ Employee_Company: req.params.id, Employee_Manager: true }, (err, Employee_Manager) => {
            if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
            res.json(Employee_Manager)
        })
    })
    // !--------------------------------------------------------------------------------------------------------FIND AGE BETWEEN 20-30 
Employee_router.get('/FindAge', (req, res) => {
        let Age20 = new Date().getFullYear() - 30;
        let Age30 = new Date().getFullYear() - 20;
        console.log(Age20, Age30);
        Employee.find({ $and: [{ Employee_Birthday: { $gt: `${Age20}` } }, { Employee_Birthday: { $lt: `${Age30}` } }] }, (err, Employee_Age) => {
            if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
            res.json(Employee_Age)
        })
    })
    // !---------------------------------------------------------------------------------------------------------------FIND ALL MANGER
Employee_router.get("/AllManger", (req, res) => {
    Company.find({}, (err, company) => {
        if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
        Employee.find({ Employee_Manager: true }, { __v: 0 }).populate('Employee_Company', { Company_Name: 1 }).exec((err, employee) => {
            if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
            res.json(employee)
        })


    })

})
module.exports = Employee_router;
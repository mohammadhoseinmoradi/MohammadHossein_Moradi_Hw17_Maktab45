const express = require('express');
const Company_router = express.Router()
const Company = require('../models/Company')
const Employee = require('../models/Employee')
const url = require('url')

Company_router.get('/CompanyPage', (req, res) => {

        res.render('Company')

    })
    // !---------------------------------------------------------------------------------------CREATE Company
Company_router.post('/addCompany', (req, res) => {
    console.log(req.body.Company_Name)

    Company.find({ "Company_Name": req.body.Company_Name }, (err, company_exited) => {
        if (err) {
            return res.status(500).send("Something went wrong in add Company \n!" + err);
        }
        console.log(company_exited.length);
        if (company_exited.length > 0) {
            return res.status(500).send("Something went wrong in add  \n!" + err);
        }
        const NEW_COMPANY = new Company({
            Company_Name: req.body.Company_Name,
            Company_Number_Record: req.body.Company_Number_Record,
            Company_City: req.body.Company_City,
            Company_State: req.body.Company_State,
            Company_Date_Record: req.body.Company_Date_Record,
            Company_Number: req.body.Company_Number
        })
        console.log(NEW_COMPANY)
        NEW_COMPANY.save((err, Company_Data) => {
            if (err) return res.status(500).send("Something went wrong in add Company \n!" + err);
            return res.json({
                Company_Data,
                message: "Creat NEW Company successfully"
            })
        })


    })


})

// !-----------------------------------------------------------------------------------------READ COMPANY

Company_router.get('/allCompany', (req, res) => {

    console.log(req.params);
    Company.find({}, (err, Company_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uCompany! \n" + err);

        res.json(Company_All)
    })
})
Company_router.get('/CompanyInfo/:id', (req, res) => {
        Company.find({ _id: req.params.id }, (err, Company_All) => {
            if (err) return res.status(500).send("Something went wrong in get all uCompany! \n" + err);

            res.json(Company_All)
        })
    })
    // !--------------------------------------------------------------------------------------------UPDATE ONE COMPANY
Company_router.put("/updateCompany/:id", (req, res) => {

    Company.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        Company_Name: req.body.Company_Name,
        Company_Number_Record: req.body.Company_Number_Record,
        Company_City: req.body.Company_City,
        Company_State: req.body.Company_State,
        Company_Date_Record: req.body.Company_Date_Record,
        Company_Number: req.body.Company_Number
    }, (err, company) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(company);
    })



});

// !---------------------------------------------------------------------------------------------DELETE ONE COMPANY
Company_router.delete("/deleteCompany/:id", (req, res) => {
    console.log(req.params.id)
    Employee.deleteMany({ Employee_Company: req.params.id }, (err, Company) => {
        console.log(Company);
        if (err) return res.status(500).send("Something went wrong in delete Company! \n" + err);
        if (!Company) return res.status(404).send("Company not found")
    })
    Company.findOneAndDelete({ _id: req.params.id }, (err, Company) => {
        console.log(Company);
        if (err) return res.status(500).send("Something went wrong in delete Company! \n" + err);
        if (!Company) return res.status(404).send("Company not found")
        return res.json({
            Company,
            massage: " delete is ok"


        })
    })
});
// !----------------------------------------------------------------------------------------------FINDS EMPLOYEE OF COMPANY
Company_router.get("/findCompany/:id", (req, res) => {
        Employee.find({ Employee_Company: req.params.id }, { "Company_Manager": 0 }, (err, employee) => {
            if (err) return res.status(500).send("Something went wrong in delete Company! \n" + err);
            if (!employee) return res.status(404).send("Company not found")
            return res.json(employee)
        })
    })
    //!----------------------------------------------------------------------------------------------FIND DATE RECORD COMPANY'S RECENTLY ONE YEAR
Company_router.get("/DateRecordCompany/:id", (req, res) => {
    let Now_Date = new Date().getFullYear() - req.params.id;
    console.log(Now_Date);
    Company.find({ "Company_Date_Record": { $gt: `${Now_Date}` } }, { "Company_Manager": 0 }, (err, company) => {
        if (err) return res.status(500).send("Something went wrong in delete Company! \n" + err);
        if (!company) return res.status(404).send("CompNY not found")
        res.json(company)
    })

})
Company_router.get("/AllCompanyManager", (req, res) => {
    Employee.find({}, (err, company) => {
        if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
        Company.find({}).populate('Company_Manager').exec((err, employee) => {
            if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
            res.json(employee)
        })


    })
})
Company_router.post('/changeCity', (req, res) => {

    Company.updateMany({ "__v": 0 },
        req.body, {
            Company_City: req.body.Company_City,
            Company_State: req.body.Company_State,
        }, (err, company_changed) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)",
                err: err.msg
            });
            res.json(company_changed);
        })


});
Company_router.get('/search/:id', (req, res) => {
    let Date_arr = req.params.id.split("--")
    console.log(Date_arr);
    Company.find({ $and: [{ Company_Date_Record: { $gt: Date_arr[0] } }, { Company_Date_Record: { $lt: Date_arr[1] } }] }, (err, company) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(company);
    })
})

module.exports = Company_router;
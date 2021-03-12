$(function() {

    $.ajax({
        type: "GET",
        url: "/Company/allCompany",
        success: function(data) {
            console.log(data);
            Create_Table(data)
        },
        error: function(err) {
            console.log("error");
        }

    })

    function Create_Table(data) {
        let Table;
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            Table = `
                    <tr onclick="Select_Row('${data[i]._id}')" id="${data[i]._id}">
                        <td>
                           ${i}
                        </td>
                        <td>
                            ${data[i].Company_Name}
                        </td>
                        <td>
                            ${data[i].Company_Number_Record}
                        </td>
                        <td>
                            ${data[i].Company_City}
                        </td>
                        <td>
                            ${data[i].Company_State}
                        </td>
                        <td>
                            ${data[i].Company_Date_Record}
                        </td>
                        <td>
                            ${data[i].Company_Number}
                        </td>
                        <td>
                            <button style="background-color:rgb(207, 172, 74);border:3px solid black;border-radius:5px;"><a style="text-decoration: none;color:black" href="/Employee/EmployeeCompany/${data[i]._id}"> Employee's</a></button>
                        </td>
                    </tr>
              
            `
            $("tbody").append(Table)
        }
        let Date_Piker = `
        <label for="Date_Start"> DATE START:</label>
        <input type="date" name="Date_Start" id="Date_Start">
        <label for="End_Start"> DATE END:</label>
        <input type="date" name="End_Start" id="End_Start">
        <button onclick="btn_search()">Search</button>
        `
        $("#datePikerInfo").append(Date_Piker)
    }
    var counter = 3;
    $("#insertRow").on("click", function(event) {
        event.preventDefault();
        var newRow = $("<tr>");
        var cols = '';
        // Table columns
        cols += '<th scrope="row">' + counter + '</th>';
        cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="First name"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="lastname" placeholder="Last name"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="handle" placeholder="Handle"></td>';
        cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';
        // Insert the columns inside a row
        newRow.append(cols);
        // Insert the row inside a table
        $("table").append(newRow);
        // Increase counter after each row insertion
        counter++;
    });
    // Remove row when delete btn is clicked
    $("table").on("click", "#deleteRow", function(event) {
        $(this).closest("tr").remove();
        counter -= 1
    });


    // !--------------------------------------------------------------------------
    // !--------------------------------------------------------------------------



    $("body").on("click", "#Edit_Company", function() {
        let id = $(".id").attr("id");
        console.log(id);
        let Company_Name = $("#Name_Company").val()
        let Company_Number_Record = $("#Number_Record_Company").val()
        let Company_City = $("#City_Company").val()
        let Company_State = $("#State_Company").val()
        let Company_Date_Record = $('#birth').datepicker({ dateFormat: 'dd-mm-yy' }).val();

        let Company_Number = $("#Number_Company").val()
        console.log(Company_Name, Company_Number_Record, Company_City, Company_State, Company_Date_Record, Company_Number);
        let last = $("#last_Date_RECORD").val()
        if (Company_Date_Record) {
            $.ajax({
                type: "PUT",
                url: `/Company/updateCompany/${id}`,
                data: {
                    Company_Name: Company_Name,
                    Company_Number_Record: Company_Number_Record,
                    Company_City: Company_City,
                    Company_State: Company_State,
                    Company_Date_Record: Company_Date_Record,
                    Company_Number: Company_Number
                },
                success: function() {
                    window.location.replace(`/Company/CompanyPage`);

                },
                error: function() {
                    console.log("Error");
                }
            })

        } else {
            $.ajax({
                    type: "PUT",
                    url: `/Company/updateCompany/${id}`,
                    data: {
                        Company_Name: Company_Name,
                        Company_Number_Record: Company_Number_Record,
                        Company_City: Company_City,
                        Company_State: Company_State,
                        Company_Date_Record: last,
                        Company_Number: Company_Number
                    },
                    success: function() {
                        window.location.replace(`/Company/CompanyPage`);

                    },
                    error: function() {
                        console.log("Error");
                    }
                })
                // $.post(`/Company/updateCompany/${id}`, {
                //         Company_Name: Company_Name,
                //         Company_Number_Record: Company_Number_Record,
                //         Company_City: Company_City,
                //         Company_State: Company_State,
                //         Company_Date_Record: last,
                //         Company_Number: Company_Number
                //     },

            //     function(data, status) {
            //         window.location.replace(`/Company/CompanyPage`);
            //     });
        }

    })

    $("body").on("click", "#DELETE_Company", function() {
        let id = $(".id").attr("id");
        $.ajax({
            url: `/Company/deleteCompany/${id}`,
            type: 'DELETE',
            success: function(result) {
                window.location.replace(`/Company/CompanyPage`);
            }
        });
    })
    $("body").on("click", "#Submit_Company", function() {
        let Company_Name = $("#New_Name_Company").val()
        let Company_Number_Record = $("#New_Number_Record_Company").val()
        let Company_City = $("#New_City_Company").val()
        let Company_State = $("#New_State_Company").val()
        let Company_Date_Record = $('#birth').datepicker({ dateFormat: 'dd-mm-yy' }).val();
        let Company_Number = $("#New_Number_Company").val()
        console.log(Company_Date_Record);
        console.log(Company_Name, Company_Number_Record, Company_City, Company_State, Company_Date_Record, Company_Number);
        $.ajax({
                url: '/Company/addCompany',
                method: 'POST',
                data: {
                    Company_Name: Company_Name,
                    Company_Number_Record: Company_Number_Record,
                    Company_City: Company_City,
                    Company_State: Company_State,
                    Company_Date_Record: Company_Date_Record,
                    Company_Number: Company_Number
                }
            })
            .then(function() {
                window.location.replace(`/Company/CompanyPage`);
            });

    })

    // todo--------------------------------------------------------------------------
    // todo--------------------------------------------------------------------------



});

function Btn_modal() {
    document.getElementById('id01').style.display = 'none';
}

function Fade_modal() {
    document.getElementById('id01').style.display = 'block';
    $("#Company_Info").html("");
    let Set_Info = `
    <div class="id">
    <label style="margin-top: 25px;margin-button:-5px;font-wight:bold"  for="Name">Name</label>
    <input style="width: 100% ;   ;border:1px solid black ;background-color:goldenrod" id="New_Name_Company" type="text" placeholder="Company_Name" />
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Number_Record">Number_Record</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_Number_Record_Company" type="number" placeholder="Company_Number_Record">
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="City">City</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_City_Company" type="text" placeholder="Company_City">
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="State">State</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_State_Company" type="text" placeholder="Company_State">
    <label for="birth"> DATE START:</label>
    <input type="date" name="birth" id="birth">
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Number">Number</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_Number_Company" type="number" placeholder="Company_Number">
    </div>
    <div style="margin-top: 15px; display: flex ;justify-content:space-between">
    <button id="Submit_Company" >Submit</button>
    </div>#
    `

    $("#Company_Info").append(Set_Info);
}

function Select_Row(event) {
    let id = event;
    console.log(id);
    $(`tr`).css("background-color", "rgb(213, 219, 224)");
    $(`#${id}`).css("background-color", "goldenrod");
    console.log(id);
    // ---------------------------------------------------
    let Company_Info;
    let requestHttp = new XMLHttpRequest();
    requestHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            Company_Info = JSON.parse(this.response);

            set_info(Company_Info)
        } else if (this.readyState == 4 && this.status == 400) {
            console.log(010101);
        }
    };
    requestHttp.open("GET", `/Company/CompanyInfo/${id}`);
    requestHttp.send();


    function set_info(Company_Info) {
        let id = Company_Info[0]._id;
        $("#Company_Info").html("");
        let Set_Info = `
    <div class="id" id="${Company_Info[0]._id}">
    <label style="margin-top: 25px;margin-button:-5px;font-wight:bold"  for="Name">Name</label>
    <input style="width: 100% ;   ;border:1px solid black ;background-color:goldenrod" id="Name_Company" type="text" value="${Company_Info[0].Company_Name}" />
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Number_Record">Number_Record</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="Number_Record_Company" type="number" value="${Company_Info[0].Company_Number_Record}">
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="City">City</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="City_Company" type="text" value="${Company_Info[0].Company_City}">
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="State">State</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="State_Company" type="text" value="${Company_Info[0].Company_State}">
    <label for="rb4">last Date RECORD</label>
    <input id="last_Date_RECORD" style="width:90px;border:1px solid black;background-color:goldenrod" type="text" value="${Company_Info[0].Company_Date_Record}" readonly />
    <label for="birth"> DATE RECORD:</label>
            <input type="date" name="birth" id="birth">
    <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Number">Number</label>
    <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="Number_Company" type="number" value="${Company_Info[0].Company_Number}">
    </div>
    <div style="margin-top: 15px; display: flex ;justify-content:space-between">
    <button id="Edit_Company" >Edit</button>
    <button id="DELETE_Company" >DELETE</button>
    </div>#
    `

        $("#Company_Info").append(Set_Info);
        document.getElementById('id01').style.display = 'none';
        document.getElementById('id01').style.display = 'block';
    }


}

function btn_search() {
    let Start = $('#Date_Start').datepicker({ dateFormat: 'dd-mm-yy' }).val();
    let End = $('#End_Start').datepicker({ dateFormat: 'dd-mm-yy' }).val();
    console.log(Start, End);
    $.ajax({
        type: "GET",
        url: `/Company/search/${Start}--${End}`,
        success: function(data) {
            console.log(data);
            Create_Table(data)
        },
        error: function(err) {
            console.log("error");
        }

    })

    function Create_Table(data) {
        let Table;
        $("tbody").html("")
        $("#datePikerInfo").html("")
        $('#Date_Start').datepicker({ dateFormat: 'dd-mm-yy' }).val("");
        $('#End_Start').datepicker({ dateFormat: 'dd-mm-yy' }).val("");
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            Table = `
                    <tr onclick="Select_Row('${data[i]._id}')" id="${data[i]._id}">
                        <td>
                           ${i}
                        </td>
                        <td>
                            ${data[i].Company_Name}
                        </td>
                        <td>
                            ${data[i].Company_Number_Record}
                        </td>
                        <td>
                            ${data[i].Company_City}
                        </td>
                        <td>
                            ${data[i].Company_State}
                        </td>
                        <td>
                            ${data[i].Company_Date_Record}
                        </td>
                        <td>
                            ${data[i].Company_Number}
                        </td>
                        <td>
                            <button style="background-color:rgb(207, 172, 74);border:3px solid black;border-radius:5px;"><a style="text-decoration: none;color:black" href="/Employee/EmployeeCompany/${data[i]._id}"> Employee's</a></button>
                        </td>
                    </tr>
              
            `
            $("tbody").append(Table)
        }
        let Date_Piker = `
        <label for="Date_Start"> DATE START:</label>
        <input type="date" name="Date_Start" id="Date_Start">
        <label for="End_Start"> DATE END:</label>
        <input type="date" name="End_Start" id="End_Start">
        <button onclick="btn_search()">Search</button>
        `
        $("#datePikerInfo").append(Date_Piker)
    }
}
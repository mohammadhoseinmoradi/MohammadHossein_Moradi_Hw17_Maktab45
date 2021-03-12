$(function() {
    // INITIALIZE DATEPICKER PLUGIN

    // Start counting from the third row
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
});

function Btn_modal() {
    document.getElementById('id01').style.display = 'none';
}

function Fade_modal(event) {
    let id = event;
    console.log(id);
    document.getElementById('id01').style.display = 'block';
    $("#Employee_Info").html("");
    let Set_Info = `
        <div class="id">
        <label style="margin-top: 25px;margin-button:-5px;font-wight:bold"  for="First_Name">First_Name</label>
        <input style="width: 100% ;   ;border:1px solid black ;background-color:goldenrod" id="New_First_Name_Employee" type="text" placeholder="Employee_Name" />
        <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Last_Name">Last_Name</label>
        <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_Last_Name_Employee" type="text" placeholder="Employee_Last_Name">
        <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="National_Number">National_Number</label>
        <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_National_Number_Employee" type="number" placeholder="Employee_National_Number">
        <label style="margin-top: 10px;margin-button:-5px;font-wight:bold;border:1px solid black;background-color:goldenrod" for="Gender">Gender</label>
        <label for="rb1">male</label>
        <input style="width:20px;border:1px solid black;background-color:goldenrod" type="radio" name="rb" id="rb1" />
        <label for="rb2">female</label>
        <input style="border-radius:10px;width:20px;border:3px solid black" type="radio" name="rb" id="rb2" />
        <br>
        <label style="margin-top:10px;margin-button:-5px;font-wight:bold;border:1px solid black;background-color:goldenrod" for="Manger">Manger</label>
        <label for="rb3">true</label>
        <input style=" width:20px; border:1px solid black;background-color:goldenrod" type="radio" name="rb1" id="rb3" />
        <label for="rb4">false</label>
        <input style="width:20px;border:1px solid black;background-color:goldenrod" type="radio" name="rb1" id="rb4" />
        <br>
        <label for="dateofbirth"> Birthday:</label>
        <input type="date" name="dateofbirth" id="dateofbirth">
        </div>
        <div style="margin-top: 15px; display: flex ;justify-content:space-between">
        <button class="Submit_Employee" id="${id}" >Submit</button>
        </div>#
        `

    $("#Employee_Info").append(Set_Info);
}

function Select_Row(event) {
    let id = event;
    $(`tr`).css("background-color", "rgb(213, 219, 224)");
    $(`#${id}`).css("background-color", "goldenrod");
    console.log(id);
    // ---------------------------------------------------
    let Employee_Info;
    let requestHttp = new XMLHttpRequest();
    requestHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            Employee_Info = JSON.parse(this.response);

            set_info(Employee_Info)
        } else if (this.readyState == 4 && this.status == 400) {
            console.log(010101);
        }
    };
    requestHttp.open("GET", `/Employee/EmployeeInfo/${id}`);
    requestHttp.send();


    function set_info(Employee_Info) {
        let id = Employee_Info[0]._id;
        $("#Employee_Info").html("");
        let Set_Info = `
        <div class="id" id="${Employee_Info[0]._id}">
        <label style="margin-top: 25px;margin-button:-5px;font-wight:bold"  for="New_Employee_First_Name">First_Name</label>
        <input style="width: 100% ;   ;border:1px solid black ;background-color:goldenrod" id="New_First_Name"" type="text" value="${Employee_Info[0].Employee_First_Name}" >
        <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="New_Employee_Last_Name">Last_Name</label>
        <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_Employee_Last_Name" type="text" value="${Employee_Info[0].Employee_Last_Name}" >
        <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="New_Employee_National_Number">National_Number</label>
        <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_Employee_National_Number" type="number" value="${Employee_Info[0].Employee_National_Number}">
        <label style="margin-top: 10px;margin-button:-5px;font-wight:bold;border:1px solid black;background-color:goldenrod" for="Gender">Gender</label>
        <label for="rb1">male</label>
        <input style="width:20px;border:1px solid black;background-color:goldenrod" type="radio" name="rb" id="rb1" />
        <label for="rb2">female</label>
        <input style="border-radius:10px;width:20px;border:3px solid black" type="radio" name="rb" id="rb2" />
        <br>
        <label style="margin-top:10px;margin-button:-5px;font-wight:bold;border:1px solid black;background-color:goldenrod" for="Manger">Manger</label>
        <label for="rb3">true</label>
        <input style=" width:20px; border:1px solid black;background-color:goldenrod" type="radio" name="rb1" id="rb3" />
        <label for="rb4">false</label>
        <input style="width:20px;border:1px solid black;background-color:goldenrod" type="radio" name="rb1" id="rb4" />
        <br>
        <label for="rb4">last Date Birthday</label>
        <input id="last_Date_Birthday" style="width:90px;border:1px solid black;background-color:goldenrod" type="text" value="${Employee_Info[0].Employee_Birthday}" readonly />
       
        <label for="birth"> Birthday:</label>
        <input type="date" name="birth" id="birth">


        <div style="margin-top: 15px; display: flex ;justify-content:space-between">
        <button id="Edit_Employee" >Edit</button>
        <button class="Delete_Employee" id="${Employee_Info[0].Employee_Company}" >Delete</button>
        </div>#
        `

        $("#Employee_Info").append(Set_Info);
        document.getElementById('id01').style.display = 'none';
        document.getElementById('id01').style.display = 'block';
        console.log(Employee_Info[0].Employee_Manager, Employee_Info[0].Employee_Gender);
        if (Employee_Info[0].Employee_Manager == true) {
            $("#rb3").prop("checked", true);
        } else {
            $("#rb4").prop("checked", true);
        }
        if (Employee_Info[0].Employee_Gender == "Male") {
            $("#rb1").prop("checked", true);
        } else {
            $("#rb2").prop("checked", true);
        }

    }


}

$("body").on("click", "#Edit_Employee", function() {
    let id = $(".id").attr("id");
    console.log(id);
    let Employee_First_Name = $("#New_First_Name").val()
    let Employee_Last_Name = $("#New_Employee_Last_Name").val()
    let Employee_National_Number = $("#New_Employee_National_Number").val()
    let Select_Male = $("#rb1").prop("checked");
    let Select_Female = $("#rb2").prop("checked");
    let Select_Manager_true = $("#rb3").prop("checked");
    let Select_Manager_False = $("#rb4").prop("checked");
    let gender = "Male";
    if (Select_Male) {
        gender = "Male"
    } else if (Select_Female) {
        gender = "Female"
    }
    let Manager = false;
    if (Select_Manager_true) {
        Manager = true
    } else if (Select_Manager_False) {
        Manager = false
    }
    let date = $('#birth').datepicker({ dateFormat: 'dd-mm-yy' }).val();
    let last = $("#last_Date_Birthday").val()
    if (date) {
        $.ajax({
            type: 'PUT',
            url: `/Employee/updateEmployee/${id}`,
            data: {
                Employee_First_Name: Employee_First_Name,
                Employee_Last_Name: Employee_Last_Name,
                Employee_National_Number: Employee_National_Number,
                Employee_Gender: gender,
                Employee_Manager: Manager,
                Employee_Birthday: date
            },
            success: function(data_Info) {
                window.location.replace(`../EmployeeCompany/${data_Info.Employee_Company}`);
            },
            error: function() {
                console.log("Error");
            }
        })

    } else {
        $.ajax({
            type: 'PUT',
            url: `/Employee/updateEmployee/${id}`,
            data: {
                Employee_First_Name: Employee_First_Name,
                Employee_Last_Name: Employee_Last_Name,
                Employee_National_Number: Employee_National_Number,
                Employee_Gender: gender,
                Employee_Manager: Manager,
                Employee_Birthday: last
            },
            success: function(data_Info) {
                window.location.replace(`../EmployeeCompany/${data_Info.Employee_Company}`);
            },
            error: function() {
                console.log("Error");
            }
        })
    }
})

$("body").on("click", ".Delete_Employee", function() {
    let id_Company = $(".Delete_Employee").attr("id")
    let id = $(".id").attr("id");
    console.log(id, id_Company);
    $.ajax({
        url: `/Employee/deleteEmployee/${id}`,
        type: 'DELETE',
        success: function(result) {
            console.log(result);
            window.location.replace(`/Employee/EmployeeCompany/${id_Company}`);


        }
    });
})
$("body").on("click", ".Submit_Employee", function() {

    let Select_Male = $("#rb1").prop("checked");
    let Select_Female = $("#rb2").prop("checked");
    let Select_Manager_true = $("#rb3").prop("checked");
    let Select_Manager_False = $("#rb4").prop("checked");
    let gender = "Male";
    if (Select_Male) {
        gender = "Male"
    } else if (Select_Female) {
        gender = "Female"
    }
    let Manager = false;
    if (Select_Manager_true) {
        Manager = true
    } else if (Select_Manager_False) {
        Manager = false
    }
    let id = $(".Submit_Employee").attr("id")
    var date = $('#dateofbirth').datepicker({ dateFormat: 'dd-mm-yy' }).val();
    let Employee_First_Name = $("#New_First_Name_Employee").val()
    let Employee_Last_Name = $("#New_Last_Name_Employee").val()
    let Employee_National_Number = $("#New_National_Number_Employee").val()
    console.log(date, Select_Female, Select_Male, Select_Manager_true, Select_Manager_False, gender, Manager);
    console.log(id, Employee_First_Name, Employee_Last_Name, Employee_National_Number, date, gender, Manager);

    $.ajax({
            url: '/Employee/addEmployee',
            method: 'POST',
            data: {
                Employee_First_Name: Employee_First_Name,
                Employee_Last_Name: Employee_Last_Name,
                Employee_National_Number: Employee_National_Number,
                Employee_Gender: gender,
                Employee_Manager: Manager,
                Employee_Birthday: date,
                Employee_Company: id
            }
        })
        .then(function() {
            window.location.replace(`/Employee/EmployeeCompany/${id}`);

        });

})
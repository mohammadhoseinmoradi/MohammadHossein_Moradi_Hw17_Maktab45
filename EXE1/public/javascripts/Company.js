$(function() {

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
        <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Date_Record">Date_Record</label>
        <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="New_Date_Record_Company" type="text" placeholder="Company_Date_Record">
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
    requestHttp.open("GET", `${id}`);
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
        <label style="margin-top: 5px;margin-button:-5px;font-wight:bold" for="Date_Record">Date_Record</label>
        <input style="width: 100% ;  ;border:1px solid black;background-color:goldenrod" id="Date_Record_Company" type="text" value="${Company_Info[0].Company_Date_Record}">
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

$("body").on("click", "#Edit_Company", function() {
    let id = $(".id").attr("id");
    console.log(id);
    let Company_Name = $("#Name_Company").val()
    let Company_Number_Record = $("#Number_Record_Company").val()
    let Company_City = $("#City_Company").val()
    let Company_State = $("#State_Company").val()
    let Company_Date_Record = $("#Date_Record_Company").val()
    let Company_Number = $("#Number_Company").val()
    console.log(Company_Name, Company_Number_Record, Company_City, Company_State, Company_Date_Record, Company_Number);
    $.post(`/Company/updateCompany/${id}`, {
            Company_Name: Company_Name,
            Company_Number_Record: Company_Number_Record,
            Company_City: Company_City,
            Company_State: Company_State,
            Company_Date_Record: Company_Date_Record,
            Company_Number: Company_Number
        },
        function(data, status) {
            window.location.replace(`/Company/allCompany`);
        });
})

$("body").on("click", "#DELETE_Company", function() {
    let id = $(".id").attr("id");
    $.ajax({
        url: `/Company/deleteCompany/${id}`,
        type: 'DELETE',
        success: function(result) {
            window.location.replace(`/Company/allCompany`);
        }
    });
})
$("body").on("click", "#Submit_Company", function() {
    let Company_Name = $("#New_Name_Company").val()
    let Company_Number_Record = $("#New_Number_Record_Company").val()
    let Company_City = $("#New_City_Company").val()
    let Company_State = $("#New_State_Company").val()
    let Company_Date_Record = $("#New_Date_Record_Company").val()
    let Company_Number = $("#New_Number_Company").val()
    console.log(Company_Name, Company_Number_Record, Company_City, Company_State, Company_Date_Record, Company_Number);
    $.ajax({
            url: '/Company/addCompany',
            method: 'PUT',
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
            window.location.replace(`/Company/allCompany`);
        });

})
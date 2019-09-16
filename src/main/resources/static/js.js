let field;
let roleCheckBox = [];
let roleForAddCheck = [];

function changeNavTab() {
    $("#showUser").removeClass("active")
}

function openModal(id){
    $('table').on('click', function(){

        field = id;
        $.ajax({
            url: "/admin/edit/" + field,
            method: 'GET',
            async: false,
            success: function (data) {
                let i;
                let roleAdminExist;
                let roleUserExist;
                for(i = 0;  i < data.roles.length; i++ ) {
                    if(data.roles[i].name == 'ADMIN') {
                        $("#adminRole").prop("checked", true);
                        roleAdminExist = true;
                        functionAdminRole()
                    } else if (roleAdminExist != true) {
                        $("#adminRole").prop("checked", false);
                    };
                }
                for(i = 0;  i < data.roles.length; i++ ) {
                    if (data.roles[i].name == 'USER') {
                        $("#userRole").prop("checked", true);
                        roleUserExist = true;
                        functionUserRole()
                    } else if (roleUserExist != true) {
                        $("#userRole").prop("checked", false);
                    };
                }

                $("#loginEditIn").val(data.login);
                $("#nameEditIn").val(data.name);
                $("#idUser").val(data.id);
                $("#myModal").modal('show');
            },
        });
    });

}

function editUser(){
    let login =  $('#loginEditIn').val();
    let nameOfUser =  $('#nameEditIn').val();
    let password = $('#passEdit').val();

    if(password == "") {
        password = null;
    }
    let data = {
        'id': field,
        'login': login,
        'name': nameOfUser,
        'password': password,
        'roles': roleCheckBox
    };
    $.ajax({
        url: "/admin/edit",
        method: 'POST',
        async: false,
        data: JSON.stringify(data),
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType : 'application/json; charset=utf-8' ,
        dataType : 'json',
        cache: false,
        success: function (data) {
        },
        error: function (e) {
            $("#tabsList").load(" #tabsList > *");
            $("#showUser ").addClass("active");
            $("#home").addClass("active");
            $('#londonBut').addClass("active");
            $("#showUser").attr("aria-expanded", true);
            $("#adminLi").addClass("active");

        }
    });
}

function addUser(){
    let login = $('#addLogin').val();
    let name = $('#addName').val();
    let pass = $('#addPass').val();
    let data = {
        'login': login,
        'name': name,
        'password': pass,
        'roles': roleForAddCheck
    };

    $.ajax({
        url: "/admin/add",
        method: 'POST',
        async: false,
        data: JSON.stringify(data),
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType : 'application/json; charset=utf-8' ,
        dataType : 'json',
        cache: false,
        success: function (data) {
            roleForAddCheck = [];

        },
        error: function () {
            roleForAddCheck = [];
            $("#tabsList").load(" #tabsList > *");
            $("#adminLi").addClass("active");
            $("#addUserLi").removeClass("active");
        }

    });

}

jQuery('a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')

})
$(document).ready(function(){

jQuery('#parisBut').on('click', function(e) {
    $('#tabsList').children().removeClass("active")
})

    jQuery('#londonBut').on('click', function(e) {
        $('#home').addClass("active")

})
});

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function functionAdminRole() {
    if ($('#adminRole').prop("checked") == true){
        roleCheckBox.push({'id': 1, 'name': "ADMIN"});

    } else if(roleCheckBox.filter(data => (data.name == 'ADMIN'))) {
        roleCheckBox = roleCheckBox.filter(data => data.name != 'ADMIN');
    }
}

function functionUserRole() {
    if ($('#userRole').prop("checked") == true){
        roleCheckBox.push({'id': 2, 'name': "USER"});

    } else if(roleCheckBox.filter(data => (data.name == 'USER'))) {
        roleCheckBox  = roleCheckBox .filter(data => data.name != 'USER');
    }
}

function functionAddAdminRole() {
    if ($('#adminAddRole').prop("checked") == true){
        roleForAddCheck.push({'id': 1, 'name': "ADMIN"});

    } else if(roleForAddCheck .filter(data => (data.name == 'ADMIN'))) {
        roleForAddCheck  = roleForAddCheck.filter(data => data.name != 'ADMIN');
    }
}

function functionAddUserRole() {
    if ($('#userAddRole').prop("checked") == true){
        roleForAddCheck.push({'id': 2, 'name': "USER"});

    } else if(roleForAddCheck.filter(data => (data.name == 'USER'))) {
        roleForAddCheck = roleForAddCheck.filter(data => data.name != 'USER');
    }
}

function deletUser(idOfUser) {
    let data = {
        'id': idOfUser,
    };
    $.ajax({
        url: "/admin/delet",
        method: 'POST',
        async: false,
        data: JSON.stringify(data),
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        success: function (data) {
        },
        error(e) {
                        $("#tabsList").load(" #tabsList > *");
            $("#showUser ").addClass("active");
            $("#home").addClass("active");
            $('#londonBut').addClass("active");
            $("#showUser").attr("aria-expanded", true);
            $("#adminLi").addClass("active");
        }
    });

}
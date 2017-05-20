const apiKey = 'xv5Xy2wPvgPqJO3S4Sres4J68AUzWObR';
const rootUrl = 'https://api.mlab.com/api/1/databases/20170510taskmanager';

function gotoTasks() {
    document.location = 'index.html';
}

function gotoAddTask() {
    document.location = 'addtask.html';
}

function updateDateToNow(dateFieldSelector) {
    let now = new Date();
    var month = now.getMonth() + 1;
    if (month.toString().length < 2) {
        month = `0${month}`;
    }
    let val = `${now.getYear() + 1900}-${month}-${now.getDate()}`;
    $(dateFieldSelector).val(val);
}

function createTask() {
    let url = `${rootUrl}/collections/tasks?apiKey=${apiKey}`;
    var newTask = {
        name: $("#name").val(),
        due_date: $("#due_date").val(),
        urgent: $("#urgent").prop('checked'),
        category: $("#category").val()
    };
    $.ajax({
        contentType: 'application/json',
        method: 'POST',
        url: url,
        data: JSON.stringify(newTask),
        dataType: 'json',
        success: gotoTasks
    });
    return false;
}

function loadCategoryOptions() {
    let url = `${rootUrl}/collections/categories?apiKey=${apiKey}`;
    let callback = (data) => {
        console.log("Categories is", data);
        let sel = $("#category");
        $.each(data, (key, cat) => {
            sel.append($(`<option>${cat.category_name}</option>`));
        });
    };
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        success: callback
    });
}

function getTasks() {
    let url = `${rootUrl}/collections/tasks?apiKey=${apiKey}`;
    let callback = (data) => {
        console.log("Data is", data);
        let ul = $('<ul class="list-group">');
        $.each(data, (key, task) => {
            var li = `<li class="list-group-item">${task.name} <span class="due-on">${task.due_date}</span>`;
            if (task.urgent) {
                li += '<span class="label label-danger">Urgent</span>';
            }
            li += '<div class="pull-right"><a class="btn btn-primary" href="#">edit</a> <a class="btn btn-danger" href="#">delete</a></div>';
            li += '</li>';
            ul.append($(li));
        });
        $("#tasks").html(ul);
    };
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        // success: callback
    });
}

$(document).ready(function() {
    getTasks();
    loadCategoryOptions();
    $("#add-task").submit(function( event ) {
        event.preventDefault();
        createTask();
    });
    updateDateToNow("#due_date");
});

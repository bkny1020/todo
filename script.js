var rowIdKey = "row-id"
var saveButtonKey = "saveBtn"

function getRowIdTag(id) {
    return `planner-row-${id}`
}

function getPlannerRowDataKey(rowId) {
    return `planner-row-data-${rowId}`
}

function saveRowDataToLocalStorage() {
    var rowId = $(this).data(rowIdKey)
    var row = $(`#planner-row-${rowId} textarea`)

    if (row == null)
        console.log("row not found")

    var value = row.val()

    localStorage.setItem(getPlannerRowDataKey(rowId), value)
    console.log("successfully saved planner data")

}

// Bind the planner event handlers once the DOM has loaded
$(document).ready(function () {

    // Declaring variables
    var currentTime = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

    // moment.js variables
    var timeNow = moment().format('MMMM Do YYYY');
    var amPm = moment().format('a');
    var hours = moment().format('HH');
    var timedClass;
    var amOrPm = "";
    var prevIdValue = "";

    // Declaring the array of tasks to contain anything already in localStorage, or start with the array empty
    //var toDoArray2 = JSON.parse(localStorage.getItem(toDoArray2)) || [];

    // Adding the current Month Day, Year to the header
    $("#currentDay").text(timeNow);

    //for loop to iterate thru the currentTime array 
    for (i = 0; i < currentTime.length; i++) {

        var rowId = getRowIdTag(i)
        var timeLabelId = `time${i}`

        if (currentTime[i] < 12)
            amOrPm = " AM"
        else
            amOrPm = " PM"

        if (currentTime[i] < parseInt(hours))
            timedClass = "past";
    
        if (currentTime[i] == parseInt(hours))
            timedClass = "present";
    
        if (currentTime[i] > parseInt(hours))
            timedClass = "future";
    
        if (currentTime[i] > 12)
            currentTime[i] -= 12;

        var value = localStorage.getItem(getPlannerRowDataKey(i))
        var textValue = value == null ? "" : value

        $("#timeblocks").append(`<div id="${rowId}" class="row"></div>`);
        $(`#${rowId}`).append(`<label id="${timeLabelId}" class="hour"> ${currentTime[i]} ${amOrPm}</label>`);
        $(`#${rowId}`).append(`<textarea class="textarea ${timedClass}">${textValue}</textarea>`);
        $(`#${rowId}`).append(`<button type="button" class="${saveButtonKey}" data-row-id="${i}"> Commit </button><br>`);

    }

    // Bind the event handler for every save button
    $(`.${saveButtonKey}`).click(saveRowDataToLocalStorage)

})
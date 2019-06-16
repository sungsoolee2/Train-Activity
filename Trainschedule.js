// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAAsa_PCyMTavz_UxaeVgcvQJKiWeUIBAE",
    authDomain: "sungs-project1.firebaseapp.com",
    databaseURL: "https://sungs-project1.firebaseio.com",
    projectId: "sungs-project1",
    storageBucket: "sungs-project1.appspot.com",
    messagingSenderId: "58788608199",
    appId: "1:58788608199:web:54ff06adc339a74e"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    //   var trainfrequency = moment($("#frequency-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
    var nextArrival = $("#nextarrival-input").val().trim();

    formatAMPM(nextArrival);
    console.log(formatAMPM(nextArrival));

    // var nextArrival = moment($("#nextarrival-input").val().trim(),).format("LT"); 
    var minAway = $("#minutesaway-input").val().trim();
    console.log(strTime);


    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        arrival: nextArrival,
        away: minAway

    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.arrival);
    console.log(newTrain.away);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#nextarrival-input").val("");
    $("#minutesaway-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainfrequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().arrival;
    var minAway = childSnapshot.val().away;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainfrequency);
    console.log(nextArrival);
    console.log(minAway);

    // Prettify the employee start
    //   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //   var trainNext = moment().diff(moment(empStart, "X"), "months");
    var trainNext = moment().format('LT'); //current time//
    console.log(trainNext);

    // Calculate the total billed rate
    //   var empBilled = empMonths * empRate;
    //   console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        // $("<td>").text(empStartPretty),
        $("<td>").text(trainfrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway)

    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

function formatAMPM(nextArrival) {
    var hours = nextArrival.getHours();
    var minutes = nextArrival.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}



// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

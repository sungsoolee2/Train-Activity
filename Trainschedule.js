// Initializing Firebase
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

//  Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var firstTrain = $("#firstarrival-input").val().trim();
   


    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);
    console.log(newTrain.dateAdded);

    alert("Train successfully added");


    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#firstarrival-input").val("");

});

//  Firebase event for adding child train to the database and a row in the html when a user adds an entry child
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());
    //variable to calculate minsAway field
    var minsAway;

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var minsAway = childSnapshot.val().away;
    var dateAdded = childSnapshot.val().dateAdded;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(minsAway);
    console.log(dateAdded);


    // Change year so first train comes before now
    var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainNew);

    // Difference time between the current and firstTrain
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % trainFrequency;
    console.log(diffTime);
    console.log(remainder);

    // Minutes until next train
    var minsAway = trainFrequency - remainder;
    console.log(minsAway);

    // Add minsAway to get the next train time
    var nextArrival = moment().add(minsAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm");
    console.log(nextArrival);

    //current time in military time format//
    var currentTime = moment().format('HHmm');
    console.log(currentTime);


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minsAway)

    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

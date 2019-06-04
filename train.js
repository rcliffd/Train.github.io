var firebaseConfig = {
  apiKey: "AIzaSyDRdPKvvNJmS-15P3pXDgFu7DiTLtctjpU",
  authDomain: "train-sch-ac182.firebaseapp.com",
  databaseURL: "https://train-sch-ac182.firebaseio.com",
  projectId: "train-sch-ac182",
  storageBucket: "train-sch-ac182.appspot.com",
  messagingSenderId: "143095790485",
  appId: "1:143095790485:web:3de5c3433ff72ac5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//   declare variables for the onClick event
var trainName;
var destinationName;
var firstTrain;
var freqTrain = 0;
var clockTime;

// var clockTime = moment().format('LTS');
// $(".clock").text(clockTime)

function displayTime() {
  var time = moment().format("HH:mm");
  $(".clock").html(time);
  setTimeout(displayTime, 1000);
}
$(document).ready(function() {
  displayTime();

  displayTime();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //   train input from forms
    trainName = $("#train-name-input")
      .val()
      .trim();
    destinationName = $("#destination-name-input")
      .val()
      .trim();
    firstTrain = $("#first-train-input")
      .val()
      .trim();
    freqTrain = $("#frequency-input")
      .val()
      .trim();

    // create variable for holding new train info
    var newTrain = {
      name: trainName,
      destination: destinationName,
      firstTrain: firstTrain,
      frequency: freqTrain
    };

    // adds newTrain info to the firebase database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Alerts user to new train being added to roster
    // alert("New train added!");

    // Clears the input fields after submission of newTrain info
    $("#train-name-input").val("");
    $("#destination-name-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // declare variables for next arrival and minutes away
    var nextArr;
    var minAway;

    var currentTime = moment().format("hh:mm");
    console.log(currentTime);

    // set time back one year from snapshot value
    var firstTrainNew = moment(
      childSnapshot.val().firstTrain,
      "hh:mm"
    ).subtract(1, "year");

    // calculate differance between current and firstTrain
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    console.log("Diff: " + diffTime);

    // timeRemainder calculates the modulus of the diffence and the snapshot of the frequency
    var timeRemainder = diffTime % childSnapshot.val().frequency;
    console.log("Remainder: " + timeRemainder);

    var minAway = childSnapshot.val().frequency - timeRemainder;

    console.log("Min Away: " + minAway);

    var nextArr = moment().add(minAway, "minutes");
    nextArr = moment(nextArr).format("hh:mm");

    // Stores the data into variables to prepend the datatable
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var freqTrain = childSnapshot.val().frequency;

    var trainRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destinationName),
      $("<td>").text(freqTrain),
      $("<td>").text(nextArr),
      $("<td>").text(minAway)
    );

    $("#schedule-table > tbody").append(trainRow);
    console.log(trainRow);
  });
});

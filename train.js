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

    //    onClick event
    var trainName;
    var destinationName;
    var firstTrain;
    var freqTrain = 0;
    var clockTime;

    // var clockTime = moment().format('LTS');
    // $(".clock").text(clockTime)

    function displayTime() {
        var time = moment().format('HH:mm:ss');
        $('.clock').html(time);
        setTimeout(displayTime, 1000);
    }
$(document).ready(function() {
        displayTime();
    
    displayTime();


  

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

    //   train input from forms
    trainName = $("#train-name-input").val().trim();
    destinationName = $("#destination-name-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    freqTrain = $("#frequency-input").val().trim();

    // create variable for holding new train info
  var newTrain = {
    name: trainName,
    destination: destinationName,
    firstTrain: firstTrain,
    frequency: freqTrain
    
    };
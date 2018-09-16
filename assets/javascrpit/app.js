  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAN9lEaozohDrFaQWZsmo_Dd68Mk9vOiv4",
    authDomain: "fancy-new-app-vstwo.firebaseapp.com",
    databaseURL: "https://fancy-new-app-vstwo.firebaseio.com",
    projectId: "fancy-new-app-vstwo",
    storageBucket: "fancy-new-app-vstwo.appspot.com",
    messagingSenderId: "554472580572"
  };
  
  firebase.initializeApp(config);

$(document).ready(function () {

    var database = firebase.database();
    
    $("#submit").on("click", function (e) {
        e.preventDefault()

        var formTrainName = $("#formTrainName").val()
        var formDestination = $("#formDestination").val()
        var formFirstTrainTime = $("#formFirstTrainTime").val()
        var formFrequency = $("#formFrequency").val()

        database.ref().push({
            trainName: formTrainName,
            destination: formDestination,
            firstTrainTime: formFirstTrainTime,
            frequency: formFrequency,
        })

    });

    database.ref().on('child_added', function (snap) {

        // Store database object data into variables
        var newTrainName = snap.val().trainName ;
        var newDestination = snap.val().destination ;
        var newFirstTrainTime = snap.val().firstTrainTime;
        var newFrequency = snap.val().frequency;

        var firstTimeConverted = moment(newFirstTrainTime, "hh:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
        var timeRemainder = timeDiff % newFrequency;
        var minUntilNext = newFrequency - timeRemainder;
        var nextTrainTime = moment().add(minUntilNext, "minutes").format("hh:mm");

        // Append new data into display table
        $("#infoTable").append("<tr></tr>").append(
            "<td>" + newTrainName + "</td>",
            "<td>" + newDestination + "</td>",
            "<td>" + newFrequency + "</td>",
            "<td>" + nextTrainTime + "</td>",
            "<td>" + minUntilNext + "</td>")

    });

});
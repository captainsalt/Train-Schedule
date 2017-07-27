﻿$(document).ready(() => {
    loginToDatabase();
    setInterval(updateTrainTime, 300);

    //Submits the train to the database
    $("#submitButton").click(() => {
        event.preventDefault();
        var inputs = $("#trainForm div input").get();

        //Loops through inputs and returns if one of them is null or empty
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);

            if (!input.val()) {
                alert("One or more values are null");
                return;
            }
        }

        //making variables to store input text
        var name = $("#nameText").val();
        var dest = $("#destinationText").val();
        var freq = $("#freqText").val();
        var nextArrival = $("#arrivalText").val();

        //checks to see if users train arrives in the past
        var arrivalDate = new Date(nextArrival);
        if (arrivalDate < new Date()) {
            alert("Cannot make a train that arrives in the past");
            return;
        }

        //adds train to database
        addTrain(name, dest, freq, arrivalDate);
    });
});

function updateTrainTime() {
    var train = $(".train").get();
    var format = "ddd[,] MMM Do [at] HH:mm a";

    for (var i = 0; i < train.length; i++) {
        var row = $(train[i]);

        var trainTime = $(row.children()[3]);
        var frequencyTimeString = $(row.children()[2]).html();
        var minutes = $(row.children()[4]);

        //If the traintime hasn't loaded yet go on to the next train
        if (!trainTime.html())
            continue;

        var totalMinutes = getTotalMinutesFromNow(moment(trainTime.html(), format));

        if (totalMinutes <= 0) {
            var momentTime = moment(new Date());
            var editedTime = momentTime.add(frequencyTimeString, "m").format(format);

            trainTime.html(editedTime);
            database.ref(`${row.data("key")}/NextArrival`).set(editedTime);
        } else
            minutes.html(totalMinutes);
    }
}
$(document).ready(() => {
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

    for (var i = 0; i < train.length; i++) {
        var row = $(train[i]);

        var trainTimeString = $(row.children()[3]).html();
        var minutes = $(row.children()[4]);

        minutes.html(getTotalMinutesFromNow(trainTimeString));
    }
}
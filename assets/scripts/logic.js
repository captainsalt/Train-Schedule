$(document).ready(() => {
    loginToDatabase();
    database.ref().on("value", updateTrainTable, errorHandler);
    // addTrain("Name", "Destination", "Frequency", "Next", "Min away");

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

        var name = $("#nameText").val();
        var dest = $("#destinationText").val();
        var freq = $("#freqText").val();
        var nextArrival = $("#arrivalText").val();
        var minAway = $("#minutesAwayText").val();

        //adds train to database
        addTrain(name, dest, freq, nextArrival, minAway);
    });
});
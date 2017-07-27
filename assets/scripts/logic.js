$(document).ready(() => {
    loginToDatabase();
    setInterval(updateTrainTime, 300);

    //Set default time to today
    var format = "YYYY-MM-DDThh:mm";
    $("#arrivalText").val(moment(new Date()).format(format));

    // yyyy - MM - ddThh:mm
    //2017-07-27T03:02
    // 2017 - 07 - 27T03: 23
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

        var trainTime = $(row.children()[3]);
        var frequencyTimeString = $(row.children()[2]).html();
        var minutes = $(row.children()[4]);

        //If the traintime hasn't loaded yet go on to the next train
        if (!trainTime.html())
            continue;

        var totalMinutes = getTotalMinutesFromNow(moment(trainTime.html(), timeFormat));

        if (totalMinutes <= 0) {
            var currentTime = moment(new Date());
            var editedTime = currentTime.add(frequencyTimeString, "m").format(timeFormat);

            trainTime.html(editedTime);
            database.ref(`${row.data("key")}/NextArrival`).set(editedTime);
        } else
            minutes.html(totalMinutes);
    }
}
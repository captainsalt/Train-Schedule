var database;

function loginToDatabase() {
    var config = {
        apiKey: "AIzaSyD0V2XdM9V9i0kP39Y4Ej41EHkMXeHC_NE",
        authDomain: "train-project-30209.firebaseapp.com",
        databaseURL: "https://train-project-30209.firebaseio.com",
        projectId: "train-project-30209",
        storageBucket: "train-project-30209.appspot.com",
        messagingSenderId: "9470173366"
    };

    firebase.initializeApp(config);
    database = firebase.database();
}

/**
 * Add a train to the database
 */
function addTrain(trainName, destination, frequency, nextArrival, minutesAway) {
    var data = {
        TrainName: trainName,
        Destination: destination,
        Frequency: frequency,
        NextArrival: nextArrival,
        MinutesAway: minutesAway
    }

    database.ref().push(data);
}

//Updates the train table when data is aded or removed from the database
function updateTrainTable(data) {

    //empty all of the train info
    $(".train").empty();

    var table = $("#trainTable");

    try {
        var keys = Object.keys(data.val());
    } catch (error) { //ignore errors if databse is null
        return;
    }

    //For every train
    keys.forEach(e => {
        var train = data.val()[e];
        var tableRow = $("<tr class=\"train\">");

        addOrderedTrainToTable();
        
        //after you get all of the trains data append it to the main table
        table.append(tableRow);

        //Helper function
        /**
         * Since the DB is out of order this function orders the properties based on the order list
         */
        function addOrderedTrainToTable() {
            //Desired order of the trains properties on the table
            var order = ["TrainName", "Destination", "Frequency", "NextArrival", "MinutesAway"]

            //adding the properties in order
            for (var i = 0; i < order.length; i++)
                tableRow.append($("<td>").html(train[order[i]]));
        }
    });
}

function errorHandler(err) {
    console.log(`An error has occured; ${err}`);
}
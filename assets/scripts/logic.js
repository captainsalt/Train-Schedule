$(document).ready(() => {
    loginToDatabase();
    database.ref().on("value", updateTrainTable, errorHandler);
    addTrain("Name", "Destination", "Frequency", "Next", "Min away");
});


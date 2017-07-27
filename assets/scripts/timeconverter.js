var momentTimeFormat = "ddd[,] MMM Do [at] HH:mm a";

function formatTime(time) {
    time = moment(new Date(time)).format(momentTimeFormat);
    return time;
}

function getTotalMinutesFromNow(arrival) {
    //check if arrival is of the date data type
    if (typeof arrival.getMonth !== "function")
        arrival = Date.parse(arrival);

    return Math.ceil(new Date(arrival - new Date()).getTime() / 60000);
}
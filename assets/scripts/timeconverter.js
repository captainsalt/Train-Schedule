function timeHumanizer(time) {
    var options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    var convertedTime = time.toLocaleDateString("en-US", options);

    return convertedTime;
}

function formatTime(time) {
    var format = "ddd[,] MMM Do [at] HH:mm a";

    time = moment(new Date(time)).format(format);
    return time;
}

function getTotalMinutesFromNow(arrival) {
    //check if arrival is of the date data type
    if (typeof arrival.getMonth !== "function")
        arrival = Date.parse(arrival);

    return Math.ceil(new Date(arrival - new Date()).getTime() / 60000);
}
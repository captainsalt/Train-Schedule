function timeHumanizer (time) {
    var options = {
        weekday: "short", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    
    var convertedTime = time.toLocaleDateString("en-US", options);

    return convertedTime;
}
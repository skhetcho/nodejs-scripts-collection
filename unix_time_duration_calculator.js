const duration = {
    seconds: function (val) { return val * 1000; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

function latestTime() {
    return (new Date).getTime();
}


console.log(latestTime() + duration.minutes(5));
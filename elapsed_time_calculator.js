/**
 * This script calculates the elapsed time from when the script was run to a later time.
 * The elapsed time is calculated in years, months, days, hours, minutes, and seconds.
 * 
 * The script starts by defining constants for the number of seconds in a year, month, day, hour, and minute.
 * 
 * It then sets a timeout that fires after 61 seconds. When the timeout fires, it calculates the elapsed time
 * from when the script was run to the current time. The elapsed time is calculated in seconds.
 * 
 * The script then calculates the number of full years, months, days, hours, minutes, and remaining seconds
 * in the elapsed time. It subtracts the time accounted for by each unit from the total elapsed time before
 * moving on to the next smaller unit. This ensures that each unit represents the maximum amount of time it can
 * without contributing to the next larger unit.
 * 
 * The calculated time units are stored in an object, which is then logged to the console.
 * 
 * NOTE: not thought through very well but I think I got it
 * criticize, suggest, improve this code for future use so
 * another doesn't need to code this at 5AM
 */

var now = new Date();

//not thought through very well but I think I got it
//criticize, suggest, improve this code for future use so
//another doesn't need to code this at 5AM

secondPerYear = 365 * 24 * 60 * 60 //days * hours * minutes * second //seconds per year
secondPerMonth = (365 / 12) * 24 * 60 * 60 //days * hours * minutes * second (in a month) // avg. seconds per month
secondPerDay = 24 * 60 * 60 //seconds per day
secondPerHour = 60 * 60 //seconds per hour
secondPerMinute = 60 //seconds per minute

setTimeout(function() {
    var later = new Date().getTime();
    var elapsed = Math.floor((later - now) / 1000); //convert to seconds
    
    //object to store elapsed time in year/months/days/hours/minutes/seconds
    var yearObject = {
        years: Math.floor(elapsed / secondPerYear),
        months: null,
        days: null,
        hours:null,
        minutes: null,
        seconds: null,
    }
    

    //I will loop here, I will do it in the next commit.
    elapsed = elapsed - (yearObject.years * secondPerYear);
    yearObject.months = Math.floor(elapsed / secondPerMonth);

    elapsed = elapsed - (yearObject.months * secondPerMonth);
    yearObject.days = Math.floor(elapsed / secondPerDay);

    elapsed = elapsed - (yearObject.days * secondPerDay);
    yearObject.hours = Math.floor(elapsed / secondPerHour);

    elapsed = elapsed - (yearObject.hours * secondPerHour);
    yearObject.minutes = Math.floor(elapsed / secondPerMinute);

    // will this be included in the loop? #TODO
    elapsed = elapsed - (yearObject.minutes * secondPerMinute);
    yearObject.seconds = elapsed;

    console.log(yearObject)
}, 61 * 1000)
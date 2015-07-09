var firebase = new Firebase("https://protolevelup.firebaseio.com/orientation")
firebase.remove()

var trough = 10
var peak = 80
var distance = 70 //calibrate this
var direction = -1 //if the top of the device is on the right, direction is 1

var goingUp = true
var curls = 0

var calibrated = false
var orientation = {}

$(document).ready(function() {
    $("button").on("click", function() {
        if(orientation.gamma > 0) {
            direction = -1
        } else {
            direction = +1
        }
        peak = orientation.gamma
        distance = orientation.gamma

        $("#distance").text(orientation)
        $("#direction").text(direction)

        calibrated = true
    })
})

window.addEventListener("deviceorientation", function(event) {
    $("#absolute").text(event.absolute == true)
    $("#beta").text(event.beta)
    $("#gamma").text(event.gamma)
    $("#alpha").text(event.alpha)

    orientation = {
        "beta": event.beta,
        "gamma": event.gamma,
        "alpha": event.alpha,
    }

    if(calibrated == true) {
        countCurls(orientation)
    }

    $("#curls").text(curls)
}, false)

function countCurls(orientation) {
    var gamma = orientation.gamma * direction
    if(goingUp) {
        if(gamma >= trough + distance) {
            peak = gamma //reset the peak
            goingUp = false //switch curling direction
            curls += 1 //increase curl count
        }
        if(gamma < trough) { //search for highest peak
            trough = gamma
        }
    } else {
        if(gamma <= peak - distance) {
            trough = gamma //reset the trough
            goingUp = true //switch the curling direction
        }
        if(gamma > peak) { //search for the lowest trough
            peak = gamma
        }
    }
}

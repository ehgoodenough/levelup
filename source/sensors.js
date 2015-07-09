var firebase = new Firebase("https://protolevelup.firebaseio.com/orientation")

firebase.remove()

var trough = 10
var peak = 80

var goingUp = true
var curls = 0

window.addEventListener("deviceorientation", function(event) {
    $("#absolute").text(event.absolute == true)
    $("#beta").text(event.beta)
    $("#gamma").text(event.gamma)
    $("#alpha").text(event.alpha)


    var gamma = Math.abs(event.gamma)
    if(goingUp) {
        if(gamma >= peak) {
            goingUp = false
            curls += 1
        }
    } else {
        if(gamma <= trough) {
            goingUp = true
        }
    }

    $("#curls").text(curls)

    firebase.push({
        "alpha": event.alpha,
        "beta": event.beta,
        "gamma": event.gamma,
        "curls": curls
    })
}, false)

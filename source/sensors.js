var firebase = new Firebase("https://protolevelup.firebaseio.com/orientation")

firebase.remove()

window.addEventListener("deviceorientation", function(event) {
    $("#absolute").text(event.absolute == true)
    $("#alpha").text(event.alpha)
    $("#beta").text(event.beta)
    $("#gamma").text(event.gamma)
    
    firebase.push({
        "alpha": event.alpha,
        "beta": event.beta,
        "gamma": event.gamma
    })
}, false)

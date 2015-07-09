var firebase = new Firebase("https://protolevelup.firebaseio.com/orientation")

firebase.remove()

firebase.on("child_added", function(data) {
    var value = data.val()
    $("#gamma").text(value.gamma.toFixed(2))
    console.log(value)
})


window.addEventListener("deviceorientation", function(event) {
    var orientation = {
        "beta": event.beta,
        "gamma": event.gamma,
        "alpha": event.alpha
    }
    firebase.push(orientation)
}, false)

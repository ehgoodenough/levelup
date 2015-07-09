var firebase = new Firebase("https://protolevelup.firebaseio.com/orientation")

firebase.on("child_added", function(data) {
    var value = data.val()

    $("#absolute").text(value.absolute == true)
    $("#alpha").text(value.alpha)
    $("#beta").text(value.beta)
    $("#gamma").text(value.gamma)
    $("#curls").text(value.curls)
})

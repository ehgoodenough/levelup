var firebase = new Firebase("https://protolevelup.firebaseio.com/orientation")
firebase.remove()


$(document).ready(function() {
    
    window.addEventListener("deviceorientation", function(event) {
        // -1 is accomodating for the top of
        // the device pointing to the LEFT of
        // the user. It should be +1 if the
        // top of the device is pointing
        // to the RIGHT.
        // we're not yet accounting for the
        // jump from 0 to 360. Hmmmm..
        firebase.set({
            "x": event.beta || 0,
            "y": event.gamma || 0,
            "z": event.alpha || 0
        })
    }, false)
    
    var WIDTH = 1280
    var HEIGHT = 360
    $(".visual").find("canvas").attr("width", WIDTH)
    $(".visual").find("canvas").attr("height", HEIGHT)
    $(".visual").find("canvas")[0].getContext("2d").beginPath()
    $(".visual").find("canvas")[0].getContext("2d").moveTo(0, HEIGHT / 2)
    $(".visual").find("canvas")[0].getContext("2d").lineTo(WIDTH, HEIGHT / 2)
    $(".visual").find("canvas")[0].getContext("2d").stroke()
    $(".visual").find("canvas")[0].getContext("2d").moveTo(0, HEIGHT / 2)
    var tick = 0
    
    firebase.on("value", function(data) {
        var orientation = data.val()
        if(!orientation) {
            return -1
        }
        
        Levelup.analyze(orientation)
        
        $(".textual").find("#x").text(orientation.x.toFixed(3))
        $(".textual").find("#y").text(orientation.y.toFixed(3))
        $(".textual").find("#z").text(orientation.z.toFixed(3))
        
        $(".visual").find("#y").css("-webkit-transform", "rotate(" + orientation.y + "deg)")
        $(".visual").find("canvas")[0].getContext("2d").lineTo(tick++, (HEIGHT / 2) - orientation.y)
        $(".visual").find("canvas")[0].getContext("2d").stroke()
        
        $(".analysis").find("#curls").text(Levelup.curling.count)
        $(".analysis").find("#distance").text(Levelup.distance)
    })
})

// We basically want, for the first few curls, to be
// observant, and not report any curling. We count the
// curls by observing the change between maxes and mins
// while we instruct the user to perform some curls.
// After a few, we kick in, and begin counting the curls
// predictevly using the data from our observations.

var Levelup = new function() {
    this.curling = {
        count: 0,
        upwards: true
    }
    
    this.distance = 45
    this.trough = 180
    this.peak = 180
    
    this.analyze = function(orientation) {
        var y = orientation.y
        
        if(this.curling.upwards == true) {
            var distance = Math.abs(this.trough - y)
            if(distance >= this.distance) {
                this.curling.upwards = false
                this.curling.count += 1
            }
        } else if(this.curling.upwards == false) {
            var distance = Math.abs(this.peak - y)
            if(distance >= this.distance) {
                this.curling.upwards = true
                this.curling.count += 1
            }
        }
        
        if(y > this.peak) {
            this.peak = y
        } if(y < this.trough) {
            this.trough = y
        }
    }
}

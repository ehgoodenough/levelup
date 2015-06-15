var WIDTH = 640
var HEIGHT = 320

var basetimestamp = Date.now()

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)
    
    var canvas = $("canvas")[0].getContext("2d")
    
    canvas.beginPath()
    canvas.moveTo(0, HEIGHT / 2)
    
    if(window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            var acceleration = event.accelerationIncludingGravity
            var timestamp = event.timeStamp
            
            var x = (timestamp - basetimestamp) * (1/32)
            var y = (HEIGHT / 2) - acceleration.y * 8
            
            canvas.lineTo(x, y)
            canvas.stroke()
        }, false)
    } else {
        console.log("DeviceMotion is not supported.")
        window.alert("DeviceMotion is not supported.")
    }
})

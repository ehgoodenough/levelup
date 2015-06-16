var WIDTH = 640
var HEIGHT = 320

var oldtimestamp = Date.now()

var point = {x: 0, y: HEIGHT / 2, vy: 0}
var accelerations = []

//http://www.freescale.com/files/sensors/doc/app_note/AN3397.pdf

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)
    
    var canvas = $("canvas")[0].getContext("2d")
    
    canvas.beginPath()
    canvas.moveTo(point.x, point.y)
    
    if(window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            
            if(event.acceleration.x == null
            && event.acceleration.y == null
            && event.acceleration.z == null) {
                return
            }
            
            accelerations.push(event.acceleration)
            if(accelerations.length > 20) {
                accelerations.shift()
            }
            
            acceleration = {}
            acceleration.x = 0
            acceleration.y = 0
            acceleration.z = 0
            for(var i = 0; i < accelerations.length; i++) {
                acceleration.x += accelerations[i].x
                acceleration.y += accelerations[i].y
                acceleration.z += accelerations[i].z
            }
            acceleration.x /= accelerations.length
            acceleration.y /= accelerations.length
            acceleration.z /= accelerations.length
            
            // "mechanical filtering"
            if(acceleration.y < 0.2
            && acceleration.y > -0.2) {
                acceleration.y = 0
            }
            
            point.vy += acceleration.y
            
            // "move end check"
            if(acceleration.y == 0) {
                point.vy = 0
            }
            
            point.x += 10 * event.interval
            point.y += point.vy
            
            canvas.lineTo(point.x, point.y)
            canvas.stroke()
        }, false)
    } else {
        console.log("DeviceMotion is not supported.")
        window.alert("DeviceMotion is not supported.")
    }
})

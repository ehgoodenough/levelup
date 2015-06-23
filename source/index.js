var WIDTH = 640
var HEIGHT = 160

var basetimestamp = Date.now()

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)

    var canvas = $("canvas")[0].getContext("2d")
    var canvas2 = $("canvas")[1].getContext("2d")
    var canvas3 = $("canvas")[2].getContext("2d")

    $("canvas#position").attr("height", HEIGHT * 2)

    canvas.beginPath()
    canvas.moveTo(0, HEIGHT / 2)
    canvas.lineTo(WIDTH, HEIGHT / 2)
    canvas.stroke()
    canvas.moveTo(0, HEIGHT / 2)

    canvas2.beginPath()
    canvas2.moveTo(0, HEIGHT / 2)
    canvas2.lineTo(WIDTH, HEIGHT / 2)
    canvas2.stroke()
    canvas2.moveTo(0, HEIGHT / 2)

    canvas3.beginPath()
    canvas3.moveTo(0, HEIGHT)
    canvas3.lineTo(WIDTH, HEIGHT)
    canvas3.stroke()
    canvas3.moveTo(0, HEIGHT)

    var last_ay = 0
    var last_vy = 0
    var sum = 0
    var sum2 = 0
    var count = 0

    var asum = 0
    var acount = 0

    if(window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            var acceleration = event.acceleration
            var timestamp = event.timeStamp
            var delta = timestamp - basetimestamp
            var interval = event.interval


            var x = delta * (1/32)

            var ay = acceleration.y
            acount++
            asum += ay

            var trapezoid = interval * ((last_ay + ay) / 2)
            sum += trapezoid
            var vy = sum

            if(Math.abs(last_vy - vy) < 0.5
            && Math.abs(ay) < 0.1) {
                sum = 0
                vy = 0
            }

            var trapezoid2 = interval * ((last_vy + vy) / 2)
            sum2 += trapezoid2
            var y = sum2

            $("div").text(asum / acount)
            canvas.lineTo(x, (HEIGHT / 2) - ay)
            canvas2.lineTo(x, (HEIGHT / 2) - vy)
            canvas3.lineTo(x, (HEIGHT) - y * 4)
            canvas.stroke()
            canvas2.stroke()
            canvas3.stroke()

            last_ay = ay
            last_vy = vy
        }, false)
    } else {
        console.log("DeviceMotion is not supported.")
        window.alert("DeviceMotion is not supported.")
    }
})

//http://www.freescale.com/files/sensors/doc/app_note/AN3397.pdf

window.WIDTH = 640
window.HEIGHT = 320

var keys = {
    // !!
}

var point = {
    "x": 0,
    "y": HEIGHT / 2,
    "vx": 10,
    "vy": 0,
    "ax": 0,
    "ay": 0
}

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)

    var canvas = $("canvas")[0].getContext("2d")

    canvas.beginPath()
    canvas.moveTo(point.x, point.y)

    window.runLoop(function(interval) {
        $("div").text(interval)

        // x
        point.x += point.vx * interval

        // y
        if(keys[38] || keys[87]) {
            point.ay -= 10 * interval
        } else if(keys[40] || keys[83]) {
            point.ay += 10 * interval
        } else {
            if(point.ay > 0) {
                point.ay -= 10 * interval
            } else if(point.ay < 0) {
                point.ay += 10 * interval
            }
        }

        if(point.ay == 0) {
            point.vy = 0
        }

        point.vy += point.ay * interval
        point.y += point.vy * interval

        canvas.lineTo(point.x, point.y)
        canvas.stroke()
    })

    window.addEventListener("keydown", function(event) {
        keys[event.keyCode] = true
    })

    window.addEventListener("keyup", function(event) {
        delete keys[event.keyCode]
    })
})

window.runLoop = function(func) {
    (function loop(time) {
        func(Math.min((Date.now() - time) / 1000, 1))
        window.requestAnimationFrame(loop.bind(null, Date.now()))
    })(Date.now())
}

/*$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)

    var canvas = $("canvas")[0].getContext("2d")

    canvas.beginPath()
    canvas.moveTo(point.x, point.y)

    window.addEventListener("devicemotion", function(event) {

        if(event.acceleration.x == null
        && event.acceleration.y == null
        && event.acceleration.z == null) {
            return
        }

        point.ax = event.acceleration.x
        point.ay = event.acceleration.y
        var interval = event.interval

        // "mechanical filtering"
        if(point.ay < 0.2
        && point.ay > -0.2) {
            point.ay = 0
        }

        // "move end check"
        if(point.ay == 0) {
            point.vy = 0
        } else {
            point.vy += point.ay * interval
        }

        point.x += 10 * interval
        point.vy += point.ay * interval
        point.y += point.vy * interval * 100

        canvas.lineTo(point.x, point.y)
        canvas.stroke()
    }, false)
})*/

var Curler = function(curldist) {

    this.slope = 0
    this.peakpoint = 0
    this.troughpoint = 0
    this.pointqueue = new Array()
    this.curldist = curldist || 0.1

    this.isCurl = function(point) {
        var isCurl = false
        var prevpoint = this.pointqueue[this.pointqueue.length - 1]
        if(prevpoint != undefined) {
            if(prevpoint.ty < point.ty) {
                if(this.slope <= 0) {
                    this.slope = +100
                    this.troughpoint = prevpoint.ty
                }
            } else {
                if(this.slope >= 0) {
                    this.slope = -100
                    this.peakpoint = prevpoint.ty
                    if(this.peakpoint - this.troughpoint > this.curldist) {
                        isCurl = true
                    }
                }
            }
        }
        this.pointqueue.push(point)
        if(this.pointqueue.length > 10) {
            this.pointqueue.shift()
        }
        return isCurl
    }
}

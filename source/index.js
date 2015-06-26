window.WIDTH = 640
window.HEIGHT = 320

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
    canvas.moveTo(0, HEIGHT / 2)
    canvas.lineTo(WIDTH, HEIGHT / 2)
    canvas.setLineDash([5])
    canvas.stroke()
    canvas.setLineDash([0])
    canvas.moveTo(0, HEIGHT / 2)
    
    var basetimestamp = Date.now()
    
    window.addEventListener("devicemotion", function(event) {
        var acceleration = event.acceleration
        var timestamp = event.timeStamp
        var delta = timestamp - basetimestamp
        var interval = event.interval
        
        var x = delta * (1/32)
        var ay = acceleration.y
        
        canvas.lineTo(x, (HEIGHT / 2) - ay)
        canvas.stroke()
        
        $("#debug").text(ay)
    }, false)
})

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

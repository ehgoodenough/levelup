window.WIDTH = 640
window.HEIGHT = 320

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)

    var canvas = $("canvas")[0].getContext("2d")
    
    canvas.beginPath()
    canvas.moveTo(0, HEIGHT / 2)
    canvas.lineTo(WIDTH, HEIGHT / 2)
    canvas.stroke()
    canvas.moveTo(0, HEIGHT / 2)
    
    var curler = new Curler(4)
    var curls = 0
    
    var basetimestamp = Date.now()
    
    window.addEventListener("devicemotion", function(event) {
        var acceleration = event.acceleration
        var timestamp = event.timeStamp
        
        var x = (timestamp - basetimestamp) * (1/32)
        var y = acceleration.y
        
        canvas.lineTo(x, (HEIGHT / 2) - y)
        canvas.stroke()
        
        if(curler.isCurl({x: x, y: y})) {
            curls += 1
        }
        
        $(".numerator").text(curls)
        $("#debug").text(y)
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
            if(prevpoint.y < point.y) {
                if(this.slope <= 0) {
                    this.slope = +100
                    this.troughpoint = prevpoint.y
                }
            } else {
                if(this.slope >= 0) {
                    this.slope = -100
                    this.peakpoint = prevpoint.y
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

var WIDTH = 640
var HEIGHT = 320

//http://www.freescale.com/files/sensors/doc/app_note/AN3397.pdf

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)
    
    var curler = new Curler(0.1)
    
    var canvas = $("canvas")[0].getContext("2d")
    canvas.beginPath()
    
    for(var i = 0; i < data.length; i++) {
        
        if(curler.isCurl(data[i])) {
            canvas.fillStyle = "red"
            canvas.fillRect(x, y-20, 1, 20)
        }
        
        var x = (data[i].timestamp - data[0].timestamp) * 50
        var y = -60 - data[i].ty * 300
        canvas.strokeStyle = "black"
        canvas.lineTo(x, y)
        canvas.stroke()
    }
})

var Curler = function(curldist) {
    this.curldist = curldist || 0.1
    
    this.slope = 0
    this.peakpoint = 0
    this.troughpoint = 0
    this.pointqueue = new Array()
    
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

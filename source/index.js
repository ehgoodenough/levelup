var WIDTH = 640
var HEIGHT = 320

//http://www.freescale.com/files/sensors/doc/app_note/AN3397.pdf

$(document).ready(function() {
    $("canvas").attr("width", WIDTH)
    $("canvas").attr("height", HEIGHT)
    
    var canvas = $("canvas")[0].getContext("2d")
    
    canvas.beginPath()
    for(var i = 0; i < data.length; i++) {
        var x = (data[i].timestamp - data[0].timestamp) * 50
        var y = -60 - data[i].ty * 300
        canvas.lineTo(x, y)
        canvas.stroke()
    }
})

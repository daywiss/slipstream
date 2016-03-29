var _ = require('highland')
var fs = require('fs')

var data = './data.bin'

function splitBuffer(data){
  return _(function(push,next){
    for(var i = 0; i < data.length; i++){
      push(null,data[i])
    }
    push(null,_.nil)
    next()
  })
}

var SLIP_ESC = 0
var SLIP_END = 1
var SLIP_ESCESC = 3
var SLIP_ESCEND = 4


 var slipPacket = []
 var escaped = false

_(fs.createReadStream(data))
  .flatMap(function(chunk)){
     return splitBuffer(chunk)
  })
  .doto(function(byte){
    if(byte == SLIP_ESC){
      escaped = true
    }else if(byte == SLIP_END){
      escaped = false
    }
  })
  .map(function(byte){
    if(escaped){
      escaped = false
      if(byte == SLIP_ESCESC){
        return SLIP_ESC
      }
      if(byte == SLIP_ESCEND){
        return SLIP_END
      }
    }else{
      return byte
    }
  })
  .filter(function(byte){
    return byte != SLIP_ESCAPE
  })
  .splitBy(SLIP_END)
  .each(function(packet){
    //do something
  })
  

function slipGenerator()
  
  

  




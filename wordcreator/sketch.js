let slovicka = [];

let cinput,dinput;
function setup() {
  // createCanvas(400, 400);
  createP("cesky")
  cinput = createInput("");
  createP("nemecky")
  dinput = createInput("");
  createButton("export").mousePressed(function(){
  	saveJSON(slovicka, slovicka.length + ' slovicek_' + day() + "-" + month() + "-" + (year()-2000) + '.json');
  });
  
  
  
  
  noCanvas();
  noLoop();
}
function keyPressed(){
	if(keyIsDown(13)){
    let q = {
    	c:cinput.value(),
      n:dinput.value()
    };
    cinput.value("");
    dinput.value("");
    cinput.elt.focus();
    
    slovicka.push(q);
   
  }
}

function loadScore(){
  byClass('nscore').innerHTML = 0;
}
function updateScore(gotscore){
  byClass('nscore').innerHTML = parseInt(byClass('nscore').innerHTML) + gotscore;
}
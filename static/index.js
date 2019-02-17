   let score = 0;
   let qdata;
   let currentQuestion = 0;
   let status= 'menu';
   let difficulty = 'none';
   let preparedData = false;
   const socket = io();
   let firstQuestion = true;

   socket.on('initData', function(data){
      score = data.score;
      status = data.menu;

   });

let questionIsActive = false;
   function byID(id) {
     return document.getElementById(id);
   }
    function byClass(c,index = 0) {
      return document.getElementsByClassName(c)[index];
    }

   function play() {
     //hide main menu
    byID('mainMenu').style.display = "none";
    byID('difficulty').style.display = "block";



   }

   function startgame(diff) {
    difficulty = diff;
     byID('mainMenu').style.display = "none";
     byID('difficulty').style.display = "none";
     byID('ingame').innerHTML = '<div class="qArea"><p class="score">Score</p><p class="nscore">---</p><p id="qword">Loading...</p></div><div> <div class="menucoll" id="qanswer1">---</div><div class="menucoll" id="qanswer2">---</div></div>';
     socket.emit('startGame', difficulty);
    //  loadScore();
    //  loadQuestion();
     
     //byID('nscore').innerHTML = questiondata.q;
     //byID('qword').innerHTML = questiondata.q;
     //byID('qanswer1').innerHTML = questiondata.ans1;
     //byID('qanswer2').innerHTML = questiondata.ans2;


   }
   socket.on('question', function(data){
      preparedData = data;

      if (questionIsActive === false ){
        if (firstQuestion === true) {
          showNextQuestion();
        } else {
          byID("nextbutton").style.display = "inline-block";
        }
        byID("nextbutton").onclick = function () {
          showNextQuestion();
        };
        firstQuestion = false;
        byClass('nscore').innerHTML = data.score;

      }
      

   });
   function showNextQuestion(){
     console.log('Question shown');
     

     let data = preparedData;
     console.log(data);
        byID("nextbutton").style.display = "none";
        questionIsActive = true;
        byID('qn').innerHTML = data.qn;
        byID('qn').style.display = "block";
        byID('qn').style.position = "absolute";
        

        byID('qanswer1').style = "";
        byID('qanswer2').style = "";

        byID('qword').innerHTML = data.q;
        byID('qanswer1').innerHTML = data.a1;
        byID('qanswer2').innerHTML = data.a2;


        byID('qanswer1').addEventListener("click", function () {
          checkAnswer(this, 2)
        });
        byID('qanswer2').addEventListener("click", function () {
          checkAnswer(this, 1)
        });
        questionIsActive === true;
        preparedData = false;

   }


   function checkAnswer(data, qid) {
     if (questionIsActive) {
       socket.emit('answer', data.innerHTML);
       questionIsActive = false;
     }
     socket.on('answerIs', function (data) {
       let pid = 0;
       if(qid == 1){
        pid = 2;
       } else {
        pid = 1;
       }
       if (data.answer === true) {
          // byID("qanswer" + pid).style.backgroundClip = "padding-box";
         // data.style.outline = "10px black solid";
         // data.style.outlineOffset = "-10px";
         byID("qanswer" + pid).style.border = "2px black solid";
         byID("qanswer" + pid).style.backgroundColor = "green";
         byID("qanswer" + qid).style.backgroundColor = "red";
         byID("nextbutton").style.display = "inline-block";
         
       } else {
         byID("qanswer" + pid).style.backgroundColor = "red";
         byID("qanswer" + pid).style.border = "2px black solid";
         byID("nextbutton").style.display = "inline-block";
         byID("qanswer" + qid).style.backgroundColor = "green";
       }
     });
   }
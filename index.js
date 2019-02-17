var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
mongoose.connect('mongodb://wtf:itsaprank12@ds263109.mlab.com:63109/myquiz');

var QinDBscheme = new mongoose.Schema({
  c: String,
  n: String
});

var QinDB = mongoose.model('question', QinDBscheme);

/*

QinDB.find({}, function (err, dbslovicka) {
  if (err) throw err;
    //send
     console.log(dbslovicka);
  
})

*/



let slovicka = [{
    "c": "byt",
    "n": "e Wohnung -en"
  },
  {
    "c": "k",
    "n": "zu"
  },
  {
    "c": "vyškový dům",
    "n": "s Hochhaus -er"
  },
  {
    "c": "selský dům",
    "n": "s Bauernhaus-er"
  },
  {
    "c": "rodinny dum",
    "n": "s Einfamilienhaus-er"
  },
  {
    "c": "pokoj",
    "n": "s Zimmer-"
  },
  {
    "c": "studenska kolej",
    "n": "s Studentenwohnheim-e"
  },
  {
    "c": "byt v zastavbe",
    "n": "e Altbawohnung-en"
  },
  {
    "c": "poschodi",
    "n": "r Stock"
  },
  {
    "c": "svetly",
    "n": "hell"
  },
  {
    "c": "velky",
    "n": "groS"
  },
  {
    "c": "stat",
    "n": "kosten"
  },
  {
    "c": "drahy",
    "n": "teuer"
  },
  {
    "c": "zahrada",
    "n": "r Garten-á"
  },
  {
    "c": "naš",
    "n": "unser"
  },
  {
    "c": "ctverecni metr",
    "n": "Quadratmeter"
  },
  {
    "c": "maly",
    "n": "klein"
  },
  {
    "c": "na venkove",
    "n": "(auf dem) Land"
  },
  {
    "c": "znacne",
    "n": "ziemlich"
  },
  {
    "c": "tichy",
    "n": "ruhig"
  },
  {
    "c": "ale",
    "n": "aber"
  },
  {
    "c": "obyvaci pokoj",
    "n": "s Wohnzimmer-"
  },
  {
    "c": "jist",
    "n": "essen"
  },
  {
    "c": "spat",
    "n": "schlafen"
  },
  {
    "c": "koupat se",
    "n": "baden"
  }
]



// let slovicka = [
// {
//   "c": "hledat",
//   "n": "suchen"
// }, {
//   "c": "rok",
//   "n": "das Jahr-e"
// }, {
//   "c": "minuta",
//   "n": "die Minute-n"
// }, {
//   "c": "v,na",
//   "n": "am"
// }, {
//   "c": "mít rád,chtít",
//   "n": "mo'gen"
// }, {
//   "c": "dnes",
//   "n": "heute"
// }, {
//   "c": "pak,potom",
//   "n": "dann"
// }, {
//   "c": "do",
//   "n": "nach"
// }, {
//   "c": "zpátky",
//   "n": "zuru'ck"
// },
// {
//   "c": "znat",
//   "n": "kennen"
// }, {
//   "c": "pan",
//   "n": "der Herr"
// }, {
//   "c": "otázka",
//   "n": "die Frage-n"
// }, {
//   "c": "odpověd",
//   "n": "die Antwort-en"
// }, {
//   "c": "opakovat",
//   "n": "nachsprechen"
// }, {
//   "c": "ptat se ",
//   "n": "fragen"
// }, {
//   "c": "cist",
//   "n": "lesen"
// }, {
//   "c": "take",
//   "n": "auf"
// }, {
//   "c": "nyni",
//   "n": "jetzt"
// }, {
//   "c": "město",
//   "n": "die Stadt -e"
// }, {
//   "c": "hra",
//   "n": "das Spiel-e"
// }, {
//   "c": "u, v",
//   "n": "bei"
// }, {
//   "c": "ktery",
//   "n": "welcher"
// }, {
//   "c": "die ",
//   "n": "Silbe-n"
// }, {
//   "c": "chlapec",
//   "n": "der Junge-n"
// }, {
//   "c": "počítat",
//   "n": "za'hlen"
// }, {
//   "c": "do",
//   "n": "bis"
// }, {
//   "c": "vsichni",
//   "n": "alle"
// }, {
//   "c": "nejdrive",
//   "n": "zuerst"
// }, {
//   "c": "chyba",
//   "n": "der ehler"
// }, {
//   "c": "najít",
//   "n": "finden"
// }, {
//   "c": "říkat",
//   "n": "sagen"
// }, {
//   "c": "platit",
//   "n": "zahlen"
// }, {
//   "c": "voda",
//   "n": "das Wasser"
// }, {
//   "c": "přes (hodnota)",
//   "n": "u'ber"
// }, {
//   "c": "mince",
//   "n": "die Mu'nze-n"
// }, {
//   "c": "ptát se ",
//   "n": "nachfragen"
// }, {
//   "c": "slovník",
//   "n": "das Wo'rterbuch"
// }, {
//   "c": "opakovat",
//   "n": "wiederholen"
// }, {
//   "c": "napsat",
//   "n": "anschreiben"
// }, {
//   "c": "televizor",
//   "n": "der Fernseher"
// }, {
//   "c": "mobil",
//   "n": "das Handy-s"
// }, {
//   "c": "barva",
//   "n": "die Farbe-n"
// }
// ];

for (let i = 0; i < slovicka.length; i++) {

  QinDB({
    c: slovicka[i].c,
    n: slovicka[i].n
  }).save(function (err) {
    if (err) throw err;
    console.log('question saved');
  });

}


let privatePlayersData = [];
let forPlayers = [];

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});





io.on('connection', function (socket) {

      console.log('a user connected: ' + socket.id);

      forPlayers.push(new Player(socket.id));

      io.to(socket.id).emit('initData', forPlayers[forPlayers.length-1]);
        socket.on('disconnect', function (dsocket) {
          console.log('a user disconnected: ' + socket.id);

        });
      socket.on('startGame', function (difficulty) {
        startGamefor(socket.id, difficulty)
      });

      socket.on('answer', function (ans) {
        checkAnswerfor(socket.id,ans);
      });

        

      });

      function startGamefor(hisid,difficulty){
         for (let i = 0; i < forPlayers.length; i++) {
           if (forPlayers[i].id == hisid) {
             let diff;
             if(difficulty === 'novice'){
               diff = 1;
             } else if (difficulty === 'average'){
               diff = 2;
             } else if (difficulty === 'veteran'){
                diff = 3;
             } else {
               diff = 0;
             }
             forPlayers[i].status = diff;
             forPlayers[i].seed = Math.floor(Math.random()*10000000)
             sendQuestionfor(hisid);
         }
      }
    }


function checkAnswerfor(hisid, ans) {
  for (let i = 0; i < forPlayers.length; i++) {
    if (forPlayers[i].id == hisid) {
      let answerIs = false;
      console.log(forPlayers[i].qdata.right, ans)
      if (ans == forPlayers[i].qdata.right){
        answerIs = true;
        forPlayers[i].score += 50;
      }
      let info = {
        answer:answerIs,
        score: forPlayers[i].score
      }
      io.to(hisid).emit('answerIs', info);

      sendQuestionfor(hisid);
    }
  }
}

function sendQuestionfor(hisid){
  for (let i = 0; i < forPlayers.length; i++) {
      if (forPlayers[i].id == hisid) {
        let qd = GetaQuestion(hisid, forPlayers[i].qnumber);

       let qdata = {
         q: qd.c,
         a1: qd.a1,
         a2: qd.a2,
         right: qd.right,
         score: forPlayers[i].score,
         qn: forPlayers[i].qnumber
       };
     
      if (forPlayers[i].status !== 0) {
        
          io.to(hisid).emit('question', qdata);
        
        
        
        forPlayers[i].qdata = qdata;
        forPlayers[i].qnumber++;
      }
       

      
      
      }
    }
}



function Player(id){
  this.id = id;
  this.status = 'menu';
  this.score = 69;
  this.qnumber = 0;
  this.seed;
  // this.qhistory = [];
}

// function randomSeeded(s) {
//   let s = Math.sin(s) * 10000;
//   return s - Math.floor(s);
// };


function GetaQuestion(){
  let qnr = slovicka[Math.floor(Math.random()*slovicka.length)];
  let a1 = slovicka[Math.floor(Math.random() * slovicka.length)].n;
  while(a1 === qnr.n){
    a1 = slovicka[Math.floor(Math.random() * slovicka.length)].n;
  }
  let a2;
  let right = qnr.n;

  if(Math.random() >= 0.5){
    a2 = qnr.n;
  } else {
    a2 = a1;
    a1 = qnr.n;
    
  }
  console.log(qnr.c,a1,a2,right);

  
   return {
     c:qnr.c,a1,a2,right
   }
}

setTimeout(e => {
  http.listen(8080, function () {
    console.log('listening on *:80');
  });
}, 100);

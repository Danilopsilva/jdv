const player1 = "1";
const player2 = "2";
var playTime = player1;
var gameOver = false;
var count = 0;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
const cell = document.getElementsByClassName("cell");


refreshPainel();
initCell();

if(gameOver!=true)
    loadScore();


function refreshPainel(){

    if(gameOver){return;}

    if(playTime == player1){
        let player = document.querySelectorAll("div#painel p")[0];
        player = document.getElementById("player").innerHTML = player1; 

    }else{
        let player = document.querySelectorAll("div#painel p")[0];
        player = document.getElementById("player").innerHTML = player2; 

    }
}


function initCell(){

    for (let i = 0; i < cell.length; i++) {
       cell[i].addEventListener("click", function(){

        if(gameOver) {return;}

        if(this.getElementsByTagName("img").length == 0){
            if(playTime == player1){
                this.innerHTML = "<img src='imagens/X.jpg' height='50px'>";
                this.setAttribute("shot", player1);
                playTime = player2;
            }else{
                this.innerHTML = "<img src='imagens/O.jpg' height='50px'>";
                this.setAttribute("shot", player2);
                playTime = player1;
            }

            refreshPainel();
            checkWinner();
         }
        }
       );
    }
}

async function checkWinner(){
   let a1 = document.getElementById("a1").getAttribute("shot");
   let a2 = document.getElementById("a2").getAttribute("shot");
   let a3 = document.getElementById("a3").getAttribute("shot");
    
   let b1 = document.getElementById("b1").getAttribute("shot");
   let b2 = document.getElementById("b2").getAttribute("shot");
   let b3 = document.getElementById("b3").getAttribute("shot");

   let c1 = document.getElementById("c1").getAttribute("shot");
   let c2 = document.getElementById("c2").getAttribute("shot");
   let c3 = document.getElementById("c3").getAttribute("shot");


    let winner = "";

    if((a1 == b1 &&  a1==c1)  || (a1 == a2 &&  a1==a3) || (a1 == b2 &&  a1==c3) && a1!=""){
        winner = a1;
    }
    else if((b2 == b1 &&  b2==b3)  || (b2 == a2 &&  b2==c2) || (b2 == a3 &&  b2==c1)&& b2!=""){
        winner = b2;

    }else if((c3 == b3 &&  c3 == a3)  || (c3 == c2 &&  c3 == c1)  && c3!="" ){
        winner = c3;

    }
    
    if(winner!=""){
        gameOver = true;
        await sleep(70);
        alert("O Jogador " +  winner + " Venceu");
        updateScore(winner);
    }

    count++;
    draw(winner, count);
}

async function draw(winner, count){

    if(winner == "" && count == 9){
        await sleep(70);
        alert("Vish, Deu Velha!");
    }
}

function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

function refresh(){
    gameOver = false;
    document.location.reload();
}

function endGame(){
    gameOver = true;
    document.location.reload();
    localStorage.clear();
}


function loadScore(){
    let x = document.getElementById("scorePlayer1");
    x.innerHTML = localStorage.getItem("scorePlayer1");

    let o = document.getElementById("scorePlayer2");
    o.innerHTML = localStorage.getItem("scorePlayer2");
}

function updateScore(winner){
    if(winner == player1){
        let x = document.getElementById("scorePlayer1");
        if(!localStorage.getItem("scorePlayer1")){
            ++scorePlayer1;
            x.innerHTML =   scorePlayer1;
            localStorage.setItem("scorePlayer1",scorePlayer1);
        }else{
            scorePlayer1 = parseInt(localStorage.getItem("scorePlayer1")) + 1;
            localStorage.setItem("scorePlayer1",scorePlayer1);
            x.innerHTML =   scorePlayer1;

        }
    }else{
        let o = document.getElementById("scorePlayer2");
        if(!localStorage.getItem("scorePlayer2")){
            ++scorePlayer2;
            o.innerHTML =   scorePlayer2;
            localStorage.setItem("scorePlayer2",scorePlayer2);
        }else{
            scorePlayer2 = parseInt(localStorage.getItem("scorePlayer2")) + 1;
            localStorage.setItem("scorePlayer2",scorePlayer2);
            o.innerHTML =   scorePlayer2;

        }
    }

}

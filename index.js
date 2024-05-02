
'use strict ';

// day1

const restart=document.querySelector('.restart');
const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gamearea = document.querySelector('.gamearea');

console.log(score, startscreen, gamearea);

// ____________________________________________

startscreen.addEventListener('click', start);
// restart.addEventListener('click', start);

let player = {
    speed: 5 ,
    score:0,
};

// _________________________________________


function isCollide(a,b) {
    aRect= a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();


    return !((aRect.bottom <bRect.top)|| (aRect.top > bRect.bottom)|| (aRect.right <bRect.left)|| (aRect.left > bRect.right));



}


function movelines() {
    let lines = document.querySelectorAll('.lines');

    // 
    lines.forEach(function (item) {
        if (item.y >= 750) {
            // console.log("select lines");
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = `${item.y}px`;

    })
}

function endGame(){
    player.start=false;
    startscreen.classList.remove('hide');
    gamearea.classList.add('hide');
   
}


function moveEnemy(cargo) {
    let enemy = document.querySelectorAll('.enemy');

    // 
    enemy.forEach(function (item) {

        if(isCollide(cargo,item)){
            console.log("boom hit");
            endGame();
        }
        if (item.y >= 750) {
            // console.log("select lines");
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 330) + "px";
        }

        item.y += player.speed;
        item.style.top = `${item.y}px`;

    })
}
// ________________________________________________

function start() {
    player.start = true;
    player.score=0;
    gamearea.classList.remove('hide');
    startscreen.classList.add('hide');
   

    // let roadline=document.createElement('div');
    // roadline.setAttribute('class','lines');
    // gamearea.appendChild(roadline);


    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = 'hey i am your car';
    gamearea.appendChild(car);





    console.log("top " + car.offsetTop);
    console.log("left " + car.offsetLeft);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    window.requestAnimationFrame(gameplay);


    for (x = 0; x < 5; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + "px";



        gamearea.appendChild(roadline);


    }

    // ****enemy car

    for (x = 0; x < 3; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        enemycar.y = ((x + 1) * 350) * -1;
        enemycar.style.top = enemycar.y + "px";
        // enemycar.style.backgroundColor = 'blue';

   
        enemycar.style.left = Math.floor(Math.random() * 330) + "px";


        // enemycar.style.backgroundImage="url('blue.jpeg')"; 

        if(x===0){
            enemycar.style.backgroundImage="url('blue.jpeg')"; 

        }
        else if (x===2){
            enemycar.style.backgroundImage="url('red.jpeg')";

        }
        else { 
            enemycar.style.backgroundImage="url('gray.jpeg')";

        }


        // if(enemycar.style.left>15+'px'&&enemycar.style.left<200+'px'){
        //     enemycar.style.backgroundImage="url('blue.jpeg')";

        // }
        // else{
        //     enemycar.style.backgroundImage="url('golden.jpeg')";

        // }

       

        gamearea.appendChild(enemycar);


    }




   





}


function gameplay() {

   
    console.log("game is start");

    let cargo = document.querySelector('.car');

    let road = gamearea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {
        movelines();
        moveEnemy(cargo);
        if (key.ArrowUp && player.y > 100) {
            player.y -= player.speed;
        }
        if (key.ArrowDown && player.y < 600) {
            player.y += player.speed;
        }
        if (key.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (key.ArrowRight && player.x < 320) {
            player.x += player.speed;
        }

        cargo.style.top = player.y + "px";
        cargo.style.left = player.x + "px";



        window.requestAnimationFrame(gameplay);
        // console.log(player.score ++);
        player.score++;
        score.innerText=" your score is:"+player.score;

    }
    // 
}

const key = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,

}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);




function keydown(e) {
    // console.log("key was presssed");
    // console.log(e.key);
    key[e.key] = true;
    // console.log(key);

}
function keyup(e) {
    key[e.key] = false;
    // console.log("key was presssed");
    // console.log(e.key);

}




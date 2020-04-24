/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, currentPlayer, currentScore, winningScore, gameActive;

resetGame()


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gameActive){
        // 1. show dice
        document.querySelector('.dice').style.display = 'block';

        // 2. generate random number and update dice
        var randomDice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').src = 'dice-' + randomDice + '.png';

        //3. update current score if it is not 1
        if(randomDice !== 1) {
            currentScore += randomDice;
            document.getElementById('current-' + currentPlayer).textContent = currentScore;
        } else {
            //change player an reset current score
            togglePlayer()
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameActive) {
        // 1. add score
        score[currentPlayer] += currentScore

        // 2. update UI
        document.getElementById('score-' + currentPlayer).textContent = score[currentPlayer];

        // 3. winner if more than 20
        if(score[currentPlayer] >= winningScore) {
            document.getElementById('name-'+ currentPlayer).textContent = 'winner!'
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ currentPlayer +'-panel').classList.remove('active');
            document.querySelector('.player-'+ currentPlayer +'-panel').classList.add('winner');
            gameActive = false
        } else {
            togglePlayer();            
        }
    }
});

// New game
document.querySelector('.btn-new').addEventListener('click',resetGame);



//change player
function togglePlayer(){
    setTimeout(function () {
        currentScore = 0;
        document.getElementById('current-' + currentPlayer).textContent = currentScore;
        currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
    }, 200);
}



// Reset everything
function resetGame() {

    // reset game scores
    score = [0,0];
    currentPlayer = 0;
    currentScore = 0;
    gameActive = true;
    winningScore = 20;

    // reset players scores
    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // delete all style
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // add default style
    document.querySelector('.player-0-panel').classList.add('active');

    // rename default value
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';
    
}
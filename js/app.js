/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
//function shuffle(array) {
//    var currentIndex = array.length,
//        temporaryValue, randomIndex;
//
//    while (currentIndex !== 0) {
//        randomIndex = Math.floor(Math.random() * currentIndex);
//        currentIndex -= 1;
//        temporaryValue = array[currentIndex];
//        array[currentIndex] = array[randomIndex];
//        array[randomIndex] = temporaryValue;
//    }
//    return array;
//}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/********************************************************MEMORY GAME************************************************************/






//'use strict';
// *************** GLOBAL VARIABLES***************

(function(){
    'use strict';

let allCards = [];
let arrayCards = [];
let allSymbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
const fullStarsList = document.querySelectorAll('.full-star');
const fullStar = `<li><i class=" fa fa-star"></i></li>`;
const emptyStar = `<li><i class="fa fa-star-o"></i></li>`;
let cardsArray = [];
let num = 0;
const restartButton = document.querySelector('.fa-repeat');
const letsPlayButton = document.querySelector('.start-button');
const letsTryAgainButton = document.querySelector('.retry-button');
const anotherRoundButton = document.querySelector('.startAgain');
const gameTime = 60000;
let firstThird;
let secondThird;
const timerInstance = new easytimer.Timer();
let stopTime;


// ***************Starting The Game function ***************

function startGame() {
    generateRandomCards();
    const deck = document.getElementById('deck-id');
    deck.classList.remove('hidden-deck');
    const panel = document.getElementById('panel');
    panel.classList.remove('hidden-panel');
    const matchingH1 = document.getElementById('matching-h1');
    matchingH1.classList.remove('hidden-h1');
    const start = document.getElementById('start-id');
    start.classList.add('start-hidden');
    restart();
    timeSetting();
    //***************RESTARTING TIME BY PUSHING RESTART BUTTON**********************
    function restartButtonAction() {
        clearTimeout(firstThird);
        clearTimeout(secondThird);
        timerInstance.reset();
        startGame();
        restartButton.removeEventListener('click', restartButtonAction);
    }

    restartButton.addEventListener('click', restartButtonAction);
    gameMecanism();

}

// ***************Game Mecanics function ***************

function gameMecanism() {

    for (const card of allCards) {

        function checkAndMatch() {

            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                incrementing();
                card.classList.add('open', 'show');
                cardsArray.push(card);
                if (cardsArray.length == 2) {
                    const card1 = cardsArray[0].firstElementChild;
                    const card2 = cardsArray[1].firstElementChild;
                    // *************** WHEN TWO CARDS MATCH ***************
                    if (card1.className === card2.className) {
                        for (const openCard of cardsArray) {
                            openCard.classList.remove('open', 'show')
                            openCard.classList.add('match');
                        }
                        cardsArray = [];

                        // *************** WHEN TWO CARDS DO NOT MATCH ***************
                    } else {

                        for (const cards of cardsArray) {
                            setTimeout(function () {
                                cards.classList.remove('open', 'show');

                                cards.classList.remove('wrong-guess');

                            }, 700);

                            cards.classList.add('wrong-guess');

                        }
                        cardsArray = [];
                    }
                }
            }
            congratulations();
        }
        card.addEventListener('click', checkAndMatch);
    }

}

// *************** Shuffle function***************
function shuffle(array) {
    let shuffledAllSymbols = [];
    let counter = array.length;
    let testArray = [];
        while (counter != 0) {
        const index = Math.floor(Math.random() * array.length);
        if (testArray.includes(index)) {
            testArray.pop();
            counter++;
        } else {
            testArray.push(index);
            counter--;
        }
    }
    for (let i = 0; i < testArray.length; i++) {
        shuffledAllSymbols.push(array[testArray[i]]);
            
    }
    for(let j=0; j<shuffledAllSymbols.length; j++){
        array[j]=shuffledAllSymbols[j];
             
    }
    testArray = [];
    return array;

}

// *************** Generate random Card Deck function***************

function generateRandomCards() {

    const deck = document.getElementById('deck-id');
        shuffle(allSymbols);

    for (let i = 0; i <= 15; i++) {
        const singleCard = `<li class="card"><i class="fa ${allSymbols[i]}"></i></li>`;
        arrayCards.push(singleCard);
    }
    deck.innerHTML = arrayCards.join('');
    arrayCards = [];
    return allCards = document.querySelectorAll('.card');
}

// *************** The incrementing function ***************
function incrementing() {
    num++;
    const moves = document.querySelector('.moves');
    moves.innerHTML = `${num}`;
}

// ***************Reseting the Game function***************
function restart() {
    num = 0;
    const moves = document.querySelector('.moves');
    moves.innerHTML = `${num}`;
    for (const star of fullStarsList) {
        star.innerHTML = fullStar;
    }
    for (const card of allCards) {
        card.classList.remove('match');
    }
}

// ***************letsTryAgain  function ***************

function letsTryAgain() {
    const deck = document.getElementById('deck-id');
    deck.classList.add('hidden-deck');
    const panel = document.getElementById('panel');
    panel.classList.add('hidden-panel')
    const matchingH1 = document.getElementById('matching-h1');
    matchingH1.classList.add('hidden-h1');
    const retry = document.getElementById('retry');
    retry.classList.remove('retry-close');
    //***********Function for eventListener bellow*******************************
    function letsTryAgainAction() {
        clearTimeout(firstThird);
        clearTimeout(secondThird);
        timerInstance.reset();
        startGame();
        retry.classList.add('retry-close');
        letsTryAgainButton.removeEventListener('click', letsTryAgainAction);
    }
    //*******************************************************************
    letsTryAgainButton.addEventListener('click', letsTryAgainAction);
}


//***************SETTING THE TIME with timeSetting function**********************

function timeSetting() {
    const timePanel = document.getElementById('basicUsage');
    timerInstance.start({
        countdown: true,
        startValues: {
            seconds: 60
        }
    });

    //************Function for eventListener bellow*********************
    function insertTimeCount() {
        timePanel.innerHTML = timerInstance.getTimeValues();
    }
    //*******************************************************************
    timerInstance.addEventListener('secondsUpdated', insertTimeCount);
    timerInstance.addEventListener('targetAchieved', function () {
        timerInstance.removeEventListener('secondsUpdated', insertTimeCount);
        letsTryAgain();
    });
    //******Setting the Stars appearance according to the Time ****
    firstThird = setTimeout(function () {
        fullStarsList[0].innerHTML = emptyStar;
        fullStarsList[3].innerHTML = emptyStar;
    }, (1 / 3 * gameTime));

    secondThird = setTimeout(function () {
        fullStarsList[1].innerHTML = emptyStar;
        fullStarsList[4].innerHTML = emptyStar;

    }, (2 / 3 * gameTime));
    //***************************************************************
}

//***************Congratulation function**********************
function congratulations() {
    const testArray = [];
    const timePanel2 = document.getElementById('basicUsage2');
    for (const testCard of allCards) {
        if (testCard.classList.contains('match')) {
            testArray.push(testCard);
            if (testArray.length == 16) {
                clearTimeout(firstThird);
                clearTimeout(secondThird);
                const deck = document.getElementById('deck-id');
                deck.classList.add('hidden-deck');
                const panel = document.getElementById('panel');
                panel.classList.add('hidden-panel')
                const matchingH1 = document.getElementById('matching-h1');
                matchingH1.classList.add('hidden-h1');
                const retry = document.getElementById('retry');
                retry.classList.add('retry-close');
                const youDidIt = document.getElementById('congratulation');
                youDidIt.classList.remove('congratulation-hidden');
                timerInstance.pause();
                timePanel2.innerHTML = `${timerInstance.getTimeValues()}`;

                //      ***********Function for eventListener bellow*************
                function anotherRoundButtonAction() {
                    clearTimeout(firstThird);
                    clearTimeout(secondThird);
                    timerInstance.reset();
                    startGame();
                    youDidIt.classList.add('congratulation-hidden');
                    anotherRoundButton.removeEventListener('click', anotherRoundButtonAction);
                }
                //      **************************************************
                anotherRoundButton.addEventListener('click', anotherRoundButtonAction);

            }


        }

    }

}

letsPlayButton.addEventListener('click', startGame);
    
    }());
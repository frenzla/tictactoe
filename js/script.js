/*
0   1   2
3   4   5
6   7   8
 */

function gameboard() {
    const gameboard = [];
    const winningCombination = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
    ];
    
    let marksX = [];
    let marksO = [];
    let gameIsOn = true;

    const addMark = function(player) {
        let markPosition = null;
        let inputPositon= prompt(`${gameControl.giveTurn()}: select your placement (0-8)`);
        if (inputPositon===null) {
            gameIsOn = false;
        } else {
            markPosition = Number(inputPositon);
            if (checkExisting(markPosition)) {
                if (player==="X") {
                    marksX.push(markPosition);
                    console.log(marksX);
                } else {
                    marksO.push(markPosition);
                    console.log(marksO);
                };
            }
        }
    }

    function checkExisting(markPosition) {
        if (marksX.includes(markPosition) || marksO.includes(markPosition)) {
            console.log("This place is already taken");
            gameControl.changeTurn();
            return false;
        } else {
            return true;
        }
    }

    const checkBoard = function() {
        console.log(`marksX: ${marksX}`);
        console.log(`marksO: ${marksO}`);

        for (const array of winningCombination) {
            if (array.every(elem => marksX.includes(elem))) {
                console.log('marksX wins');
                gameIsOn = false;
                return marksX;
            } else if (array.every(elem => marksO.includes(elem))) {
                console.log('marksO wins');
                gameIsOn = false;
                return marksO;
            } else {
                if ((marksX.length+marksO.length) === 9) {
                    console.log('DRAW!');
                    gameIsOn = false;
                } else {
                    console.log('No win yet');
                }
            }
        }
    }

    const giveStatus = function() {
        return gameIsOn;
    }

    const giveGameboard = function() {
        return gameboard;
    }

    return {winningCombination, addMark, giveGameboard, checkBoard, giveStatus};
}

function player(mark) {
    let points = 0;
    
    const increasePoints = () => points++;
    
    const tellPoints = () => points;

    return {mark, increasePoints, tellPoints};
}

function play() {
    let playerTurn = 'O';

    const changeTurn = function() {
        if (playerTurn==='X') {
            playerTurn = 'O'
        } else {
            playerTurn = 'X'
        };
        return playerTurn;
        };

    const giveTurn = () => playerTurn;

    return {playerTurn, giveTurn, changeTurn};
}

function controlsDom() {
    
    const generateGrid = function() {
        const container = document.getElementById("container");
        const board = document.createElement('div');
        board.setAttribute('id', 'board');
        for (i=0; i<9; i++) {
                const placeholderMark = document.createElement('button');
                placeholderMark.setAttribute('data-placeholderMark', i);
                placeholderMark.classList.add ('placeholderMark');
                placeholderMark.setAttribute('type', 'button');
                board.appendChild(placeholderMark);
        }
        container.appendChild(board);
    }
    
    return {generateGrid};
}

let domController = controlsDom();
let gameBoard = gameboard();
let gameControl = play();
let playerX = player('X');
let playerO = player('O');

const button = document.getElementById('launch');
button.addEventListener('click', launchGame);

function launchGame() {
    domController.generateGrid();
    while (gameBoard.giveStatus()) {
    gameControl.changeTurn();
    gameBoard.addMark(gameControl.giveTurn());
    gameBoard.checkBoard();
}
}
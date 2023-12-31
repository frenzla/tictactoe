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

    const addMark = function(player, placeholder) {
        const markPosition = Number(placeholder);
        if (checkExisting(markPosition)) {
            if (player==="X") {
                marksX.push(markPosition);
                domController.showMark(placeholder, player);
                const button = document.querySelector(`[data-placeholderMark="${placeholder}"]`);
                button.disabled = true;
            } else {
                marksO.push(markPosition);
                const button = document.querySelector(`[data-placeholderMark="${placeholder}"]`);
                button.disabled = true;
                domController.showMark(placeholder, player);
            };
        }
    };

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
        const turns = marksX.length+marksO.length;
        for (const array of winningCombination) {
            if (array.every(elem => marksX.includes(elem))) {
                const result = document.getElementById('result');
                result.textContent = 'X wins!!! Well Done!';
                gameIsOn = false;
                return marksX;
            } else if (array.every(elem => marksO.includes(elem))) {
                const result = document.getElementById('result');
                result.textContent = 'O wins!!! Well Done!';
                gameIsOn = false;
                return marksO;
            } else if ((turns) === 9) {
                const result = document.getElementById('result');
                result.textContent = "It's a draw!";
                gameIsOn = false;
            }
        }
    }

    const giveStatus = function() {
        return gameIsOn;
    }

    const giveGameboard = function() {
        return gameboard;
    }

    const resetGame = function() {
        marksX = [];
        marksO = [];
        gameIsOn = true;
        const result = document.getElementById('result');
        result.textContent = "";
        const slots = document.querySelectorAll("#board > button");
        slots.forEach((slot) => {
            slot.textContent = '';
            slot.disabled = false;
        });

    };

    return {winningCombination, resetGame, addMark, giveGameboard, checkBoard, giveStatus};
}

/* function player(mark) {
    let points = 0;
    
    const increasePoints = () => points++;
    
    const tellPoints = () => points;

    return {mark, increasePoints, tellPoints};
} */

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

    const showMark = function(slot, player) {
        const button = document.querySelector(`[data-placeholderMark="${slot}"]`);
        button.textContent = player;
    }

    return {generateGrid, showMark};
}

let domController = controlsDom();
let gameBoard = gameboard();
let gameControl = play();
/* let playerX = player('X');
let playerO = player('O'); */

const button = document.getElementById('launch');
button.addEventListener('click', launchGame);
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', ()=>{
    gameBoard.resetGame();
});

function launchGame() {
    button.style.display = 'none';
    resetButton.style.display = 'block';
    domController.generateGrid();
    const slots = document.querySelectorAll("#board > button");
    slots.forEach((slot) => {
        slot.addEventListener('click', function(e) {
            let placeholder = e.target.getAttribute('data-placeholderMark');
            if (gameBoard.giveStatus()) {
                gameControl.changeTurn();
                gameBoard.addMark(gameControl.giveTurn(), placeholder);
                gameBoard.checkBoard();
            };
        });
    });
}
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

    const addMark = function(player) {
        let markPosition = prompt("Select your placement (0-8)");
        if (player==="X") {
            marksX.push(markPosition);
            console.log(marksX);
        } else {
            marksO.push(markPosition);
            console.log(marksO);
        };
    }

    return {gameboard, addMark};
}

function player(mark) {
    let points = 0;
    
    const increasePoints = () => points++;
    
    const tellPoints = () => points;

    return {mark, increasePoints, tellPoints};
}

function play() {
    let playerTurn = 'X';

    const changeTurn = function() {
        if (playerTurn==='X') {
            playerTurn = 'O'
        } else {
            playerTurn = 'X'
        };
        return playerTurn;
        };

    return {playerTurn, changeTurn};
}

let gameBoard = gameboard();
let gameControl = play();
let playerX = player('X');
let playerO = player('O');

gameBoard.addMark(play.PlayerTurn);
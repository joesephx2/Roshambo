// Take command line arguement
//#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
 .usage("Usage: --m=<move>")
 .option("m", { alias: "move", describe: "Your move", type: "string", demandOption: true })
 .argv;


// validating argument
const validMoves = ['rock', 'paper', 'scissors'];
function checkArg (arg) {
    if(!validMoves.includes(arg)) {
      return console.log('invalid move');
    } else {
      console.log(arg)
    }
}
checkArg(options.move)
// Computer chooses random rock paper or scissors

class Game {
    //provide outcome of roshambo game
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;    
    }
    p1Result() {
        if(this.p1.getMove === 'rock') return this.rockVs(this.p2.getMove)
        else if(this.p2.getMove === 'paper') return this.paperVs(this.p2.getMove)
        else return this.scissorsVs(this.p2.getMove)                 
    }

    genResult() {
        let result = this.p1Result()
        if(result === 'Win') return printWinMsg(this.p1)
        else if(result === 'Lose') return printWinMsg(this.p2)
        else return result

        function printWinMsg (player) {
            return `~${player.getName} wins.~`
        }        

    }

    rockVs(oppoent) {
        if(oppoent === 'rock') return 'Draw'
        else if(oppoent === 'paper') return 'Lose'
        else return 'Win'
    }

    paperVs(oppoent) {
        if(oppoent === 'papper') return 'Draw'
        else if(oppoent === 'scissors') return 'Lose'
        else return 'Win'
    }

    scissorsVs(oppoent) {
        if(oppoent === 'scissors') return 'Draw'
        else if(oppoent === 'rock') return 'Lose'
        else return 'Win'
    }

    printResult() {
        console.log(`${this.p1.getName} plays ${this.p1.getMove}!`);
        console.log(`${this.p2.getName} plays ${this.p2.getMove}!`);
        console.log(this.genResult());
    }

}

class Player{
    //provide player's move
    constructor(move) {
        this.move = move;
        this.name = 'Player';
    }
    get getMove() {
        return this.move;
    }

    get getName() {
        return this.name;
    }

}

class ComputerPlayer extends Player{
    //provide player's move randomly
    constructor() {
        super();
        this.name = 'Computer'
        this.move = this.getRanMove;
    }
    get getRanMove() {
        return validMoves[Math.floor(Math.random()*3)]   //generate integer between 0 and 2 & both 0 and 2 are inclusive     
    }
}

let player = new Player(options.move);
let cpu = new ComputerPlayer()
let game = new Game(player, cpu);

// assess who won
// print winner

game.printResult();

// node main.js --move=rock
// Playing a game of Roshambo against the computer.
// Player plays rock!
// Computer plays paper!
// ~Computer wins.~
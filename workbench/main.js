const KEY_SPACE = 32;   // Next phase
const KEY_R = 114;      // Reset game

const PLAYER = 1;
const ADVERSARY = 0;

var currentRound;
var activeSide;
var sideSwitchTick;     // How many phases until side switch?    
var currentPhase;
var phases = [];

const PLAYER_PHASES_COUNT = 6;
var playerPhases = [
  "Hero Phase: Cast spells and use heroic abilities.", 
  "Movement Phase: Move units across the battlefield.", 
  "Shooting Phase: Attack with misile weapons.",
  "Charge Phase: Charge units into combat.",
  "Combat Phase: Both sides take turns to pile in and attack with melee weapons.",
  "Battleshock Phase: Both sides take turns to test the resolve of depleted units.",
];
const ADVERSARY_PHASES_COUNT =3;
var adversaryPhases = [
  "Action Phase: Activate Adversary units with behavior rolls.",
  "Combat Phase: Both sides take turns to pile in and attack with melee weapons.",
  "Battleshock Phase: Both sides take turns to test the resolve of depleted units.",
];
const PHASES_COUNT = PLAYER_PHASES_COUNT + ADVERSARY_PHASES_COUNT;

var endOfTurnReminders = [];


function handleKey(event){
  var myKey = event.keyCode;
  //console.log(myKey);
  switch (myKey){
    case KEY_SPACE:
      advanceGame();
      break;
    case KEY_R:
      resetGame();
      break;
    default:
      
  }
}

function resetGame(){
  endOfTurnReminders = [];
  if (REINFORCEMENTS_ENABLED == true){
    endOfTurnReminders.push("Roll for reinforcements")
  }
  currentRound = 1;
  newRound();
  outputStatus();
}

function advanceGame(){
  if (currentPhase + 1 < PHASES_COUNT){
    ++currentPhase;
    --sideSwitchTick;
    if (sideSwitchTick == 0) {
      if (activeSide == PLAYER) {
        activeSide = ADVERSARY;
      } else {
        activeSide = PLAYER;
      }
    }
  } else {
    ++currentRound;
    newRound();
  }
  outputStatus();
}

function newRound(){
  activeSide = rollOff();
  if (activeSide == PLAYER){
    phases = playerPhases.concat(adversaryPhases);
    sideSwitchTick = PLAYER_PHASES_COUNT;
  } else {
    phases = adversaryPhases.concat(playerPhases);
    sideSwitchTick = ADVERSARY_PHASES_COUNT;
  }
  currentPhase = 0;
}

function outputStatus(){
  var x = document.getElementById('output');
  x.innerHTML = "Current Battle Round: " + currentRound;
  if (activeSide == PLAYER){
    x.innerHTML += "<br>Active Side: The Player";
  } else {
    x.innerHTML += "<br>Active Side: The Adversaries";
  }
  x.innerHTML += "<br>" + phases[currentPhase];
}

function rollOff(){
  var side = Math.floor(Math.random() * 2);
  return side;
}


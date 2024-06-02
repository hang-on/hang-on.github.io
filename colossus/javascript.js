
// Called by <body> onload and by 'initialize deck' button.
function initialize(){
  var drawPile = localStorage.getItem("drawPile");
  if (drawPile === null){
    drawPile = createPile(drawPileRecipe);
    shuffle(drawPile);
    localStorage.setItem("drawPile", drawPile);
  } else {
    drawPile = drawPile.split(",");
  }
  var x = document.getElementById('drawPile');
  x.src = drawPile[drawPile.length-1];
  var x = document.getElementById('display');
  x.src = "images/discardPile.jpg";
  displayDeckStatus(drawPile);
}
function createPile(recipe){
  // Uses the recipe data format.
  var pile = new Array();
  var i;
  var j;
  var k = 0;
  var itemSize = recipe[0]; // Get it from the header, as per data format.
  for (i = 2; i < recipe.length; i+=itemSize){
    for (j = 0; j < recipe[i+1]; j++){
      pile.push(recipe[i]);
    }
  }
  pile.push(recipe[1]) // Add the cardback as the last card.
  return pile;
}
function shuffle(deck){
  // for 1000 turns, switch the values of two random cards.
  var cardback = deck.pop(); // Get rid of cardback
  for (var i = 0; i < 1000; i++){
    var location1 = Math.floor((Math.random() * deck.length));
    var location2 = Math.floor((Math.random() * deck.length));
    var tmp = deck[location1];
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  deck.push(cardback); // Restore cardback
}
function drawCard(drawPileItem, displayItem){
  // Draw a card from the specified drawpile, and display it in the
  // specified item.

  // Return the topmost card from the specified pile.
  var pile = localStorage.getItem(drawPileItem);
  pile = pile.split(",");
  // Check if nothing but the cardback remains:
  if (pile.length <= 1) {
    alert("Pile is empty!");
    return;
  } else {
    var card = pile.shift();
    localStorage.setItem(drawPileItem, pile);
    // Show the card in the display item
    var x = document.getElementById(displayItem);
    x.src = card;
    displayPileStatus(pile);
  }
}
function displayPileStatus(pile){
  var x = document.getElementById('drawPileStatus');
  x.innerHTML = "Cards left in Draw Pile: " + (pile.length - 1);
}
function handleInitializeButton(pile){
  localStorage.removeItem(pile); // Trigger refresh.
  initialize();
  displayPileStatus(pile);
}
// The recipe for the event deck.
// deck[0] = itemsize, deck[1] = image of card back,
// deck[2] = card type image, deck [3] number of cards of this type, etc...
drawPileRecipe = [
    2, "images/cardback.JPG",
    "images/walker_1.jpg", 1,
    "images/walker_2.jpg", 1,
    "images/walker_3.jpg", 1,
    "images/walker_4.jpg", 1,
    "images/walker_5.jpg", 1,
    "images/walker_6.jpg", 1,
    "images/killteam.jpg", 1,

]

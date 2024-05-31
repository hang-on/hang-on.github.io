// Project constants

// Here we have the global object with settings.
dashboard = {
    config:{
        prop:1
    },
    settings:{
        currentHero:0
    },
    menuItems:["...", "...",
      "...", "..."],
    widgets:{
        List: function(props){},
        Item: function(props){}
    }
}
// Called by <body> onload and by 'initialize deck' button.
function initialize(){
  var eventDeck = localStorage.getItem("eventDeck");
  if (eventDeck === null){
    eventDeck = createDeck(eventDeckRecipe);
    shuffle(eventDeck);
    localStorage.setItem("eventDeck", eventDeck);
  } else {
    eventDeck = eventDeck.split(",");
  }
  var x = document.getElementById('eventDeck');
  x.src = eventDeck[eventDeck.length-1];
  var x = document.getElementById('discardPile');
  x.src = "images/discardPile.jpg";
  displayDeckStatus(eventDeck);
}
function createDeck(deckRecipe){
  // Uses the deck recipe data format.
  var deck = new Array();
  var i;
  var j;
  var k = 0;
  var itemSize = deckRecipe[0]; // Get it from the header, as per data format.
  for (i = 2; i < deckRecipe.length; i+=itemSize){
    for (j = 0; j < deckRecipe[i+1]; j++){
      deck.push(deckRecipe[i]);
    }
  }
  deck.push(deckRecipe[1]) // Add the cardback as the last card.
  return deck;
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
function drawEvent(){
  // Return the topmost card from the event deck.
  var deck = localStorage.getItem("eventDeck");
  deck = deck.split(",");
  // Check if nothing but the cardback remains:
  if (deck.length <= 1) {
    alert("Deck is empty!");
    return;
  } else {
    var card = deck.shift();
    localStorage.setItem("eventDeck", deck);
    // Show the card on top of the discard pile:
    var x = document.getElementById('discardPile');
    x.src = card;
    displayDeckStatus(deck);
  }
}
function displayDeckStatus(deck){
  var x = document.getElementById('deckStatus');
  x.innerHTML = "Cards left in deck: " + (deck.length - 1);
}
function handleInitializeButton(){
  localStorage.removeItem("eventDeck"); // Trigger a deck refresh.
  initialize();
}
// The recipe for the event deck.
// deck[0] = itemsize, deck[1] = image of card back,
// deck[2] = card type image, deck [3] number of cards of this type, etc...
eventDeckRecipe = [
    2, "images/cardback.JPG",
    "images/walker_1.jpg", 1,
    "images/walker_2.jpg", 1,
    "images/killteam.jpg", 1,
]

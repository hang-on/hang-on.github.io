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
// Called by <body> onload.
function initialize(){
  var eventDeck = localStorage.getItem("eventDeck");
  if (eventDeck === null){
    eventDeck = createDeck(eventDeckRecipe);
    // TODO: Add shuffle.
    // Show card back:
    var x = document.getElementById('eventDeck');
    x.src = eventDeck[eventDeck.length-1];
  }
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
  deck.push(deckRecipe[1]) // Add the card back as the last card.
  return deck;
}
// The recipe for the event deck.
// deck[0] = itemsize, deck[1] = image of card back,
// deck[2] = card type image, deck [3] number of cards of this type, etc...
eventDeckRecipe = [
    2, "images/event-cardback.JPG",
    "images/event-nothing.JPG", 10,
    "images/event-ambush.JPG", 3
]

// Project constants

// Here we have the global object with settings.
dashboard = {
    config:{
        prop:1
    },
    settings:{
        currentHero:0
    },
    menuItems:["Events", "Grots",
      "Acolytes", "Horrors"],
    widgets:{
        List: function(props){},
        Item: function(props){}
    }
}
// Called by <body> onload.
function initialize(deck){
  initializeDeckMenu();
  var bodyId = document.body.id;
  switch (bodyId){
    case "eventDeck":
      createDeck(eventDeck);
      break;
    default:
      alert("Deck creation error");
      break;
  }
}
function initializeDeckMenu(){
  list = document.getElementById("deckMenu");
  var i;
  for (i = 0; i < dashboard.menuItems.length; i++){
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(dashboard.menuItems[i]));
    list.appendChild(entry);
  }
}
function createDeck(deckData){
  var deck = new Array();
  // Calculate total number of cards.
  var i;
  var itemSize = deckData[0]; // Get it from the header, as per data format.
  var cardsTotal = 0;
  for (i = 2; i < deckData.length; i+=itemSize){
    cardsTotal += deckData[i];
  }
}
// The event deck.
// Deck format: Header + title + cards + etc..., so
// deck[0] = itemsize, deck[1] = title (first card type), deck[2] number of
// cards of this type, [deck 3+] various other entries, i.e. description.
eventDeck = [
    // Header: The first value is the card item size.
    3,
    "Nothing Happens.", 10,
    "No unexpected events this round.",
    "Ambush!", 3,
    "The maddening sound of shrieking birds fills the room, as strange, avian\
    beasts rush towards you from an open portal in the back."

]

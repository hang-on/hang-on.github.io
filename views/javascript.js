

function alertWindowDimension(){
  var w = getWindowWidth();
  var h = getWindowWHeight();
  alert("Width: " + w + " Height: " + h);
}
function getWindowWidth(){
  var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  return w;
}
function getWindowWHeight(){
  var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;
  return h;
}
function initializeHeroPage(){
  // Populate the Hero Menu
  var heroNames = [];
  heroNames = getHeroNames();
  list = document.getElementById("heroMenu");
  var i;
  for (i = 0; i < heroNames.length; i++){
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(heroNames[i]));
    list.appendChild(entry);
  }
}
function getHeroNames(){
  var dummyData = ["Knight-Questor", "Tenebrael Shard",
  "Fyreslayer Doomseeker", "Mistweaver Saih"];
  return dummyData;
}

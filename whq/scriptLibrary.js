
function addOption(element,text){
  var x = document.getElementById(element);
  var option = document.createElement("option");
  option.text = text;
  x.add(option);
}

function populateDropDown(){
  var heroes = new Array("Mistweaver Saih","Tenebrael Shard","Fyreslayer Doomseeker","Knight Questor");
  for (var i=0; i < heroes.length;++i){
    addOption('heroSelect', heroes[i]);
  }
}



//function getHero1() {
  //var x = document.getElementById("hero_1").value;
  //var heroString = localStorage.getItem('hero1');
  //document.getElementById("demo").innerHTML = heroString;
//}


//HTML5 local storage

// Receiving the data:
// localStorage.getItem("variableName");

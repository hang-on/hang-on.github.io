heroPage = {
    config:{
        prop:1
    },
    settings:{
        currentHero:0
    },
    widgets:{
        List: function(props){},
        Item: function(props){}
    }
}
function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}
function getAnswer(modifier, chaosFactor){
  var answer;
  var oracleDice = Math.floor(Math.random() * 12) + 1;
  var oracleScore = oracleDice + modifier;
  var x = Math.floor(Math.random() * 100) + 1
  if (x <= chaosFactor){
    if (isEven(x)){
      oracleScore --;
    } else {
      oracleScore ++;
    }
  }
  //
  if (oracleScore < 1){
    oracleScore = 1;
  } else if (oracleScore > 12) {
    oracleScore = 12;
  }
  switch (oracleScore){
    case 1:
      answer = "No, and...";
    break;
    case 2:
    case 3:
    case 4:
      answer = "No";
    break;
    case 5:
    case 6:
      answer = "No, but...";
    break;
    case 7:
    case 8:
      answer = "Yes, but...";
    break;
    case 9:
    case 10:
    case 11:
      answer = "Yes";
    break;
    case 12:
      answer = "Yes, and...";
    break;
    default:
      answer = "Oracle Error!";
  }
  document.getElementById("answer").innerHTML = "The Oracle seems to be thinking... ";
  setTimeout(function(){ displayAnswer(answer); }, 1500);
}
function displayAnswer(answer){
    document.getElementById("answer").innerHTML = "The answer is: " + answer;
}

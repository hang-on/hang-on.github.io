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
function activateOracle(modifier, chaosFactor, eventFactor){
  var answer = getAnswer(modifier, chaosFactor);
  var unexpectedEvent = getEvent(eventFactor);
  document.getElementById("answer").innerHTML = "The Oracle seems to be thinking... ";
  document.getElementById("event").innerHTML = "... ";
  setTimeout(function(){ document.getElementById("answer").innerHTML = "The answer is: " + answer; }, 1000);
  setTimeout(function(){ document.getElementById("event").innerHTML = unexpectedEvent; }, 1200);
}
function getEvent(eventFactor){
  var x = Math.floor(Math.random() * 100) + 1
  if (x > eventFactor) {
    unexpectedEvent = "...";
  } else {
    eventFocus = getEventFocus();
    eventAction = getAction();
    eventSubject = getSubject();
    unexpectedEvent = "Unexpected Event! Focus: " + eventFocus + ". Meaning: " + eventAction + " of " + eventSubject + ".";
  }
  return unexpectedEvent;
}
function getEventFocus(){
  var x = Math.floor(Math.random() * 14) + 1;
  var eventFocus = "";
  switch (x){
    case 1:
    eventFocus = "Remote event";
    break;
    case 2:
    case 3:
    case 4:
    case 5:
    eventFocus = "NPC Action";
    break;
    case 6:
    eventFocus = "Introduce a new NPC";
    break;
    case 7:
    eventFocus = "Move towards a thread";
    break;
    case 8:
    eventFocus = "Move away from a thread";
    break;
    case 9:
    eventFocus = "Close a thread";
    break;
    case 10:
    eventFocus = "PC negative";
    break;
    case 11:
    eventFocus = "PC positive";
    break;
    case 12:
    eventFocus = "Ambiguous Event";
    break;
    case 13:
    eventFocus = "NPC negative";
    break;
    case 14:
    eventFocus = "NPC positive";
    break;
  }
  return eventFocus;
}
function getAction(){
  var actions = ["Attainment","Starting","Neglect","Fight","Recruit","Triumph","Violate","Oppose","Malice","Communicate",
  "Persecute","Increase","Decrease","Abandon","Gratify","Inquire","Antagonise","Move","Waste","Truce",
  "Release","Befriend","Judge","Desert","Dominate","Procrastinate","Praise","Separate","Take","Break","Heal","Delay","Stop","Lie",
  "Return","Immitate","Struggle","Inform","Bestow","Postpone","Expose","Haggle","Imprison","Release","Celebrate","Develop","Travel",
  "Block","Harm","Debase","Overindulge","Adjourn","Adversity","Kill","Disrupt","Usurp","Create","Betray","Agree","Abuse",
  "Oppress","Inspect","Ambush","Spy","Attach","Carry","Open","Carelessness","Ruin","Extravagance","Trick","Arrive","Propose","Divide",
  "Refuse","Mistrust","Deceive","Cruelty","Intolerance","Trust","Excitement","Activity","Assist","Care","Negligence","Passion","Work Hard",
  "Control","Attract","Failure","Pursue","Vengeance","Proceedings","Dispute","Punish","Guide","Transform","Overthrow","Oppress","Change"];
  return actions[(Math.floor(Math.random() * actions.length))];
}
function getSubject(){
  var subjects = ["Goals","Dreams","Environment","Outside","Inside","Reality","Allies","Enemies","Evil","Good",
  "Emotions","Opposition","War","Peace","The innocent","Love","The spiritual","The intellectual","New Ideas","Joy",
  "Messages","Energy","Balance","Tension","Friendship","The physical","A project","Pleasures","Pain","Possessions","Benefits",
  "Plans","Lies","Expectations","Legal Matters","Bureaucracy","Business","A path","News","Exterior factors","Advice","A plot",
  "Competition","Prison","Illness","Food","Attention","Success","Failure","Travel","Jealousy","Dispute","Home","Investment",
  "Suffering","Wishes","Tactics","Stalemate","Randomness","Misfortune","Death","Disruption","Power","A burden","Intrigues",
  "Fears","Ambush","Rumor","Wounds","Extravagance","A representative","Adversities","Opulence","Liberty","Military","The mundane",
  "Trials","Masses","Vehicle","Art","Victory","Dispute","Riches","Status quo","Technology","Hope","Magic","Illusions","Portals",
  "Danger","Weapons","Animals","Weather","Elements","Nature","The public","Leadership","Fame","Anger","Information"];
  return subjects[(Math.floor(Math.random() * subjects.length))];
}

function getAnswer(modifier, chaosFactor){
  var answer;
  var oracleDice = Math.floor(Math.random() * 12) + 1;
  var oracleScore = oracleDice + modifier;
  var x = Math.floor(Math.random() * 100) + 1;
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
  return answer;
}

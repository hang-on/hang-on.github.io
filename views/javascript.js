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
function initialize(){
}

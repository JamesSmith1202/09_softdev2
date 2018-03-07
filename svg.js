var svg = document.getElementById('mySVG');
var coords = document.getElementById('coords');
var clear = document.getElementById('clear');
var mouseX;
var mouseY;
var radius = 10;
var ns = "http://www.w3.org/2000/svg";

var placeDot = function(e){
    var bounds = svg.getBoundingClientRect();
    mouseX = e.pageX - bounds.left - scrollX;
    mouseY = e.pageY - bounds.top - scrollY;
    var newCircle = document.createElementNS(ns, "circle");
    newCircle.setAttribute("cx", mouseX);
    newCircle.setAttribute("cy", mouseY);
    newCircle.setAttribute("r", radius);
    newCircle.setAttribute("fill", "red");
    newCircle.addEventListener("dblclick", deleteSpawn);
    newCircle.addEventListener("click", changeColor, true);
    svg.appendChild(newCircle);
    coords.value = "["+mouseX+","+mouseY+"]";
    e.stopPropagation();
}

var clearScreen = function(e){
    while(svg.hasChildNodes()){
        svg.removeChild(svg.firstChild);
    }
}

var changeColor = function(e){
    if(this.getAttribute("fill") == "red"){
        this.setAttribute("fill", "green");
    }
    else{
        this.setAttribute("fill", "red");
    }
    e.stopPropagation();
}

var deleteSpawn = function(e){
    svg.removeChild(this);
    var newCircle = document.createElementNS(ns, "circle");
    newCircle.setAttribute("cx", Math.random() * svg.getBoundingClientRect().width);
    newCircle.setAttribute("cy", Math.random() * svg.getBoundingClientRect().height);
    newCircle.setAttribute("r", radius);
    newCircle.setAttribute("fill", "red");
    newCircle.addEventListener("dblclick", deleteSpawn, true);
    newCircle.addEventListener("click", changeColor, true);
    svg.appendChild(newCircle);
    coords.value = "["+mouseX+","+mouseY+"]";
    e.stopPropagation();
}

svg.addEventListener("click", placeDot);
clear.addEventListener("click", clearScreen);
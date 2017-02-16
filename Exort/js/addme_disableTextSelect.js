/*
addMe_disableTextSelect.js

1.0 
2/16/2017 11:47:35 AM
//disable right click copy
this will kill text textarea cannot add/edit

/* 

var message = "";
function clickIE() { if (document.all) { (message); return false; } }
function clickNS(e) {
    if(document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2 || e.which == 3) { (message); return false; }
    }
}
if (document.layers)
{ document.captureEvents(Event.MOUSEDOWN); document.onmousedown = clickNS; }
else { document.onmouseup = clickNS; document.oncontextmenu = clickIE; }
 document.oncontextmenu = new Function("return false")


//for disable select option
document.onselectstart = new Function('return false');
function dMDown(e) { return false; }
function dOClick() { return true; }
document.onmousedown = dMDown;
document.onclick = dOClick;

/* */
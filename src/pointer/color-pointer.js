function randomHex() {
    const hexMax = 256 * 256 * 256;
    return '#' + Math.floor(Math.random() * hexMax).toString(16).toUpperCase().padStart(6, '0');
}

function removePointer(){
    var pointers = document.getElementsByClassName("colorPointer")
    if(pointers.length > 100){
        pointers[0].remove();
    }
}

document.addEventListener("mousemove",function(event){
    removePointer();

    var value = randomHex();
    var randNum = Math.floor(Math.random()*(50-10)+10);
    var a = document.createElement("DIV");
    a.style.backgroundColor = value;
    a.style.float = "left";
    a.style.width = randNum+"px";
    a.style.height = randNum+"px";
    a.style.position = "absolute";
    a.style.opacity = 0.2;
    a.style.top = event.pageY-(randNum/2)+"px";
    a.style.left = event.pageX-(randNum/2)+"px";
    a.style.borderRadius = (randNum/2)+"px";
    a.style.zIndex = 2147483647;
    a.style.pointerEvents = "none";
    a.className = "colorPointer"    
    document.body.appendChild(a);
},false)
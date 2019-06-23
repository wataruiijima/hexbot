function addLayer(x,y,width,height,zIndex,opacity){
    var layer = document.createElement("DIV");
    layer.style.width = width+"px";
    layer.style.height = height+"px";
    layer.style.position = "absolute";
    layer.style.opacity = opacity;
    layer.style.top = y+"px";
    layer.style.left = x+"px";
    layer.style.zIndex = zIndex;
    document.body.appendChild(layer);
}

function addClearLayer(){
    addLayer(0,0,document.body.scrollWidth,document.body.scrollHeight,2147483646,0);
}

function addMosaicDoms(x,y,width,height){

    var size = 4;

    var count = width * height;
    size = size + Math.floor(count / 3000);
    
    var request = new XMLHttpRequest();
    request.open('GET', "https://api.noopschallenge.com/hexbot?count="+count+"&width="+width+"&height="+height, true);
    request.onload = function () {
        let { colors } = JSON.parse(this.response);
        console.log(colors.length)
        for(var i in colors){
            let { value } = colors[i];
            let { coordinates } = colors[i];
            var a = document.createElement("DIV");
            a.style.backgroundColor = value;
            a.style.float = "left";
            a.style.width = size+"px";
            a.style.height = size+"px";
            a.style.borderRadius = (size/2)+"px";
            a.style.position = "absolute";
            a.style.left = x + coordinates.x +"px";
            a.style.top = y + coordinates.y +"px";
            a.style.zIndex = 2147483647;
            document.body.appendChild(a);
        }
    }
    request.send();
}

function mozaic(){
    addClearLayer();

    var startPoint;
    document.addEventListener("click",function(event){
        if(!startPoint){
            startPoint = {
                x: event.pageX,
                y: event.pageY
            }
            return;
        }

        var x,y,width,height = 0;
        x = startPoint.x;
        width = event.pageX - startPoint.x;
        if(startPoint.x > event.pageX){
            x = event.pageX;
            width = startPoint.x - event.pageX;
        }

        y = startPoint.y;
        height = event.pageY - startPoint.y;
        if(startPoint.y > event.pageY){
            y = event.pageY;
            height = startPoint.y - event.pageY;
        }


        addMosaicDoms(x,y,width,height)
        startPoint = null;

    },false);
}

mozaic();
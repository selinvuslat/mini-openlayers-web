window.onload = init;

function init(){
    const map= new ol.Map({
        view: new ol.View({
            center: [3914334.7668566443, 4758254.083108085],
            zoom:7,
            maxZoom: 10,
            minZoom: 4,
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target:'js-map'
    })

    map.on('click', function(e){
        console.log(e.coordinate);
    })


function addInteraction() { 
    draw =new ol.interaction.Draw({
    source: ol.source,
    type: "Point",
});
    map.addInteraction(draw);
    draw.setActive(true);
}


const raster =new ol.layer.Tile({
    source: new ol.source.OSM(),
});

const source =new ol.layer.Vector({wrapX: false});
const vector = new ol.layer.Vector({
    source: source,
});

/*let coordinate='<label for="addname">Name: </label>'+'<input type:"text" id="addname" name="addname"></input>'
var temp=0;

function clicked(){
    map.addInteraction(draw);
    draw.setActive(true);
    temp++;
    console.log("clicked"+temp);
};*/


document.getElementById("newButton").addEventListener("click", (e)=>{
    var draw = new ol.interaction.Draw({
        source: source,
        type:'Point'
    });
    map.addInteraction(draw);
   // addInteraction();
    draw.on("drawend", function(){
        let coordinate=map.getCoordinateFromPixel([e.x, e.y]);
        coordinate = ol.proj.transform(coordinate,"EPSG:3857", "EPSG:4326");
        console.log('1');
        draw.setActive(false);

        var jspanel = jsPanel.create({
            id:"js-panel",
            bgPanel: 'url("img/trianglify-warning.svg") right bottom no-repeat',
            theme: 'light',
            bgContent: '#ffffe0',
            colorHeader: '#ffffe0',
            colorContent: `#${jsPanel.colorNames.gray700}`,
            border: 'thin solid #b24406',
            borderRadius: '.33rem',
            addCloseControl: true,
            content:'<p id="coordinateX"> X ='+coordinate[0]+'</p><br><p id="coordinateY"> Y ='+coordinate[1]+'</p><br>'+
            '<label id="label" for="name">Add Location Name</label> = <input type="text" id="input" name="locName"><br>'+
            '<button id="addButton"> Submit </button>',
            contentSize:"auto",
            headerTitle:"Openlayers web map",
            });

        document.getElementById("addButton").addEventListener("click", () =>jspanel.close());
        document.querySelector("#js-panel").resize("disable");
        map.removeInteraction(draw);

        });
    });

    function getItems(){
        fetch('https://localhost:7061/api/DbConnect')
        .then(response =>{
            if (response.ok) {console.log("HTTP request successful")}
            else {console.log("HTTP request unsuccessful")}
            return response
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error =>console.log(error))
    }

    function addItem(name, x, y){
        fetch("https://localhost:7061/api/DbConnect/Add",{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json; charset=UTF-8',
        },
        body:JSON.stringify({
            name:"asd",
            x:10,
            y:20
        })
    })
    }
    addItem()
    //getItems()

    

}
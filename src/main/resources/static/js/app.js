var api = apiclient;
var Run = (function() {
  var nameAuthor;
  var listBlue = [];
  var canvas;
  var context;
  var bolean;

  var cambiarNombre = function(author) {
    nameAuthor = author;
  };

  var actualizar = function(author) {
    cambiarNombre(author);
    $("#authorname").text(author);
    api.getBlueprintsByAuthor(author, generatetable);
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
  };

  var pintarBlue = function(author, name) {
    api.getBlueprintsByNameAndAuthor(author, name, generateCanvas);
  };

  var mapPoints = function(blueprints) {
    return blueprints.map(function(blueprint) {
      return { name: blueprint.name, points: blueprint.points.length };
    });
  };

  var sumaPuntos = function(blueprints) {
    var suma = blueprints.reduce(function(total, current) {
      return total + current.points;
    }, 0);
    $("#sumatotal").text(suma);
  };

  var generatetable = function(blueprints) {
    blueprints = mapPoints(blueprints);
    listBlue = blueprints;
    sumaPuntos(blueprints);
    $("#tablas").empty(); 
    blueprints.map(function(blueprint) {
      $("#tablas").append(
        "<tr> <td>" +
          blueprint.name +
          "</td> <td>" +
          blueprint.points +
          "</td> <td><form><button type='button' class='btn btn-primary' onclick='Run.pintarBlue( \"" +nameAuthor +'" , "' +blueprint.name +"\")' >Open</button></form></td>" 
      );
    });
  };

  var generateCanvas = function(blueprint) {
    $("#currentBlueprint").text(blueprint.name);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    var anterior;
    blueprint.points.map(function(point) {
      if (!anterior) {
        anterior = point;
        context.moveTo(anterior.x, anterior.y);
      } else {
        context.lineTo(point.x, point.y);
        context.stroke();
      }
    });
  };
  var init = function(){
    

      
    console.info('initialized');
    
    //if PointerEvent is suppported by the browser:
    if(window.PointerEvent) {
      canvas.addEventListener("pointerdown", function(event){
        alert('pointerdown at '+event.pageX+','+event.pageY);  
        
      });
    }
    else {
      canvas.addEventListener("mousedown", function(event){
                  alert('mousedown at '+event.clientX+','+event.clientY);  

        }
      );
    }
  };    

  var validacion = function(){

  }



  

  return {
    actualizar: actualizar,
    pintarBlue: pintarBlue,
    init: init
  };
})();

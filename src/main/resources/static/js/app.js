var api = apiclient;
var Run = (function() {
  var nameAuthor;
  var listBlue = [];
  var boolean = false;
  var nombre ;

  var cambiarNombre = function(author) {
    boolean = false;
    nameAuthor = author;
  };

  var actualizar = function(author) {
    cambiarNombre(author);
    $("#authorname").text(author);
    clearCanvas(getCanvas());
    api.getBlueprintsByAuthor(author, generatetable);
    
  };

  var pintarBlue = function(author, name) {
    boolean = true;
    nombre = name;
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


  var getCanvas = function() {
    var c = document.getElementById("myCanvas");
    return c;
  };


  var reDibujar = function(event, canvas) {
    var x = event.pageX ;
    var y = event.pageY ;
    var blueprint = listBlue.filter(obj => {
      return obj.name === nombre;
    })[0];
    blueprint.points.push({ x: x, y: y });
    console.log(blueprint);
    generateCanvas(blueprint);
  };

  var clearCanvas = function(canvas) {
    var contex = canvas.getContext("2d");
    contex.clearRect(0, 0, canvas.width, canvas.height);
    contex.beginPath();
    return contex;
  };

  var listenMouse = function() {
    var canvas = getCanvas();
    var contx = canvas.getContext("2d");
    if (window.PointerEvent) {
      canvas.addEventListener("pointerdown", function(event) {
        if (boolean) {
          reDibujar(event, canvas);
        }
      });
    }
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
    var context = clearCanvas(getCanvas());
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

  var planoNuevo = function(name) {
    $("#nameBlueprint").val("");
    boolean = true;
    var blueprint = {
      author: nameAuthor,
      points: [],
      name: name
    };
    api.setBlueprint(nameAuthor, nombre, JSON.stringify(blueprint));
  };

  var savePoints = function() {
    var blueprint = listBlue.filter(obj => {
      return obj.name === nombre;
    })[0];
    api.setBlueprint(nameAuthor, nombre, JSON.stringify(blueprint));
  };

  

  

  return {
    actualizar: actualizar,
    pintarBlue: pintarBlue,
    listenMouse: listenMouse,
    savePoints: savePoints,
    planoNuevo: planoNuevo
  };
})();


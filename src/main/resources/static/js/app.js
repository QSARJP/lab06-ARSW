var api = apiclient;
var Run = (function() {
  var nameAuthor;
  var listBlue = [];

  var cambiarNombre = function(author) {
    nameAuthor = author;
  };

  var actualizar = function(author) {
    cambiarNombre(author);
    $("#authorname").text(author);
    api.getBlueprintsByAuthor(author, generatetable);
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
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    var anterior;
    blueprint.points.map(function(point) {
      if (!anterior) {
        anterior = point;
        ctx.moveTo(anterior.x, anterior.y);
      } else {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    });
  };
  

  

  return {
    actualizar: actualizar,
    pintarBlue: pintarBlue
  };
})();

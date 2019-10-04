const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {
    var f=[]
    return {
        getBlueprintsByAuthor: function(name, callback) {
          var promise = jQuery.ajax({
            url: apiUrl + name,
            success: function(result) {
              callback(result);
            },
            async: true
          });
          promise.then(
            function() {
              console.info("OK ");
            },
            function() {
              alert("No se encuentra el author: " + name);
            }
          );
        },
        getBlueprintsByNameAndAuthor: function(author, name, callback) {
          var promise = jQuery.ajax({
            url: apiUrl + author + "/" + name,
            success: function(result) {
              callback(result);
            },
            async: true
          });
          promise.then(
            function() {
              console.info("OK ");
            },
            function() {
              alert(
                "No se encuentra el author: " + author + " con el plano: " + name
              );
            }
          );
        },
        setBlueprint: function(author, name, blueprint) {
          var promise = $.ajax({
            url: "/blueprints/" + author + "/" + name + "/",
            type: "PUT",
            data: blueprint,
            contentType: "application/json"
          });
    
          promise.then(
            function() {
              Run.updateListPlans(author);
              if (name) {
                Run.openPlane(author, name);
              }
            },
            function() {
              console.info("ERROR");
            }
          );
        },
      };
    })();


      